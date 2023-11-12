/*
Winter JS - Modular Web Development Library
- Core functions for Winter JS

> IMPORTANT: 
1. Winter JS DOES NOT work with jQuery.
2. winter.js have to be LOADED first before your actual <script> tag.
> Additional dependency/(ies):
- snowflake.js
> READ ME BEFORE USING

Winter JS is currently still in development mode, 
certain features may cause bugs. Use it in production at your own RISKS.
Created by: Kevin (https://github.com/iskevinlemon)
Contributor(s):
- Damien (https://github.com/DameHetfield9803)
*/

(function (Factory) {
  // function attached to a window object - START

  // Current version of Winter JS
  const WINTER_JS_VERSION = "1.0";

  // Logging of current version
  $log(`Winter JS library installed, running on version ${WINTER_JS_VERSION}`);

  Factory.$template = function (options) {
    if (!options || !options.templateUrl) {
      console.error("Error: page name is required.");
      return;
    }
    const { templateUrl, data, mount } = options;
  
    // Mount point - where the page will be injected on
    const $mountPoint = mount;
    if (!$mountPoint) {
      console.error("Error: mount point is not specified.");
      return;
    }
    // Generate a unique data attribute to identify the template
    const templateId = `data-Wapp-root`;
    $mountPoint.setAttribute(templateId, "");
    // fetch the template
    fetch(`${templateUrl}.html`)
      .then(($rs) => $rs.text())
      .then(($template) => {
        // Replace data placeholders and evaluate JavaScript expressions in the template
        const $compiledHTML = $template.replace(
          /\{\{([^}]+)\}\}/g,
          (match, expression) => {
            try {
              // Check if it's a data property first
              if (data.hasOwnProperty(expression)) {
                return data[expression];
              }
              // Use Function constructor to safely evaluate the JavaScript expression
              const evaluatedExpression = new Function(`return ${expression}`)();
              return evaluatedExpression !== undefined ? evaluatedExpression : "";
            } catch (error) {
              console.error(`Error evaluating expression: ${error.message}`);
              return "";
            }
          }
        );
        // Create a temporary element to parse and execute embedded scripts
        const $tempElement = document.createElement("div");
        // $tempElement.innerHTML = $compiledHTML;
        // $tempElement.innerHTML = $compiledHTML.replace(/@click/g, "onclick")// $compiledHTML;
        $tempElement.innerHTML = $runCustomDirectives($compiledHTML); 

        // Execute embedded script tags
        const scriptTags = $tempElement.querySelectorAll("script");
        scriptTags.forEach((script) => {
          const scriptContent = script.innerHTML;
          const scriptElement = document.createElement("script");
          scriptElement.innerHTML = scriptContent;
          document.head.appendChild(scriptElement);
        });
  
        // Inject the final compiled HTML with data, evaluated expressions, and executed scripts into the mount point
        $mountPoint.innerHTML = $tempElement.innerHTML;
        
      })
      .catch((error) => {
        console.error(`Error: unable to load template: ${error.message}`);
      });
  };

  // const elementsWithExpression = document.querySelectorAll('[expression]');
        
  // elementsWithExpression.forEach(element => {
  //     const expression = element.getAttribute('expression');
  //     if (expression) {
  //         const isTrue = eval(expression);
  //         if (!isTrue) {
  //             element.style.display = 'none'; // Hide the element
  //         }
  //     }
  // });


  // Set initial value of a model
  Factory.$setModel = function (obj) {
    window[obj.model] = obj.value;
    updateBindElements(obj.model);
    updateModelElements(obj.model);
    return obj.value;
  };

  Factory.use = function ($ISmodel, $ISvalue) {
    window[$ISmodel] = $ISvalue;
    updateBindElements($ISmodel);
    updateModelElements($ISvalue);
    return $ISvalue;
  };

  Factory.dynamic = function ($ISvalue) {
    // console.log(`dynamic() running...`);
    updateModelElements($ISvalue);
    return $ISvalue;
  };

  // Factory.use = function (obj) {
  //   window[obj.model] = obj.value;
  //   updateBindElements(obj.model);
  //   updateModelElements(obj.model);
  //   return obj.value;
  // };

  // Set initial value of a model v2
  // Factory.$init = function (obj) {
  //   window[obj.model] = obj.value;
  //   updateBindElements(obj.model);
  //   updateModelElements(obj.model);
  //   return obj.value;
  // };

  // Custom component - start
  Factory.$component = function ({ scope, name, template, style }) {

    if(scope == "global"){
      class CustomElement extends HTMLElement {
        constructor() {
          super();
          const tmp = document.createElement("template");
          // tmp.innerHTML = template;
          tmp.html(template);
          this.appendChild(tmp.content.cloneNode(true));
          if (style) {
            const styleElement = document.createElement("style");
            styleElement.textContent = style;
            this.appendChild(styleElement);
          }
        }
      }
      customElements.define(name, CustomElement);
    }

    if(scope != "global"){
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        const sR = this.attachShadow({ mode: "open" });
        const tmp = document.createElement("template");
        // tmp.innerHTML = template;
        tmp.html(template);
        sR.appendChild(tmp.content.cloneNode(true));

        if (style) {
          const styleElement = document.createElement("style");
          styleElement.textContent = style;
          sR.appendChild(styleElement);
        }
      }
    }
    customElements.define(name, CustomElement);
    }

  };
  // Custom component - end

  // Leave this here
  // Please do not remove !
  Factory.$scope = "";

  document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded - START
    const wForElements = document.querySelectorAll("[for]");
    wForElements.forEach((element) => {
      const loopVar = element.getAttribute("for");
      var dataArray = $scope[loopVar];

      if (dataArray) {
        const childElementTag = element.querySelector("[each]").tagName.toLowerCase();

        // Remove the initial template element
        const initialTemplate = element.querySelector("[each]");
        if (initialTemplate) {
          element.removeChild(initialTemplate);
        }

        dataArray.forEach((item) => {
          element.innerHTML += `<!-- $scope items of ${loopVar}-->`;
          const newChildElement = document.createElement(childElementTag);
          // newChildElement.setAttribute("each", item);
          newChildElement.setAttribute("href", `/${item}`);
          // newChildElement.setAttribute("onclick", `this.style.display="none";`);
          newChildElement.textContent = item;
          newChildElement.value = item;
          element.appendChild(newChildElement);
        });
      }
    });

    // Remove element if js expression is false
    const removeWhenFalse = document.querySelectorAll('[removeWhenFalse]');
    removeWhenFalse.forEach(element => {
        const expression = element.getAttribute('removeWhenFalse');
        if (expression) {
            const isTrue = eval(expression);
            if (!isTrue) {
                // element.style.display = 'none'; // Hide the element
                element.remove(); // Remove the element
            }
        }
    });

    
  });// DOMContentLoaded - END

})(window); // function attached to a window object - END

// =====================================================================
/*
 All scripts below will only be run after initial page load
 DOM content is loaded
*/
document.addEventListener("DOMContentLoaded", function () {
  // Partial page
  /* 
  TO NOTE:
  All partial page HAVE TO BE INSIDE folder named "partial" (lowercase)

  To Do: Add support to allow customization for partial pge folder
  */
  const $partial = document.querySelectorAll("[w-partial]");
  $partial.forEach((element) => {
    const pn = element.getAttribute("w-partial");
    const url = `/partial/${pn}.html`;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        element.innerHTML = `${data}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Inside DOM content loaded function
/* 
w-model: set a name
w-model-bind: get the value of model by its name
Whenever the model value changes, it will automatically change the m-model-bind
Example:
<input type="text" id="input" w-model="username" placeholder="Username">
<p>Username is: <span w-model-bind="username"></span></p>
*/
  const mModel = document.querySelectorAll("[w-model]");
  const mBind = document.querySelectorAll("[w-model-bind]");

  mModel.forEach((element) => {
    const model = element.getAttribute("w-model");
    element.addEventListener("input", () => {
      window[model] = element.value;
      // console.log(`Updated Bind Elements - model`);
      updateBindElements(model);
      // console.log(`Updated Bind Elements - model`);
    });
    console.log(`Running: mModel.forEach((element) w-model - DOM`);
  });
  mBind.forEach((element) => {
    const model = element.getAttribute("w-model-bind");
    element.value = window[model];
    element.textContent = window[model];
    element.addEventListener("input", () => {
      window[model] = element.value;
      updateModelElements(model);
      // console.log(`${model} model element is updated 1`);
    });
    // console.log(`Running: mBind.forEach((element) w-model-bind - DOM`);
  });
  function updateBindElements(model) {
    const mBind = document.querySelectorAll(`[w-model-bind="${model}"]`);
    mBind.forEach((element) => {
      element.value = window[model];
      // console.log(`Value of element.value is ${element.value}`)
      element.textContent = window[model];
      // console.log(`${model} bind element is updated (inside DOM)`);
      // Updating value in real time everytime the value of a model changes
      Snowflake.set(model, window[model]);
    });
    // console.log(`Running: updateBindElements(model) - DOM`);
  }
  function updateModelElements(model) {
    const mModel = document.querySelectorAll(`[w-model="${model}"]`);
    mModel.forEach((element) => {
      element.value = window[model];
      // console.log(`${model} model element is updated 2`);
    });
    updateBindElements(model);
    // console.log(`Running: updateModelElements(model) - DOM`);
  }
}); // DOM loaded closing tag

/*
Function to update model and its binding outside of DOMContentLoaded function - START
*/
// DO NOT REMOVE THIS SECTION OF CODE OR ELSE IT WILL BREAK - START
function updateBindElements(model) {
  const mBind = document.querySelectorAll(`[w-model-bind="${model}"]`);
  mBind.forEach((element) => {
    element.value = window[model];
    element.textContent = window[model];
    // console.log(`${model} bind element is updated`);
  });
  // console.log(`Running: updateBindElements(model)`);
}
function updateModelElements(model) {
  const mModel = document.querySelectorAll(`[w-model="${model}"]`);
  mModel.forEach((element) => {
    element.value = window[model];
    // console.log(`${model} model element is updated`);
  });
  updateBindElements(model);
  // console.log(`Running: updateModelElements(model)`);
}
// Function to update model and its binding outside of DOMContentLoaded function - END
// DO NOT REMOVE THIS SECTION OF CODE OR ELSE IT WILL BREAK - END
