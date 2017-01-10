/**
 * @author jalheart
 */
import { WorkingMemory } from '../../../libs/carina/memory/WorkingMemory';
import { Perception } from '../../../libs/carina/objectlevel/Perception';
import { Recognition } from '../../../libs/carina/objectlevel/Recognition';
import { Categorization } from '../../../libs/carina/objectlevel/Categorization';
import { Planning } from '../../../libs/carina/objectlevel/Planning';
import { Plan } from '../../../libs/carina/metacore/Plan';
import { Sensor} from '../../../libs/carina/metacore/Sensor';
import { AgentSettings} from '../../../libs/carina/objectlevel/AgentSettings';
import { Category} from '../../../libs/carina/objectlevel/Category';
import { Consola} from '../../../libs/Consola';
import { PlayerMovement } from '../sensors/PlayerMovement';
import { ResetButton} from '../sensors/ResetButton';
import {Board} from '../models/Board';
import {TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
import { CategorizationAlgorithmStrategy} from '../computationalstrategies/CategorizationAlgorithmStrategy';
import { PlanningAlgorithmStrategy} from '../computationalstrategies/PlanningAlgorithmStrategy';
/**
 * Se encarga de realizar el proceso de razonamiento del triqui
 */
export class Reasoner{
    private _workingMemory:WorkingMemory;
    private _perception:Perception;
    private _playerMovement :PlayerMovement;//Es el sensor
    private _resetButton: ResetButton;//Es el sensor
    private _recognition:Recognition;
    private _categorization:Categorization;
    private _planning:Planning;
    private _plans:Plan[];
    private _inputs:string[][]  =[];
    private _output:any;
    constructor(inputs?:string[][],output?:any){
        this._inputs = inputs ? inputs:[];
        this._output = output ? output:null;
        this._workingMemory =WorkingMemory.instance;        
        if(this._workingMemory.modelOfTheWorld==null){
            var modelOfTheWorld:TriquiModelOfTheWorld   =new TriquiModelOfTheWorld();
            modelOfTheWorld.addMission("win_game");
            modelOfTheWorld.addTokens("O", "X");
            this._workingMemory.modelOfTheWorld =modelOfTheWorld;
        }
        
        this.initSensors();
        this._recognition      =new Recognition();
        this._categorization   =new Categorization();
        this._perception       =new Perception();
        this._planning         =new Planning();
        this._plans            =[];
        WorkingMemory.instance.getBCPU().then((bcpu)=>{
            bcpu.categorys = [new Category('init')];
            WorkingMemory.instance.setBCPU(bcpu).then((result)=>{
                this.cicloCognitivo();
            });
        });
        // this.plans  =new HashMap<>();
//         Consola.getConsola('consolaEstadosMentales').log(WorkingMemory.instance.bcpu.name);
    }
    public initSensors(){
        this._playerMovement   =new PlayerMovement();
        this._playerMovement.addEventListener('sensing', this.sensing);
        this._resetButton = new ResetButton();
        this._resetButton.addEventListener('sensing', this.sensing);
    }
    public sensing = (sensor: Sensor)=>{
        this.cicloCognitivo(sensor);
    }
    /**
     * Se encarga de la percepción del agente, se llega aquí despues de que un sensor se ha disparado
     */
     public cicloCognitivo(sensor?: Sensor){
         if (sensor){
            Consola.getConsola('consolaEventos').log('Sensing....');        
            this.perception(sensor).then((perceived)=>{
                this.recognition().then((recognized)=>{
                    if (recognized){
                        this.categorization().then((categorized)=>{
                            if(categorized){
                                this.planning().then((plans)=>{
                                    this.run(plans).then((executed)=>{                                    
                                    });
                                });
                            }else{
                                Consola.getConsola('consolaEventos').log('No associated category ...');
                            }
                        });
                    }
                });
            });
            this.showBoard();
         }else{
            this.planning().then((plans)=>{
                this.run(plans).then((executed)=>{
                });
            });
         }        
        /*
        if (sensor.type==='player_move'){//Es posible que este condicional no sea necesario
            this.perception(sensor).then((perceived)=>{
                this.recognition().then((recognized)=>{
                    console.log(recognized);
                });
            });
        }else if (sensor.type==='reset'){
            this.perception(sensor).then((perceived)=>{
                this.recognition().then((recognized)=>{
                    console.log(recognized);
                });
            });
        }
        */
     }
    public perception(sensor: Sensor): Promise<boolean>{
        return new Promise((resolve)=>{
            sensor.sensorMemory.retrieveInformation(sensor.type).then((result)=>{
                var param:any={
                    'information':result.information,
                    'type_sensor':result.cue
                }
                Consola.getConsola('consolaEventos').log('Perceiving...');
                this._perception.processInformation(param).then((result)=>{
                    resolve(true);
                });
            });  
        });
    }
    public recognition(): Promise<boolean>{
        return new Promise((resolve)=>{
            Consola.getConsola('consolaEventos').log('Recognizing...');
            this._recognition.processInformation().then((recognized)=>{
                WorkingMemory.instance.updateMentalState("is_recognized", recognized).then((result)=>{
                    Consola.getConsola('consolaEventos').log(recognized?'Recognized...':'No recognized...');
                    resolve(recognized);
                });
            });
        });
    }
    public categorization(): Promise<boolean>{
        return new Promise((resolve)=>{
            Consola.getConsola('consolaEventos').log('Categorizing...');
            this._categorization.processInformation(CategorizationAlgorithmStrategy).then((categorized)=>{                
                Consola.getConsola('consolaEventos').log(categorized?'Categorized...':'No categorized...');
                resolve(categorized);
            });
        });
    }
    public planning(): Promise<any>{
        return new Promise((resolve)=>{
            Consola.getConsola('consolaEventos').log('Planning...');
            this._planning.processInformation(PlanningAlgorithmStrategy).then((plans)=>{                
                Consola.getConsola('consolaEventos').log('Planned...');
                resolve(plans);
            });
        });
    }
    public run(plans:any): Promise<boolean>{        
        return new Promise((resolve)=>{
            Consola.getConsola('consolaEventos').log('Executing plan...');
            this._planning.executePlans(plans).then((executed)=>{
                resolve(executed);                
            });
        });
    }
    public showBoard(): Promise<any>{
        return new Promise((resolve)=>{
            Consola.getConsola('consolaEventos').log('Acting...');            
        });
    }
}