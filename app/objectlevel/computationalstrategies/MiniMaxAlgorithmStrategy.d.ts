import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
export declare class MiniMaxAlgorithmStrategy extends ComputationalStrategy {
    private _cells;
    private _machineToken;
    private _playerToken;
    constructor(cells: string[][], playerToken: string, machineToken: string);
    /** Get next best move for computer.
      * @return  int[2] of {row, col}*/
    getMove(): number[];
    /** Recursive minimax at level of depth for either maximizing or minimizing player.
        Return int[3] of {score, row, col}  */
    private minimax(depth, player);
    /** Find all valid next moves.
        Return List of moves in int[2] of {row, col} or empty list if gameover */
    private generateMoves();
    /** The heuristic evaluation function for the current board
        @Return +100, +10, +1 for EACH 3-, 2-, 1-in-a-line for computer.
                -100, -10, -1 for EACH 3-, 2-, 1-in-a-line for opponent.
                0 otherwise   */
    private evaluate();
    /** The heuristic evaluation function for the given line of 3 cells
        @Return +100, +10, +1 for 3-, 2-, 1-in-a-line for computer.
                -100, -10, -1 for 3-, 2-, 1-in-a-line for opponent.
                0 otherwise */
    private evaluateLine(row1, col1, row2, col2, row3, col3);
    private winningPatterns;
    /** Returns true if thePlayer wins */
    private hasWon(thePlayer);
    run(): any;
}
