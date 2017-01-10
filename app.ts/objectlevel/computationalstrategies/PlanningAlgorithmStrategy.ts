import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
import { Task } from '../../../libs/carina/metacore/Task';
import { Plan} from '../../../libs/carina/metacore/Plan';
import { Category} from '../../../libs/carina/objectlevel/Category';
import { Consola} from '../../../libs/Consola';
import { ModifyBoard} from '../tasks/ModifyBoard';
import { VerifyWinner} from '../tasks/VerifyWinner';
import { ChangeTurn} from '../tasks/ChangeTurn';
import { MachinePlays} from '../tasks/MachinePlays';
import { ResetBoard} from '../tasks/ResetBoard';
import { ShowWorld} from '../tasks/actions/ShowWorld';
export class PlanningAlgorithmStrategy extends ComputationalStrategy{
    private _categories: Category[];
    public constructor(categories: Category[]) {
        super();
        this._categories =categories;
    }    
    public run():Promise<any>{
        return new Promise((resolve)=>{
            var plans:any  ={};//Map<String,Plan> 
            //TODO Crear un banco de acciones
            //TODO Las acciones se almacentan en la LTM
            if (this._categories[0].category==='player_move'){
                var planTmp: Plan    =new Plan();

                var modifyBoard :ModifyBoard    =new ModifyBoard();
                planTmp.addAction(modifyBoard);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');                

                var verifyWinner:VerifyWinner   =new VerifyWinner();
                planTmp.addAction(verifyWinner);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                var changeTurn  : ChangeTurn    =new ChangeTurn();
                planTmp.addAction(changeTurn);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                var machinePlays: MachinePlays  =new MachinePlays();
                planTmp.addAction(machinePlays);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                planTmp.addAction(verifyWinner);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                planTmp.addAction(changeTurn);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                var showWorld: ShowWorld         =new ShowWorld();
                planTmp.addAction(showWorld);
                Consola.getConsola('consolaEventos').log('New action added to the plan...');

                plans["player_move"]    = planTmp;
            }else if(this._categories[0].category==='reset'){
                var planTmp: Plan    =new Plan();
                planTmp.addAction(new ResetBoard());
                Consola.getConsola('consolaEventos').log('New action added to the plan...');
                planTmp.addAction(new ShowWorld());
                Consola.getConsola('consolaEventos').log('New action added to the plan...');
                plans["reset"]    = planTmp;
            }else if(this._categories[0].category==='init'){
                var planTmp: Plan    =new Plan();
                planTmp.addAction(new ShowWorld());
                Consola.getConsola('consolaEventos').log('New action added to the plan...');
                plans["init"]    = planTmp;
            }            
            resolve(plans);
        });
    }
}