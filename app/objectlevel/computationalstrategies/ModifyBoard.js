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
    var ModifyBoard;
    return {
        setters: [],
        execute: function () {
            ModifyBoard = class ModifyBoard extends ReasoningTask {
                constructor() {
                    super(...arguments);
                    this.WorkingMemory = workingMemory;
                    this.Object = run();
                }
            };
            __decorate([
                Override,
                __metadata("design:type", Object)
            ], ModifyBoard.prototype, "Object", void 0);
            exports_1("ModifyBoard", ModifyBoard);
            {
                this.workingMemory = WorkingMemory.getInstance();
                TriquiModelOfTheWorld;
                modelOfTheWorld = (TriquiModelOfTheWorld);
                this.workingMemory.getModel_of_the_world();
                String[][];
                cells = modelOfTheWorld.getBoard().getCells();
                //        String positionTmp  =(String)((BasicMemoryUnity)this.workingMemory.getBcpu().getInput().getInformation()).information;
                String;
                positionTmp = (String)((BasicMemoryUnity), this.workingMemory.getBcpu().getInput("player_movement").getInformation()).information;
                String[];
                position = positionTmp.split("_");
                modelOfTheWorld.getBoard().setData(Integer.parseInt(position[0]), Integer.parseInt(position[1]), modelOfTheWorld.currentToken());
                modelOfTheWorld.updateModelOfTheWorld();
                this.workingMemory.setModel_of_the_world(modelOfTheWorld);
                this._executed = true;
                this._successful = true;
                this._stopPlan = false;
                WorkingMemory.getInstance().updateMentalState("is_board_modified", Boolean.TRUE);
                WorkingMemory.getInstance().updateMentalState("is_player_played", Boolean.TRUE);
                return true;
            }
        }
    };
});
