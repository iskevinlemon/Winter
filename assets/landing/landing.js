$component({
    scope: "global",
    name: "landing-navbar",
    template:`
    <div class="container sc-is-center mt-3 ">
        <a href="/">
            <img src="/assets/winter-js.png" width="30" class="mr-2 wjs-logo" />
        </a>

        <a class="text-dark mr-2" href="https://github.com/iskevinlemon/Winter/blob/main/features.txt"
            target="_blank">
            <u>Features</u>
        </a>
    </div>    
`})

$template({
    mount: $$("#root"),
    templateUrl: "/assets/landing/template/landing",
    data:{
        textOne: "Productivity focused ",
        textTwo: "web development library",
        keyFeatures: "Reusable components, partial view, data binding, state management, routing and much more.",
        githubUrl: "https://github.com/iskevinlemon/Winter",
        landingImage:`
        <div class="col-sm-6">
            <img src="/assets/coding.svg" 
            class="landing-image" 
         style="width: 100% !important;" />
        </div>`

    }
})