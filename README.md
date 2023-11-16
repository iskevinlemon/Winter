# Winter JS
Productivity focused web development library. You can use Winter JS to build dynamic sites 
or you can just use some of its functionality.
Feel free to submit a pull request and contribute.
<br/>

<b>Notice</b>
Winter JS is currently still in development mode, 
certain features may cause bugs. Use it in production at your own RISKS. <br>

# Important
**Winter JS DOES NOT work with jQuery.** The use of Bootstrap 5 is recommended instead of Bootstrap 4.

# Installation via CDN
**CDN installation is recommended**
```html
<!-- Please DO NOT change the order/ arrangements of the CDN -->
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/lib/utils.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/lib/core.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/lib/router.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/lib/snowflake.js"></script>
```

# References
View the references for Winter JS: <br/>
```html
<!-- Coming soon -->
```

# At a glance
**Templating** <br>
```html
<p>{{1+1}}</p> <!-- Will be rendered as <p>2</p> -->
```
**Advance Templating** <br>
```html
<!-- script.js -->
<script>
$template({
    mount: $$("#root"),
    templateUrl: "/template/template",
    data: {
        blogTitle: "Hello World",
        blogText: "Lorem ipsum..."
    }
})
</script>
```

```html
<!-- template.html -->
<h1>{{blogTitle}}</h1>
<p>{{blogText}}</p>
```

**DOM Manipulation** <br>
```html
<h1></h1> <!-- Hello World will be injected here -->

<script>
$$("h1").html("Hello World");
</script>
```

**Populating a Dropdown List** <br>
```html
<select for="fruits"> <!-- Reference the globally scoped fruits array -->
    <option each></option>
</select> 

<script>
$scope = { // define a global scope
    fruits: ["Apple", "Banana", "Cherry", "Lemon"]
};
</script>
```

**Custom directives** <br>
```html
<form @submit="doSomething()"> <!-- Referencing doSomething() function-->
    <input name="username" required/>
    <button>Submit</button>
</form>

<script>
function doSomething() {
    // action goes here
}
</script>
```

**Reactivity (counter example)** <br>
```html
<h1 w-model-bind="myCount"></h1> <!-- bind the value of "myCount" -->

<button onclick="dynamic('myCount', myCount++);">
    Add
</button>

<script>
var myCount = dynamic(1); // set the initial value of "myCount"

function add(){
    dynamic('myCount', myCount++); // update the value of "myCount"
}
</script>
```

**Custom Component** <br>
```html
<!-- Coming soon -->
```

**Routing** <br>
```html
<!-- Coming soon -->
```

**Partial page** <br>
```html
<!-- Coming soon -->
```
