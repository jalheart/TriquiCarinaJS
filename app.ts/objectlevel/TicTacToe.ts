//TODO A cada clase se le debe agregar un metodo estático llamado fromJSON  que se encarga de crear una intancia con base en un json obtenido de la memoria
//FIXME Si gana la maquina, se cambian los tokens, pero internamentes siguen igual
import { State} from '../../libs/carina/metacore/State';
import { MemoryDriverIndexDB } from '../../libs/carina/memory/MemoryDriverIndexDB';
import { BasicMemoryUnity } from '../../libs/carina/memory/BasicMemoryUnity';
import { Memory } from '../../libs/carina/memory/Memory';
import { LongTermMemory} from '../../libs/carina/memory/LongTermMemory';
import { PerceptualMemory} from '../../libs/carina/memory/PerceptualMemory';
import { SensorMemory} from '../../libs/carina/memory/SensorMemory';
import { WorkingMemory } from '../../libs/carina/memory/WorkingMemory';
import { Pattern } from '../../libs/carina/objectlevel/Pattern';
import { Category } from '../../libs/carina/objectlevel/Category';
import { ModelOfTheSelf } from '../../libs/carina/modeloftheself/ModelOfTheSelf';
import { BasicCognitiveProcessingUnit } from '../../libs/carina/objectlevel/BasicCognitiveProcessingUnit';
import { AgentSettings} from '../../libs/carina/objectlevel/AgentSettings';
import { Consola} from '../../libs/Consola';
import {Reasoner} from './controllers/Reasoner';
export class TicTacToe{
    private _path: string='./app/';
    private _config: JSON;    
    public init(){
        this.initConsoles();
        this.loadJSON(this._path + 'config.json').then((result)=>{
            this._config = result;
            AgentSettings.config = result;
            this.initMemories().then(()=>{
                this.loadInitialData(this._config).then((result)=>{
                    this.loadCognitiveModels(this._config["cognitive_models"]).then((result)=>{
                        this.initModelOfTheSelf().then((result)=>{
                            var workingMemory:WorkingMemory  =WorkingMemory.instance;
                            var tmpBCPU: BasicCognitiveProcessingUnit  =new BasicCognitiveProcessingUnit();                            
                            WorkingMemory.instance.setBCPU(tmpBCPU).then((result)=>{
                                var reasoner:Reasoner   =new Reasoner();                                
                            });
//                            WorkingMemory.instance.bcpu  =new BasicCognitiveProcessingUnit();             
                            //Esto es usado para mostrar los eventos que sucenden en el sistema
//                            reasoner.initSensors();
//                            reasoner.sensing();
                            // if(reasoner.perception()){
                            //     if(reasoner.recognition()){
                            //         reasoner.categorization();
                            //         if(wm.getMental_state("is_categorized").getValue()){//Es una categoria conocida
                            //             reasoner.planning();
                            //             reasoner.run();
                            //         }
                            //     }
                            // }
                            // reasoner.showBoard();
                        });
                    });
                });
            });            
        }).catch((result)=>{
            console.error('Error cargando el archivo de configuración');
        });
    }
    /** Se usa para cargar el archivo de configuración **/
    private loadJSON(url): Promise<JSON>{
        return new Promise((resolve,reject)=>{
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('get', url, true);            
            request.onload = function(event: ProgressEvent){
                resolve(JSON.parse((event.currentTarget as XMLHttpRequest).responseText));
            }
            request.onerror =function(event){
                reject({error:true});
            }
            request.send();
        });
    }
    /** Se inicializan las consolas para mostrar un log de los procesos internos realizados **/
    private initConsoles(){
        var consolaEventos: Consola  =Consola.getConsola('consolaEventos');
        consolaEventos.init('consolaEventos');
        var consolaEstadosMentales: Consola = Consola.getConsola('consolaEstadosMentales');
        consolaEstadosMentales.init('consolaEstadosMentales');        
    }
    /** Carga la inromación el JSON a las memorias utilizadas por el sistema **/
    private initMemories():Promise<boolean>{
        return new Promise((resolve,reject)=>{
            var config: JSON = AgentSettings.config;
            var memoryConfig:JSON   =config['memory_management'];            
            if(memoryConfig['type']==='indexDB'){                
                var dataBaseConfig: JSON = memoryConfig['config'];
                this.initMemory(dataBaseConfig,LongTermMemory, 'longterm_memory').then((result)=>{
                    this.initMemory(dataBaseConfig, PerceptualMemory, 'perceptual_memory').then((result)=>{
                        this.initMemory(dataBaseConfig, SensorMemory, 'sensors').then((result)=>{
                            this.initMemory(dataBaseConfig, WorkingMemory, 'working_memory').then((result)=>{
                                resolve(true);
                            });                            
                        });                        
                    });
                });                
            }
        });
    }    
    private initMemory(dataBaseConfig: JSON, memory: any, tableName: string): Promise<boolean>{
        return new Promise((resolve)=>{
            var dbConfigMemory: JSON = JSON.parse(JSON.stringify(dataBaseConfig));
            dbConfigMemory['tableName'] = tableName;
            var memoryDriverMemory: MemoryDriverIndexDB = new MemoryDriverIndexDB(dbConfigMemory);
            memoryDriverMemory.init().then((result)=>{            
                memory.init(memoryDriverMemory);
                resolve(true);
            });               
        });
    }    
    /** Carga los datos iniciales definidos por el archivo de configuración **/
    private loadInitialData(config: JSON): Promise<boolean>{
        return new Promise((resolve)=>{
            var ltm: JSON = config['initial_data']['long_term_memory'];
            this.loadPatterns(ltm['patterns']);
            this.loadCategories(ltm['categories']);
            this.loadMentalStates(config['initial_data']['mental_states']);
            resolve(true)
        });
    }
    private loadPatterns(patterns: string[]){
        var initialPatterns: Pattern[]  =[];
        for (let pattern of patterns){
            initialPatterns.push(new Pattern(pattern));
        }        
        LongTermMemory.instance.storeInformation(new BasicMemoryUnity("patterns",initialPatterns));        
    }
    private loadCategories(categories:string[]){
        var initialCategories: Category[]    =[];
        for (let category of categories){
            initialCategories.push(new Category(category));
        }
        LongTermMemory.instance.storeInformation(new BasicMemoryUnity("categories", initialCategories));
    }
    private loadMentalStates(states: JSON){
        var stateTmp: State;
        //Hay estados persistentes y volatiles, ya que algunos no se deben reiniciar cada vez que se inicie una peticion 
        var persistents: JSON =states["persistents"];
        var pKeys: string[] = Object.keys(persistents);
        for (let key of pKeys){
            stateTmp = new State(key, persistents[key]);
            WorkingMemory.instance.setMentalState(stateTmp,false).then((result)=>{});
        };
                
        var volatiles: JSON =states["volatile"];
        var vKeys: string[] = Object.keys(volatiles);
        for (let key of vKeys){
            stateTmp = new State(key, volatiles[key]);
            WorkingMemory.instance.setMentalState(stateTmp,false).then((result)=>{});
//            global.WorkingMemory.instance.setMentalState(stateTmp,false).then((result)=>{});
        };
    }
    private loadCognitiveModels(cognitiveModelsJSON: JSON): Promise<boolean>{
        return new Promise((resolve)=>{            
            var cognitiveModelURL: string        =cognitiveModelsJSON[0]["cognitive_model"];            
//            JsonReader  modelJSON;
//            modelJSON = Json.createReader(new FileReader(this._path+"/cognitive_models/"+cognitiveModelURL));            
//            this._interpreter   =Interpreter.interpreter();
//            this._interpreter.setModel(modelJSON.readObject());
//            _interpreter.getCognitiveFuntions();
            resolve(true);
        });
    }
    private initModelOfTheSelf(): Promise<boolean>{
        return new Promise((resolve)=>{
            var modelOfTheSelf:ModelOfTheSelf;
            resolve(true);
    //        ModelOfTheSelf  modelOfTheSelf  = ModelOfTheSelf.modelOfTheSelf();
    //        modelOfTheSelf.getKnownCognitiveFunctions().put("cf_triqui_perception",new CFBase());
    //        CognitiveFunction  m=modelOfTheSelf.getKnownCognitiveFunctions().get("cf_triqui_perception");
    //        m.processInformation(null);
        });
    }
}