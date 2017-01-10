System.register(["../../../../libs/carina/memory/WorkingMemory", "../../../../libs/Consola", "../../../../libs/carina/metacore/Action", "../../models/TriquiModelOfTheWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, Consola_1, Action_1, TriquiModelOfTheWorld_1, ShowWorld;
    return {
        setters: [
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (Consola_1_1) {
                Consola_1 = Consola_1_1;
            },
            function (Action_1_1) {
                Action_1 = Action_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            }
        ],
        execute: function () {
            ShowWorld = class ShowWorld extends Action_1.Action {
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_world_shown", true).then((resultUMS) => {
                            Consola_1.Consola.getConsola('consolaEventos').log('Showing board...');
                            var mentalStates = WorkingMemory_1.WorkingMemory.instance.mentalStates;
                            Consola_1.Consola.getConsola('consolaEstadosMentales').clear();
                            var winStr = '';
                            for (let state of mentalStates) {
                                Consola_1.Consola.getConsola('consolaEstadosMentales').log(state.name + ' : ' + state.value);
                                if (state.name == 'player_wins' && state.value) {
                                    winStr = 'PLAYER WINS';
                                }
                                else if (state.name == 'machine_wins' && state.value) {
                                    winStr = 'MACHINE WINS';
                                }
                            }
                            document.getElementById('win_div').innerHTML = winStr;
                            //                console.log(WorkingMemory.instance.getMentalStatePos('player_wins'));
                            WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                                var triquiModelOfTheWorld = modelOfTheWorld;
                                var celdas = triquiModelOfTheWorld.board.cells;
                                var elementoTmp;
                                for (let i = 0; i < celdas.length; i++) {
                                    for (let j = 0; j < celdas[i].length; j++) {
                                        elementoTmp = document.getElementById('pm_' + i + j);
                                        if (celdas[i][j] != null && celdas[i][j] != '') {
                                            elementoTmp.setAttribute('disabled', 'disabled');
                                            elementoTmp.setAttribute('value', celdas[i][j]);
                                        }
                                        else {
                                            elementoTmp.removeAttribute('disabled');
                                            elementoTmp.setAttribute('value', '');
                                        }
                                        if (winStr != '') {
                                            elementoTmp.setAttribute('disabled', 'disabled');
                                        }
                                    }
                                }
                            });
                        });
                        resolve(true);
                    });
                }
                // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
                /**
                 * @return the styles
                 */
                get styles() {
                    return this._styles;
                }
                /**
                 * @param styles the styles to set
                 */
                set styles(styles) {
                    this._styles = styles;
                }
            };
            exports_1("ShowWorld", ShowWorld);
        }
    };
});
