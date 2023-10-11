/*
Winter JS - Router 
- Routing system for Winter JS
!!! Please DO NOT modify !!!
Early version of Winter JS was called Why JS. 
Hence, the name $whyjsRouterProvider.
*/

(function ($whyjsRouterProvider) {
  function $$(a) {return document.querySelector(a);} // Selector
  $whyjsRouterProvider.$RouterProvider = function (config) {
    document.addEventListener("DOMContentLoaded", function () {
      var DEFAULT_ROUTE = config.default_path;
      var i$currentRoute = window.location.hash.substring(1);
      if (i$currentRoute === "") {
        // User navigated to "/"
        i$currentRoute = `${config.default}`;
        if (DEFAULT_ROUTE !== "") {
          i$currentRoute = DEFAULT_ROUTE;
          window.location.hash = "#" + i$currentRoute;
        }
      }
      // This specifies where all the pages will be stored at
      var VIEWS_FOLDER = config.src;
      // var rootDiv = $$("#pie-root");
      // Root - where pages will be injected
      var rootDiv = config.root;
      // Route scope
      var routeScope = config.scope;
      // Error scope
      var errScope = config.errorScope;
      var loadPage = function (route, changeURL) {
        if (routeScope.includes(route)) {
          // console.log("Route is in scope");
          var url = VIEWS_FOLDER + "/" + route + ".html";
          fetch(url)
            .then(function (response) {
              return response.text();
            })
            .then(function (html) {
              rootDiv.innerHTML = html;
              // console.log(`Current route is: ${route}`);
              if (changeURL) {
                history.pushState({}, "", route);
              }
            })
            .catch(function (error) {
              console.error("Error fetching page:", error);
            });
        } else {
          var url = VIEWS_FOLDER + "/" + errScope + ".html";
          fetch(url)
            .then(function (response) {
              return response.text();
            })
            .then(function (html) {
              rootDiv.innerHTML = html;
              // console.log(`Current route: ${route}`);
              if (changeURL) {
                history.pushState({}, "", route);
              }
            })
            .catch(function (error) {
              console.error("Error fetching page:", error);
            });
        }
      };
      $whyjsRouterProvider.addEventListener("popstate", function (event) {
        var currentRoute = $whyjsRouterProvider.location.hash.substring(1);
        loadPage(currentRoute, false);
      });
      // Check the current route on page load
      loadPage(i$currentRoute, false);
    });
  };
})(window);
/*
ROUTER for Winter JS - end
* Please DO NOT modify
*/