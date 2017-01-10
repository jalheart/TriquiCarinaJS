import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { ReasoningTask} from '../../../libs/carina/objectlevel/ReasoningTask';
import { State } from '../../../libs/carina/metacore/State';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
import { Board} from '../models/Board';
export class ResetBoard extends ReasoningTask{
    public run():Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                var triquiModelOfTheWorld: TriquiModelOfTheWorld = <TriquiModelOfTheWorld>modelOfTheWorld;
                triquiModelOfTheWorld.board = new Board();
                triquiModelOfTheWorld.board.create(3,3);
                WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultSMOTW)=>{
                    var mentalStates    =[];
                    mentalStates.push(new State("is_system_started", true));
                    mentalStates.push(new State("is_board_modified", true));
                    mentalStates.push(new State("player_wins", false));
                    mentalStates.push(new State("machine_wins", false));
                    mentalStates.push(new State("is_player_played", false));
                    mentalStates.push(new State("is_machine_played", false));
                    mentalStates.push(new State("is_machine_winner_verified", false));
                    mentalStates.push(new State("is_machine_turn_changed", false));
                    mentalStates.push(new State("is_player_turn_changed", false));
                    mentalStates.push(new State("is_player_winner_verified", false));
                    WorkingMemory.instance.setMentalStates(mentalStates).then((resultUMS)=>{                        
                        resolve(true);
                    })
                })
            });
        });
    }    
}