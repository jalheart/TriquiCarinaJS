import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { ReasoningTask} from '../../../libs/carina/objectlevel/ReasoningTask';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
export class ModifyBoard extends ReasoningTask{
    /**
     * @return Boolean Devuelve true si la tarea se ejecuta exitosamente
     */
    public run():Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                var triquiModelOfTheWorld: TriquiModelOfTheWorld    =<TriquiModelOfTheWorld>modelOfTheWorld;
                var cells: string[][] = (<TriquiModelOfTheWorld>modelOfTheWorld).board.cells;        
                WorkingMemory.instance.getBCPU().then((bcpu)=>{
                    var positionTmp: string = bcpu.getInput('player_move').information;                    
                    var position: string[]   =positionTmp.split("_");  
                    triquiModelOfTheWorld.board.setData(+position[0], +position[1], triquiModelOfTheWorld.currentToken);
                    triquiModelOfTheWorld.updateModelOfTheWorld().then((updated)=>{
                        WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultUMOTW)=>{
                            this._executed  =true;
                            this._successful=true;
                            this._stopPlan  =false;
                            WorkingMemory.instance.updateMentalState("is_board_modified", true).then((resultUMS)=>{
                                WorkingMemory.instance.updateMentalState("is_player_played", true).then((resultUMS)=>{
                                    resolve(true);                                    
                                });
                            });
                        });
                    });
                });
            });            
        });
    }
}