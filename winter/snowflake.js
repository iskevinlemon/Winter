/*
Snowflake JS - State management library.

> IMPORTANT: snowflake.js have to be LOADED first in the <head> before your other <script> tag.

Version: 1.0
Created by: Kevin (https://github.com/kevin-lem0n)
*/

(function (Factory) { // function attached to a window object - START

    // Utils
    // Local storage - get
    Factory.$lsGet = function(a){
        return localStorage.getItem(a);
    }
    // Local storage - set
    Factory.$lsSet = function(lsKey, lsValue){
        localStorage.setItem(lsKey, lsValue);
    }

    /*
    Function is run everytime the page is loaded.
    It checks whether SF Global State Object has been created before.
    It checks the current value of the sfHasInit.
    If it hasn't been created --> create the SF Global State Object & updated sfHasInit to sf-init-completed
    If it has been created --> do nothing
    */
    function SnowflakeInit(){
        var sfHasInit = localStorage.getItem("sfHasInit");
        if(sfHasInit != "sf-init-completed"){
            // alert("Creating SF Global State Object");
            // Create a snowflake global state object (SGO)
            var snowflakeGlobalState = {}; // Object initial state is empty
            // Convert the SGO to JSON
            var snowflakeGlobalStateJSON = JSON.stringify(snowflakeGlobalState);
            // Store the SGO as JSON in localStorage
            $lsSet("snowflakeGlobalStateData", snowflakeGlobalStateJSON);   
            $lsSet("sfHasInit", "sf-init-completed");
        }
    }
    SnowflakeInit();

    Factory.Snowflake = {

        // Get all state
        getAll: function() {
            var sgoData = $lsGet("snowflakeGlobalStateData");
            return JSON.parse(sgoData) || {}; // Initialize as an empty object if data is null
            // return JSON.parse(sgoData); // Initialize as an empty object if data is null
        },

        // Get single value of a state
        // @param {string} stateName - The name of the state property to retrieve
        // @return {*} - The value of the specified state property, or undefined if not found
        get: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            return sgoDataAsJSON[stateName];
        },  
    
        // Set a new state
        // @param {string} stateName - The name of the state property
        // @param {*} stateValue - The value to set for the state property
        set: function(stateName, stateValue) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            sgoDataAsJSON[stateName] = stateValue;
            var updatedSgoDataAsJSON = JSON.stringify(sgoDataAsJSON);
            $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
        },

        // Update a current state
        // @param {string} stateName - The name of the state property to update
        // @param {*} newStateValue - The new value for the state property
        update: function(stateName, newStateValue){
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                sgoDataAsJSON[stateName] = newStateValue;
                var updatedSgoDataAsJSON = JSON.stringify(sgoDataAsJSON);
                $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
            }
        },

        // Delete a state
        // @param {string} stateName - The name of the state property to delete
        delete: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                delete sgoDataAsJSON[stateName]; // Delete the property from the object
                var updatedSgoDataAsJSON = JSON.stringify(sgoDataAsJSON);
                $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
            }
        },

        // Reset all state
        // This will clear all properties of SF Global State Object
        reset: function() {
            var snowflakeGlobalState = {};
            var snowflakeGlobalStateJSON = JSON.stringify(snowflakeGlobalState);
            $lsSet("snowflakeGlobalStateData", snowflakeGlobalStateJSON);   
        },

        // Check if a state exists
        // @param {string} stateName - The name of the state property to check
        // If stateName exists --> return true, else return false
        ifexists: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); 
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                return true;
            }
            else
                return false;
        },
    
    };

})(window); // // function attached to a window object - END