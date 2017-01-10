System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelOfTheSelf;
    return {
        setters:[],
        execute: function() {
            ModelOfTheSelf = class ModelOfTheSelf {
                constructorf() {
                }
                static get modelOfTheSelf() {
                    if (this._modelOfTheSelf == null) {
                        this._modelOfTheSelf = new ModelOfTheSelf();
                    }
                    return this._modelOfTheSelf;
                }
                get profiles() {
                    return this._profiles;
                }
                set profiles(profiles) {
                    this._profiles = profiles;
                }
                getProfile(i) {
                    return this._profiles[i];
                }
                addProfile(profile, i) {
                    if (this.profiles.length < i) {
                        this.profiles.push(profile);
                    }
                    else {
                        this.profiles[i] = profile;
                    }
                }
                get events() {
                    return this._events;
                }
                set events(events) {
                    this._events = events;
                }
                getEvent(i) {
                    return this._events[i];
                }
                addEvent(event, i) {
                    if (this._events.length < i) {
                        this.events.push(event);
                    }
                    else {
                        this.events[i] = event;
                    }
                }
                get knownCognitiveFunctions() {
                    if (this._knownCognitiveFunctions == null) {
                        this._knownCognitiveFunctions = [];
                    }
                    return this._knownCognitiveFunctions;
                }
            };
            exports_1("ModelOfTheSelf", ModelOfTheSelf);
        }
    }
});
