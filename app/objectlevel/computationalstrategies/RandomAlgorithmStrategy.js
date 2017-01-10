System.register(["../../../libs/carina/metacore/ComputationalStrategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComputationalStrategy_1, RandomAlgorithmStrategy;
    return {
        setters: [
            function (ComputationalStrategy_1_1) {
                ComputationalStrategy_1 = ComputationalStrategy_1_1;
            }
        ],
        execute: function () {
            RandomAlgorithmStrategy = class RandomAlgorithmStrategy extends ComputationalStrategy_1.ComputationalStrategy {
                constructor(cells) {
                    super();
                    this._cells = cells;
                }
                run() {
                    var salida = [];
                    var valorTmp;
                    do {
                        salida[0] = Math.floor(Math.random() * 3);
                        salida[1] = Math.floor(Math.random() * 3);
                        valorTmp = this._cells[salida[0]][salida[1]];
                    } while (valorTmp != null && valorTmp != '');
                    return salida;
                }
                // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
                /**
                 * @return the _cells
                 */
                get cells() {
                    return this._cells;
                }
                /**
                 * @param _cells the _cells to set
                 */
                set cells(cells) {
                    this._cells = cells;
                }
            };
            exports_1("RandomAlgorithmStrategy", RandomAlgorithmStrategy);
        }
    };
});
