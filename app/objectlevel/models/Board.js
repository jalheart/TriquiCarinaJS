System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element, Board;
    return {
        setters:[],
        execute: function() {
            Element = carina.metacore.Element;
            /**
             *
             * @author jalheart
             */
            class Board extends Element {
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
            }
            exports_1("Board", Board);
        }
    }
});
