import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { ReasoningTask} from '../../../libs/carina/objectlevel/ReasoningTask';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
import { RandomAlgorithmStrategy} from '../computationalstrategies/RandomAlgorithmStrategy';
import { MiniMaxAlgorithmStrategy} from '../computationalstrategies/MiniMaxAlgorithmStrategy';
export class MachinePlays extends ReasoningTask{
    public run(): Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                var triquiModelOfTheWorld: TriquiModelOfTheWorld = <TriquiModelOfTheWorld>modelOfTheWorld;
                //TODO Vamos a incluir metacognición
                var rStrategy: RandomAlgorithmStrategy = new RandomAlgorithmStrategy(triquiModelOfTheWorld.board.cells);
                var mmStrategy: MiniMaxAlgorithmStrategy = new MiniMaxAlgorithmStrategy(triquiModelOfTheWorld.board.cells, triquiModelOfTheWorld.playerToken, triquiModelOfTheWorld.machineToken);
//                var position: number[]    =mmStrategy.run();                
                var position: number[] = rStrategy.run();
                triquiModelOfTheWorld.board.setData(position[0], position[1], triquiModelOfTheWorld.currentToken);
                WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultSMOTW)=>{
                    WorkingMemory.instance.updateMentalState("is_machine_played", true).then((resultUMS)=>{
                        resolve(true);
                    })
                });
            });
        });
    }    
}