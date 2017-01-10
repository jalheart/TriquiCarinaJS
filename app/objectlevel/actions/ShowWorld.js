System.register(["../../../libs/carina/metacore/Action"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Action_1, ShowWorld;
    return {
        setters: [
            function (Action_1_1) {
                Action_1 = Action_1_1;
            }
        ],
        execute: function () {
            ShowWorld = class ShowWorld extends Action_1.Action {
                constructor() {
                    super(...arguments);
                    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
                    /**
                     * @return the styles
                     */
                    this.Object = getStyles();
                }
                run() {
                    this.workingMemory = WorkingMemory.getInstance();
                    return true;
                }
            };
            exports_1("ShowWorld", ShowWorld);
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
