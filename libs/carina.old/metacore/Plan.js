System.register(['./Element'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1;
    var Plan;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            Plan = class Plan extends Element_1.Element {
                constructor() {
                    super(...arguments);
                    this._currentAction = 0;
                }
                Plan() {
                    this._actions = [];
                }
                executePlan() {
                    var currentAction;
                    if (this.actions.length <= 0)
                        return null;
                    do {
                        currentAction = this.actions[this.currentAction];
                        currentAction.run();
                        this.currentAction = this.currentAction + 1;
                    } while (this.currentAction < this.actionsLength && !currentAction.stopPlan);
                    return true;
                }
                get actionsLength() {
                    return this._actions.length;
                }
                get actions() {
                    return this._actions;
                }
                set actions(actions) {
                    this._actions = actions;
                }
                set action(action) {
                    this.actions.push(action);
                }
                get currentAction() {
                    return this._currentAction;
                }
                set currentAction(currentAction) {
                    this._currentAction = currentAction;
                }
            };
            exports_1("Plan", Plan);
        }
    }
});
