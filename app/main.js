System.register(["./objectlevel/TicTacToe"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TicTacToe_1, ticTacToe;
    return {
        setters: [
            function (TicTacToe_1_1) {
                TicTacToe_1 = TicTacToe_1_1;
            }
        ],
        execute: function () {
            ticTacToe = new TicTacToe_1.TicTacToe();
            ticTacToe.init();
        }
    };
});
