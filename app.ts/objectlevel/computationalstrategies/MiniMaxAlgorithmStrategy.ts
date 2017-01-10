import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
export class MiniMaxAlgorithmStrategy extends ComputationalStrategy{
    private _cells: string[][];
    private _machineToken: string;
    private _playerToken: string;
    public constructor(cells: string[][], playerToken: string, machineToken: string){
        super();
        this._cells  =cells;
        this._machineToken = machineToken;
        this._playerToken = playerToken;
    }     
   /** Get next best move for computer. 
     * @return  int[2] of {row, col}*/   
    public getMove(): number[]{
        var result: number[] = this.minimax(2, this._machineToken); // depth, max turn        
        var salida: number[] =[];
        salida[0] =result[1];
        salida[1] =result[2];
        return salida;   // row, col
   }
 
   /** Recursive minimax at level of depth for either maximizing or minimizing player.
       Return int[3] of {score, row, col}  */
    private minimax(depth: number, player: string): number[]{
      // Generate possible next moves in a List of int[2] of {row, col}.
//       List<int[]> nextMoves = generateMoves();
        var nextMoves: number[][] = this.generateMoves();        
      // mySeed is maximizing; while oppSeed is minimizing
        var bestScore: number = player == this._machineToken ? Number.MIN_VALUE : Number.MAX_VALUE;
        var currentScore: number;
        var bestRow: number = -1;
        var bestCol: number = -1;        
        if (nextMoves.length==0 || depth == 0) {
           // Gameover or depth reached, evaluate score
           bestScore = this.evaluate();
        } else {
           for (let move of nextMoves) {               
              // Try this move for the current "player"
              this._cells[move[0]][move[1]] = player;              
              if (player == this._machineToken) {  // mySeed (computer) is maximizing player
                  currentScore = this.minimax(depth - 1, this._playerToken)[0];
                  if (currentScore > bestScore) {                  
                      bestScore = currentScore;
                      bestRow   = move[0];
                      bestCol   = move[1];
                  }
              } else {  // oppSeed is minimizing player
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
    private generateMoves(): number[][] {
//      List<int[]> nextMoves = new ArrayList<>();
        var nextMoves: number[][] = [];
        var movimientoTmp: number[];
        var row, col: number;
      // If gameover, i.e., no next move; 
      // If gameover, i.e., no next move
        if (this.hasWon(this._machineToken) || this.hasWon(this._playerToken)) {
          return nextMoves;   // return empty list
        }        
        // Search for empty cells and add to the List
        for (row = 0; row < 3; ++row) {
           for (col = 0; col < 3; ++col) {
              if (this._cells[row][col]==null || this._cells[row][col]=="") {
                  movimientoTmp   =[0,0];
                  movimientoTmp[0]=row;
                  movimientoTmp[1]=col;
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
    private evaluate(): number{
        var score: number = 0;
      // Evaluate score for each of the 8 lines (3 rows, 3 columns, 2 diagonals)
      score += this.evaluateLine(0, 0, 0, 1, 0, 2);  // row 0
      score += this.evaluateLine(1, 0, 1, 1, 1, 2);  // row 1
      score += this.evaluateLine(2, 0, 2, 1, 2, 2);  // row 2
      score += this.evaluateLine(0, 0, 1, 0, 2, 0);  // col 0
      score += this.evaluateLine(0, 1, 1, 1, 2, 1);  // col 1
      score += this.evaluateLine(0, 2, 1, 2, 2, 2);  // col 2
      score += this.evaluateLine(0, 0, 1, 1, 2, 2);  // diagonal
      score += this.evaluateLine(0, 2, 1, 1, 2, 0);  // alternate diagonal
      return score;
   } 
   /** The heuristic evaluation function for the given line of 3 cells
       @Return +100, +10, +1 for 3-, 2-, 1-in-a-line for computer.
               -100, -10, -1 for 3-, 2-, 1-in-a-line for opponent.
               0 otherwise */
    private evaluateLine(row1: number, col1: number, row2: number, col2: number, row3: number, col3: number): number{
        var score: number = 0;
      // First cell
      if (this._cells[row1][col1] == this._machineToken) {
         score = 1;
      } else if (this._cells[row1][col1] == this._playerToken) {
         score = -1;
      }
      // Second cell
      if (this._cells[row2][col2] == this._machineToken) {
         if (score == 1) {   // cell1 is mySeed
            score = 10;
         } else if (score == -1) {  // cell1 is oppSeed
            return 0;
         } else {  // cell1 is empty
            score = 1;
         }
      } else if (this._cells[row2][col2] == this._playerToken) {
         if (score == -1) { // cell1 is oppSeed
            score = -10;
         } else if (score == 1) { // cell1 is mySeed
            return 0;
         } else {  // cell1 is empty
            score = -1;
         }
      } 
      // Third cell
      if (this._cells[row3][col3] == this._machineToken) {
         if (score > 0) {  // cell1 and/or cell2 is mySeed
            score *= 10;
         } else if (score < 0) {  // cell1 and/or cell2 is oppSeed
            return 0;
         } else {  // cell1 and cell2 are empty
            score = 1;
         }
      } else if (this._cells[row3][col3] == this._playerToken) {
         if (score < 0) {  // cell1 and/or cell2 is oppSeed
            score *= 10;
         } else if (score > 1) {  // cell1 and/or cell2 is mySeed
            return 0;
         } else {  // cell1 and cell2 are empty
            score = -1;
         }
      }
      return score;
   } 
    private winningPatterns: number[] = [
         0b111000000, 0b000111000, 0b000000111, // rows
         0b100100100, 0b010010010, 0b001001001, // cols
         0b100010001, 0b001010100               // diagonals
    ];
   /** Returns true if thePlayer wins */
   private hasWon(thePlayer:string):boolean{
        var pattern: number = 0b000000000;  // 9-bit pattern for the 9 cells
        var row, col: number;
        for (row = 0; row < 3; ++row) {
            for (col = 0; col < 3; ++col) {
                if (thePlayer==this._cells[row][col]) {
                    pattern |= (1 << (row * 3 + col));
                }
            }
        }      
        for (let winningPattern of this.winningPatterns) {
           if ((pattern & winningPattern) == winningPattern) return true;
        }      
        return false;
   }
   public run():any{
        return this.getMove();
    }
}