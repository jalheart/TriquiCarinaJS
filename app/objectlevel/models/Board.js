System.register(["../../../libs/carina/metacore/Element"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1, Board;
    return {
        setters: [
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }
        ],
        execute: function () {
            Board = class Board extends Element_1.Element {
                constructor() {
                    super();
                }
                create(filas, columnas) {
                    this._cells = [];
                    for (var i = 0; i < filas; i++) {
                        this._cells[i] = [];
                        for (var j = 0; j < columnas; j++) {
                            this.cells[i][j] = '';
                        }
                    }
                    //this._cells   =[][];
                }
                getData(fila, columna) {
                    return this._cells[fila][columna];
                }
                setData(fila, columna, dato) {
                    this._cells[fila][columna] = dato;
                }
                /**
                 * @return the cells
                 */
                get cells() {
                    return this._cells;
                }
                /**
                 * @param cells the cells to set
                 */
                set cells(cells) {
                    this._cells = cells;
                }
                // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new Board();
                    if (jsonObject._cells)
                        salida.cells = jsonObject['_cells'];
                    return salida;
                }
            };
            exports_1("Board", Board);
        }
    };
});
