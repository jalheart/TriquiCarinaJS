System.register(['./FuntionalElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FuntionalElement_1;
    var Task;
    return {
        setters:[
            function (FuntionalElement_1_1) {
                FuntionalElement_1 = FuntionalElement_1_1;
            }],
        execute: function() {
            Task = class Task extends FuntionalElement_1.FuntionalElement {
                constructor() {
                    super(...arguments);
                    this._executed = false;
                    this._successful = false;
                    this._stopPlan = false;
                }
                Task() { }
                buildProfile() { }
                updateTaskState(executed, successful, stopPlan) {
                    this._executed = executed;
                    this._successful = successful;
                    this._stopPlan = stopPlan;
                }
                get goal() {
                    return this._goal;
                }
                set goal(goal) {
                    this._goal = goal;
                }
                get executed() {
                    return this._executed;
                }
                get successful() {
                    return this._successful;
                }
                get stopPlan() {
                    return this._stopPlan;
                }
                get effects() {
                    return this._effects;
                }
                set effects(effects) {
                    this._effects = effects;
                }
                get preconditions() {
                    return this._preconditions;
                }
                set preconditions(preconditions) {
                    this._preconditions = preconditions;
                }
                addEffect(effect) {
                    if (this._effects == null)
                        this._effects = [];
                    this._effects.push(effect);
                }
                addPrecondition(effect) {
                    if (this._preconditions == null)
                        this._preconditions = [];
                    this._preconditions.push(effect);
                }
                getEffect(pos) {
                    return typeof pos === 'number' ? this.getEffectN(pos) : this.getEffectS(pos);
                }
                getEffectN(pos) {
                    if (this._effects == null || this._effects.length <= pos)
                        return null;
                    return this.effects[pos];
                }
                getEffectS(name) {
                    for (let stateTmp of this._effects) {
                        if (stateTmp.name == name)
                            return stateTmp;
                    }
                    return null;
                }
                getPrecondition(pos) {
                    if (typeof pos === 'number') {
                        return this.getPreconditionN(pos);
                    }
                    else if (typeof pos === 'string') {
                        return this.getPreconditionS(pos);
                    }
                }
                getPreconditionN(pos) {
                    if (this._preconditions == null || this._preconditions.length <= pos)
                        return null;
                    return this.preconditions[pos];
                }
                getPreconditionS(name) {
                    for (let stateTmp of this._preconditions) {
                        if (stateTmp.name == name)
                            return stateTmp;
                    }
                    return null;
                }
            };
            exports_1("Task", Task);
        }
    }
});
