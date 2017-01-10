import { ReasoningTask } from '../../../libs/carina/objectlevel/ReasoningTask';
import { WorkingMemory } from '../../../libs/carina/memory/WorkingMemory';
import { TriquiModelOfTheWorld } from '../models/TriquiModelOfTheWorld';
export class VerifyWinner extends ReasoningTask{
    /**
     * @return Boolean Devuelve true si la tarea se ejecuta exitosamente
     */
    public run():Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                var triquiModelOfTheWorld: TriquiModelOfTheWorld = <TriquiModelOfTheWorld>modelOfTheWorld;
                var stateName: string = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken?'is_player_winner_verified':'is_machine_winner_verified';                
                var stateWin: string = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken?"player_wins":"machine_wins";
                var columns: string[][] = this.transposition(triquiModelOfTheWorld.board.cells);
                var temp: string[][] = this.diagonal(triquiModelOfTheWorld.board.cells);
                var diagonal: string[]=temp[0];
                var cross: string[]   =temp[1];
                var i, countToken: number;
                var winned: boolean=false;
                WorkingMemory.instance.updateMentalState(stateName, true).then((resultUMS)=>{
                    for (i = 0; i < 3; i++) {
                        var row: string[] = triquiModelOfTheWorld.board.cells[i];
                        countToken = this.tell(row, triquiModelOfTheWorld.currentToken);
                        if(countToken==3){
                            this.updateTaskState(true, true, true);
                            winned  =true;
                        }
                    }
                    for (i = 0; i < 3; i++) {
                        var column: string[] =columns[i];
                        countToken = this.tell(column, triquiModelOfTheWorld.currentToken);
                        if(countToken==3){
                            this.updateTaskState(true, true, true);
                            winned = true;                            
                        }
                    }
                    var count_d: number = this.tell(diagonal, triquiModelOfTheWorld.currentToken);
                    var count_t: number = this.tell(cross, triquiModelOfTheWorld.currentToken);
                    if(count_d==3 || count_t==3){
                        this.updateTaskState(true, true, true);
                        winned = true;
                    }
                    if (winned){
                        WorkingMemory.instance.updateMentalState(stateWin, true).then((resultUMS)=>{
                            resolve(true);
                        });
                    } else{
                        this.updateTaskState(true, true, false);                        
                        resolve(true);
                    }
                });
            });            
        });
    }    
    private transposition(cells: string[][]): string[][]{
        var temp: string[][] = [['','',''],['','',''],['','','']];
        for (let i=0; i < 3; i++) { 
            for (let j=0; j < 3; j++) { 
                temp[j][i] = cells[i][j];
            }
        }
        return temp;
    }
    private diagonal(cells: string[][]): string[][]{
        var temps: string[][] = [['','',''],['','',''],['','','']];
        for (let i=0; i < 3; i++) { 
            temps[0][i]=cells[i][i];
            temps[1][i]=cells[i][2-i];
        }
        return temps;
    }
    private tell(cells: string[], token: string): number{
        var temp: number = 0;
        for (let i=0; i < 3; i++) { 
            if(cells[i]!=null && cells[i]===token)
                temp++;
        }
        return temp;
    }
}