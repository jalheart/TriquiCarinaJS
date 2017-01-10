System.register(["../../../libs/carina/metacore/ComputationalStrategy", "../../../libs/carina/metacore/Plan", "../../../libs/Consola", "../tasks/ModifyBoard", "../tasks/VerifyWinner", "../tasks/ChangeTurn", "../tasks/MachinePlays", "../tasks/ResetBoard", "../tasks/actions/ShowWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComputationalStrategy_1, Plan_1, Consola_1, ModifyBoard_1, VerifyWinner_1, ChangeTurn_1, MachinePlays_1, ResetBoard_1, ShowWorld_1, PlanningAlgorithmStrategy;
    return {
        setters: [
            function (ComputationalStrategy_1_1) {
                ComputationalStrategy_1 = ComputationalStrategy_1_1;
            },
            function (Plan_1_1) {
                Plan_1 = Plan_1_1;
            },
            function (Consola_1_1) {
                Consola_1 = Consola_1_1;
            },
            function (ModifyBoard_1_1) {
                ModifyBoard_1 = ModifyBoard_1_1;
            },
            function (VerifyWinner_1_1) {
                VerifyWinner_1 = VerifyWinner_1_1;
            },
            function (ChangeTurn_1_1) {
                ChangeTurn_1 = ChangeTurn_1_1;
            },
            function (MachinePlays_1_1) {
                MachinePlays_1 = MachinePlays_1_1;
            },
            function (ResetBoard_1_1) {
                ResetBoard_1 = ResetBoard_1_1;
            },
            function (ShowWorld_1_1) {
                ShowWorld_1 = ShowWorld_1_1;
            }
        ],
        execute: function () {
            PlanningAlgorithmStrategy = class PlanningAlgorithmStrategy extends ComputationalStrategy_1.ComputationalStrategy {
                constructor(categories) {
                    super();
                    this._categories = categories;
                }
                run() {
                    return new Promise((resolve) => {
                        var plans = {}; //Map<String,Plan> 
                        //TODO Crear un banco de acciones
                        //TODO Las acciones se almacentan en la LTM
                        if (this._categories[0].category === 'player_move') {
                            var planTmp = new Plan_1.Plan();
                            var modifyBoard = new ModifyBoard_1.ModifyBoard();
                            planTmp.addAction(modifyBoard);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            var verifyWinner = new VerifyWinner_1.VerifyWinner();
                            planTmp.addAction(verifyWinner);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            var changeTurn = new ChangeTurn_1.ChangeTurn();
                            planTmp.addAction(changeTurn);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            var machinePlays = new MachinePlays_1.MachinePlays();
                            planTmp.addAction(machinePlays);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            planTmp.addAction(verifyWinner);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            planTmp.addAction(changeTurn);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            var showWorld = new ShowWorld_1.ShowWorld();
                            planTmp.addAction(showWorld);
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            plans["player_move"] = planTmp;
                        }
                        else if (this._categories[0].category === 'reset') {
                            var planTmp = new Plan_1.Plan();
                            planTmp.addAction(new ResetBoard_1.ResetBoard());
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            planTmp.addAction(new ShowWorld_1.ShowWorld());
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            plans["reset"] = planTmp;
                        }
                        else if (this._categories[0].category === 'init') {
                            var planTmp = new Plan_1.Plan();
                            planTmp.addAction(new ShowWorld_1.ShowWorld());
                            Consola_1.Consola.getConsola('consolaEventos').log('New action added to the plan...');
                            plans["init"] = planTmp;
                        }
                        resolve(plans);
                    });
                }
            };
            exports_1("PlanningAlgorithmStrategy", PlanningAlgorithmStrategy);
        }
    };
});
