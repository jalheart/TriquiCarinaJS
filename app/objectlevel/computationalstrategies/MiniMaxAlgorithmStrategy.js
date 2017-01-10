System.register(["../../../libs/carina/metacore/ComputationalStrategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComputationalStrategy_1, MiniMaxAlgorithmStrategy;
    return {
        setters: [
            function (ComputationalStrategy_1_1) {
                ComputationalStrategy_1 = ComputationalStrategy_1_1;
            }
        ],
        execute: function () {
            MiniMaxAlgorithmStrategy = class MiniMaxAlgorithmStrategy extends ComputationalStrategy_1.ComputationalStrategy {
                constructor(cells, playerToken, machineToken) {
                    super();
                    this.winningPatterns = [
                        0b111000000, 0b000111000, 0b000000111,
                        0b100100100, 0b010010010, 0b001001001,
                        0b100010001, 0b001010100 // diagonals
                    ];
                    this._cells = cells;
                    this._machineToken = machineToken;
                    this._playerToken = playerToken;
                }
                /** Get next best move for computer.
                  * @return  int[2] of {row, col}*/
                getMove() {
                    var result = this.minimax(2, this._machineToken); // depth, max turn        
                    var salida = [];
                    salida[0] = result[1];
                    salida[1] = result[2];
                    return salida; // row, col
                }
                /** Recursive minimax at level of depth for either maximizing or minimizing player.
                    Return int[3] of {score, row, col}  */
                minimax(depth, player) {
                    // Generate possible next moves in a List of int[2] of {row, col}.
                    //       List<int[]> nextMoves = generateMoves();
                    var nextMoves = this.generateMoves();
                    // mySeed is maximizing; while oppSeed is minimizing
                    var bestScore = player == this._machineToken ? Number.MIN_VALUE : Number.MAX_VALUE;
                    var currentScore;
                    var bestRow = -1;
                    var bestCol = -1;
                    if (nextMoves.length == 0 || depth == 0) {
                        // Gameover or depth reached, evaluate score
                        bestScore = this.evaluate();
                    }
                    else {
                        for (let move of nextMoves) {
                            // Try this move for the current "player"
                            this._cells[move[0]][move[1]] = player;
                            if (player == this._machineToken) {
                                currentScore = this.minimax(depth - 1, this._playerToken)[0];
                                if (currentScore > bestScore) {
                                    bestScore = currentScore;
                                    bestRow = move[0];
                                    bestCol = move[1];
                                }
                            }
                            else {
                                currentScore = this.minimax(depth - 1, this._playerToken)[0];
                                if (currentScore < bestScore) {
                                    bestScore = currentScore;
                                    bestRow = move[0];
                                    bestCol = move[1];
                                }
                            }
                            // Undo move
                            this._cells[move[0]][move[1]] = null;
                        }
                    }
                    return [bestScore, bestRow, bestCol];
                }
                /** Find all valid next moves.
                    Return List of moves in int[2] of {row, col} or empty list if gameover */
                //   private List<int[]> generateMoves() {
                generateMoves() {
                    //      List<int[]> nextMoves = new ArrayList<>();
                    var nextMoves = [];
                    var movimientoTmp;
                    var row, col;
                    // If gameover, i.e., no next move; 
                    // If gameover, i.e., no next move
                    if (this.hasWon(this._machineToken) || this.hasWon(this._playerToken)) {
                        return nextMoves; // return empty list
                    }
                    // Search for empty cells and add to the List
                    for (row = 0; row < 3; ++row) {
                        for (col = 0; col < 3; ++col) {
                            if (this._cells[row][col] == null || this._cells[row][col] == "") {
                                movimientoTmp = [0, 0];
                                movimientoTmp[0] = row;
                                movimientoTmp[1] = col;
                                nextMoves.push(movimientoTmp);
                            }
                        }
                    }
                    return nextMoves;
                }
                /** The heuristic evaluation function for the current board
                    @Return +100, +10, +1 for EACH 3-, 2-, 1-in-a-line for computer.
                            -100, -10, -1 for EACH 3-, 2-, 1-in-a-line for opponent.
                            0 otherwise   */
                evaluate() {
                    var score = 0;
                    // Evaluate score for each of the 8 lines (3 rows, 3 columns, 2 diagonals)
                    score += this.evaluateLine(0, 0, 0, 1, 0, 2); // row 0
                    score += this.evaluateLine(1, 0, 1, 1, 1, 2); // row 1
                    score += this.evaluateLine(2, 0, 2, 1, 2, 2); // row 2
                    score += this.evaluateLine(0, 0, 1, 0, 2, 0); // col 0
                    score += this.evaluateLine(0, 1, 1, 1, 2, 1); // col 1
                    score += this.evaluateLine(0, 2, 1, 2, 2, 2); // col 2
                    score += this.evaluateLine(0, 0, 1, 1, 2, 2); // diagonal
                    score += this.evaluateLine(0, 2, 1, 1, 2, 0); // alternate diagonal
                    return score;
                }
                /** The heuristic evaluation function for the given line of 3 cells
                    @Return +100, +10, +1 for 3-, 2-, 1-in-a-line for computer.
                            -100, -10, -1 for 3-, 2-, 1-in-a-line for opponent.
                            0 otherwise */
                evaluateLine(row1, col1, row2, col2, row3, col3) {
                    var score = 0;
                    // First cell
                    if (this._cells[row1][col1] == this._machineToken) {
                        score = 1;
                    }
                    else if (this._cells[row1][col1] == this._playerToken) {
                        score = -1;
                    }
                    // Second cell
                    if (this._cells[row2][col2] == this._machineToken) {
                        if (score == 1) {
                            score = 10;
                        }
                        else if (score == -1) {
                            return 0;
                        }
                        else {
                            score = 1;
                        }
                    }
                    else if (this._cells[row2][col2] == this._playerToken) {
                        if (score == -1) {
                            score = -10;
                        }
                        else if (score == 1) {
                            return 0;
                        }
                        else {
                            score = -1;
                        }
                    }
                    // Third cell
                    if (this._cells[row3][col3] == this._machineToken) {
                        if (score > 0) {
                            score *= 10;
                        }
                        else if (score < 0) {
                            return 0;
                        }
                        else {
                            score = 1;
                        }
                    }
                    else if (this._cells[row3][col3] == this._playerToken) {
                        if (score < 0) {
                            score *= 10;
                        }
                        else if (score > 1) {
                            return 0;
                        }
                        else {
                            score = -1;
                        }
                    }
                    return score;
                }
                /** Returns true if thePlayer wins */
                hasWon(thePlayer) {
                    var pattern = 0b000000000; // 9-bit pattern for the 9 cells
                    var row, col;
                    for (row = 0; row < 3; ++row) {
                        for (col = 0; col < 3; ++col) {
                            if (thePlayer == this._cells[row][col]) {
                                pattern |= (1 << (row * 3 + col));
                            }
                        }
                    }
                    for (let winningPattern of this.winningPatterns) {
                        if ((pattern & winningPattern) == winningPattern)
                            return true;
                    }
                    return false;
                }
                run() {
                    return this.getMove();
                }
            };
            exports_1("MiniMaxAlgorithmStrategy", MiniMaxAlgorithmStrategy);
        }
    };
});
