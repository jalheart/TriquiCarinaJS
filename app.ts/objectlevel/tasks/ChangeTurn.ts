import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { ReasoningTask } from '../../../libs/carina/objectlevel/ReasoningTask';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
export class ChangeTurn extends ReasoningTask{
    public run():Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                var triquiModelOfTheWorld: TriquiModelOfTheWorld = <TriquiModelOfTheWorld>modelOfTheWorld;                
                var stateName: string = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken?"is_player_turn_changed":"is_machine_turn_changed";
                triquiModelOfTheWorld.changeTurn();
                WorkingMemory.instance.updateMentalState(stateName, true).then((resultUMS)=>{
                    WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld);
                    resolve(true);
                });
            });
        });
    }
}