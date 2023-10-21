/*
Winter JS - utilities functions
*/

/*
Check if jQuery exists
*/
if(typeof jQuery !== "undefined"){
  $jQueryErrorScreen();
} 

// Error screen for when jQuery exists
function $jQueryErrorScreen(){
  document.title ="jQuery Error"
  document.body.innerHTML = `
  <p style="text-align: center !important; margin-top: 30vh !important;">
    <b>Error:</b> jQuery is not compatible with Winter JS. </br>
    Please remove it to continue using Winter JS.
  </p>
  `;
}

(function (Factory) { // function attached to a window object - START

  // Print / console.log ($$log)
  Factory.$log = function (a) {
    console.log(a);
  };

  // Selector ($$)
  /*
  Selector
  # for id
  . for class
  element(e.g p, div) for element
  Example:
  var name = $$("#name"); // get element of id name
  */
  Factory.$$ = function (a) {
    if (a != null) {
      return document.querySelector(a);
    }
  };

    // Localstorage (get & set)
  /*
    // Set
     _ls({
       method: "set",
       key: "donut",
       value: "chocolate"
    });

    // Get
    var fromLS = _ls({
        method: "get",
        key: "donut "
    });
  */
  Factory.$$ls = function (a) {
    var result = "";
    // Get
    if (a.method == "get" || a.method == "GET") {
      result = localStorage.getItem(a.key);
      return result;
    }

    // Set
    if (a.method == "set" || a.method == "SET") {
      localStorage.setItem(a.key, a.value);
      // Nothing is being returned
    }
  };

  /*
    Sanitize string & remove all HTML special characters
    <h1>Hello</h1> --> h1hello/h1
  */
  Factory.$sanitize = function (a) {
    if (a.includes("<")) {
      a = a.replaceAll("<", "");
    }
    if (a.includes(">")) {
      a = a.replaceAll(">", "");
    }
    return a;
  };

  // Hide HTML
  // @param {string} a - Object/ element to hide
  Factory.Object.prototype.hide = function (a) {
    this.style.display = "none";
  };

  // Inner HTML
  // @param {string} a - String to inject
  Factory.Object.prototype.html = function (a) {
    this.innerHTML = a;
  };

  // Inner HTML (template)
  // @param {string} a - String to inject
  Factory.Object.prototype.template = function (a) {
    this.innerHTML = a;
  };

  // Inner HTML += (add on)
  // @param {string} a - String to add on/ append
  Factory.Object.prototype.append = function (a) {
    this.innerHTML += a;
  };

  // Custom events
  /*
  // Button that says hello when clicked
  <button>Hello</button>
  <script>
    $$event({
      base: $$("button"),
      event: "click",
      func: () =>{
        alert("Hello")
      }
    })
  </script>
  */
  Factory.$event = function (a) {
    a.base.addEventListener(a.event, a.func);
  };

  // Get query string
  Factory.$query = function (a) {
    return new URLSearchParams(window.location.search).get(a);
  };

  // Click directive with @click
  Factory.$clickDirective = function (input) {
    return input.replace(/@click(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, 
    (match, comment) => {
      return comment ? match : 'onclick';
    });
  }

  // Disabled directive with @block
  Factory.$disabledDirective = function (input) {
    return input.replace(/@block(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, 
    (match, comment) => {
      return comment ? match : 'disabled';
    });
  }

  // Onubmit directive with @submit
  Factory.$onSubmitDirective = function (input) {
    return input.replace(/@submit(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, 
    (match, comment) => {
      return comment ? match : 'onsubmit';
    });
  }

  // Function will run all custom @- directives
  Factory.$runCustomDirectives = function (input) {
    input = $clickDirective(input);
    input = $disabledDirective(input);
    input = $onSubmitDirective(input);
    return input;
  }

})(window); // function attached to a window object - END

// Deprecated
// Function to add a click event listener based on the w-click attribute
// function addWClickListener() {
//   const elementsWithWClick = document.querySelectorAll('[w-click]');

//   elementsWithWClick.forEach(element => {
//       const wClickValue = element.getAttribute('w-click');
//       if (wClickValue) {
//           element.addEventListener('click', () => {
//               eval(wClickValue);
//           });
//       }
//   });
// }
// // Initialize the custom click event listeners when the page loads
// document.addEventListener('DOMContentLoaded', addWClickListener);

