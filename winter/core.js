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
Created by: Kevin (https://github.com/kevin-lem0n)
Contributor(s):
- Damien (https://github.com/DameHetfield9803)
*/

(function (Factory) {
  // function attached to a window object - START

  // Current version of Winter JS
  const WINTER_JS_VERSION = "1.0";

  // Logging of current version
  $log(`Winter JS library installed, running on version ${WINTER_JS_VERSION}`);

  // Custom templating
  Factory.$template = function(options){
    if (!options || !options.path) {
      console.error("Error: page name is required.");
      return;
    }
    const {path, data, mount} = options;

    // Mount point - where the page will be injected on
    const $mountPoint = mount;
    if($mountPoint == "" || $mountPoint == null || $mountPoint == undefined){
      console.error("Error: mount point is not specified.")
    }
    // const $dataIsBinded = `data-${$RandomBindTag()}`;
    const $dataIsBinded = "";
    // fetch(`/template/${page}.html`)
    fetch(`${path}.html`)
      .then(($rs) => $rs.text())
      .then(($template) => {
        const $compiledHTML = $template.replace(
          /\{\{([^}]+)\}\}/g,
          (match, key) => {return `${data[key]} ${$dataIsBinded}` || "";}
        );
        $mountPoint.template(`${$compiledHTML}`);
      })
      .catch((error) => {
        console.error(`Error: unable to load template: ${error.message}`);
      });
  }

  // Set initial value of a model
  Factory.$setModel = function (obj) {
    window[obj.model] = obj.value;
    updateBindElements(obj.model);
    updateModelElements(obj.model);
    return obj.value;
  };

  // Set initial value of a model - 23
  Factory.init = function (obj) {
    window[obj.model] = obj.value;
    updateBindElements(obj.model);
    updateModelElements(obj.model);
    return obj.value;
  };

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

  // For
  // Wait for the DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    const wForElements = document.querySelectorAll("[wRepeat]");
    wForElements.forEach((element) => {
      const loopVar = element.getAttribute("wRepeat");
      var dataArray = $scope[loopVar];

      if (dataArray) {
        const childElementTag = element.querySelector("[WForEach]").tagName.toLowerCase();

        // Remove the initial template element
        const initialTemplate = element.querySelector("[WForEach]");
        if (initialTemplate) {
          element.removeChild(initialTemplate);
        }

        dataArray.forEach((item) => {
          element.innerHTML += `<!-- $Scope items of ${loopVar}-->`;
          const newChildElement = document.createElement(childElementTag);
          newChildElement.setAttribute("WForEach", item);
          newChildElement.textContent = item;
          newChildElement.value = item;
          element.appendChild(newChildElement);
        });
      }
    });
    
  });

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
  }
  function updateModelElements(model) {
    const mModel = document.querySelectorAll(`[w-model="${model}"]`);
    mModel.forEach((element) => {
      element.value = window[model];
      // console.log(`${model} model element is updated 2`);
    });
    updateBindElements(model);
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
}
function updateModelElements(model) {
  const mModel = document.querySelectorAll(`[w-model="${model}"]`);
  mModel.forEach((element) => {
    element.value = window[model];
    // console.log(`${model} model element is updated`);
  });
  updateBindElements(model);
}
// Function to update model and its binding outside of DOMContentLoaded function - END
// DO NOT REMOVE THIS SECTION OF CODE OR ELSE IT WILL BREAK - END
