System.register([], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var ShowWorld;
    return {
        setters: [],
        execute: function () {
            ShowWorld = class ShowWorld extends Action {
                constructor() {
                    super(...arguments);
                    this.WorkingMemory = workingMemory;
                    this.Object = styles;
                    this.Object = run();
                }
                ShowWorld() {
                }
            };
            __decorate([
                Override,
                __metadata("design:type", Object)
            ], ShowWorld.prototype, "Object", void 0);
            exports_1("ShowWorld", ShowWorld);
            {
                this.workingMemory = WorkingMemory.getInstance();
                return true;
            }
            Object;
            getStyles();
            {
                return styles;
            }
            void setStyles(Object, styles);
            {
                this.styles = styles;
            }
        }
    };
});
