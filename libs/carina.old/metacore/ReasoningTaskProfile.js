System.register(['./Profile', './Field'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Profile_1, Field_1;
    var ReasoningTaskProfile;
    return {
        setters:[
            function (Profile_1_1) {
                Profile_1 = Profile_1_1;
            },
            function (Field_1_1) {
                Field_1 = Field_1_1;
            }],
        execute: function() {
            ReasoningTaskProfile = class ReasoningTaskProfile extends Profile_1.Profile {
                ReasoningTaskProfile(fields) {
                    this._fields = [];
                    for (let field of fields) {
                        this.setField(field.name, field.value);
                    }
                }
                setField(name, value) {
                    this._fields.push(new Field_1.Field(name, value));
                }
            };
            exports_1("ReasoningTaskProfile", ReasoningTaskProfile);
        }
    }
});
