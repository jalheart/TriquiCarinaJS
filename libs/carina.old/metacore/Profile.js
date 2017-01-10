System.register(['./RootElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1;
    var Profile;
    return {
        setters:[
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            Profile = class Profile extends RootElement_1.RootElement {
            };
            exports_1("Profile", Profile);
        }
    }
});
