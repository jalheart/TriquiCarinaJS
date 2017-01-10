import { ComputationalStrategy} from '../../../libs/carina/metacore/ComputationalStrategy';
import { ModelOfTheWorld} from '../../../libs/carina/objectlevel/ModelOfTheWorld';
import { Category} from '../../../libs/carina/objectlevel/Category';
import { BasicCognitiveProcessingUnit} from '../../../libs/carina/objectlevel/BasicCognitiveProcessingUnit';
import { WorkingMemory} from '../../../libs/carina/memory/WorkingMemory';
import { BasicMemoryUnity} from '../../../libs/carina/memory/BasicMemoryUnity';
import { TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
export class CategorizationAlgorithmStrategy extends ComputationalStrategy{
    private _modelOfTheWorld: ModelOfTheWorld;
    private _categories: Category[];
    private _value: string;

    public constructor(categories?: Category[]){
        super();
        this.categories =categories;
    }
    public run():Promise<any>{
        return new Promise((resolve)=>{
            WorkingMemory.instance.getBCPU().then((bcpu)=>{
                WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld).then((modelOfTheWorld)=>{
                    var categoriesTmp: any[]   =[];
                    //TODO Cargar los inputs desde la lista de inputs en la bcpu
                    var memoryInformation: any = bcpu.getInput("reset")?bcpu.getInput("reset"):bcpu.getInput("player_move").information;
                    this.value = memoryInformation;
                    //TODO cargar los patrones desde la bcpu
                    var regExp: RegExp = new RegExp('[0-2]_[0-2]');
                    if (regExp.test(this.value)){
                        var information:string[]    =this.value.split("_");
                        var cells: string[][] = (<TriquiModelOfTheWorld>modelOfTheWorld).board.cells;                    
                        var cellData: string = cells[+information[0]][+information[1]];
                        if(cellData==null || cellData==''){                        
                            for (let category of this.categories) {
                                if (category.category==='player_move'){
                                    if (categoriesTmp.indexOf(category.category)<0)
                                        categoriesTmp.push(category.category);
                                }
                            }                        
                        }
                    }else{
                        for (let category of this.categories) {
                            if (category.category==='reset'){
                                if (categoriesTmp.indexOf(category.category)<0)
                                    categoriesTmp.push(category.category);
                            }
                        }                                
                    }
                    resolve(categoriesTmp);
                });
            });
        });
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the modelOfTheWorld
     */
    public get modelOfTheWorld():ModelOfTheWorld{
        return this._modelOfTheWorld;
    }

    /**
     * @param modelOfTheWorld the modelOfTheWorld to set
     */
    public set modelOfTheWorld(modelOfTheWorld:ModelOfTheWorld) {
        this._modelOfTheWorld = modelOfTheWorld;
    }
    /**
     * @return the categories
     */
    public get categories():Category[]{
        return this._categories;
    }

    /**
     * @param categories the categories to set
     */
    public set categories(categories:Category[]) {
        this._categories = categories;
    }
    /**
     * @return the value
     */
    public get value():string{
        return this._value;
    }

    /**
     * @param value the value to set
     */
    public set value(value:string) {
        this._value = value;
    }
    // </editor-fold>
}