# Winter JS

Modular Web Development Library. Feel free to submit a pull request and contribute.
<br/>

<b>Notice</b>
Winter JS is currently still in development mode, 
certain features may cause bugs. Use it in production at your own RISKS. <br>

# Important
**Winter JS DOES NOT work with jQuery.**

# Installation via CDN
**CDN installation is recommended**
```html
<!-- Please DO NOT change the order/ arrangements of the CDN -->
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/winter/utils.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/winter/core.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/winter/router.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/Winter/winter/snowflake.js"></script>
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
    path: "/template/template",
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
<select for="fruits"> <!-- Referencce the globally scoped fruits array -->
    <option each></option>
</select> 

<script>
$scope = { // define a global scope
    fruits: ["Apple", "Banana", "Cherry", "Lemon"]
};
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
