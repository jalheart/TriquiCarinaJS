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
    private _workingMemory:WorkingMemory;//Accesos a la memoria de trabajo
    private _perception:Perception;//Acceso al sistema de percepción
    private _playerMovement :PlayerMovement;//Sensor utilizado para las jugadas del jugador
    private _resetButton: ResetButton;//Sensor utilizado para reiniciar el juego
    private _recognition:Recognition;//Acceso al sistema de reconocimiento
    private _categorization:Categorization;//Acceso a sistema de configuración
    private _planning:Planning;//Acceso al sistema de planeación
    /**
     * EN el constructor se inicializan los elementos necesarios para que el razonador pueda realizar su trabajo
     */
    constructor(){
        this._workingMemory =WorkingMemory.instance;//Se obtiene una instancia de la mamoria de trabaja para un acceso rápido
        if(this._workingMemory.modelOfTheWorld==null){//En caso de que no exista un modelo del mundo definido
            var modelOfTheWorld:TriquiModelOfTheWorld   =new TriquiModelOfTheWorld();//Se crea un modelo del mundo
            modelOfTheWorld.addMission("win_game");//Se define la misión(Goal) principal
            modelOfTheWorld.addTokens("O", "X");//Se agregan los tokens(Fichas de jugadores)
            this._workingMemory.modelOfTheWorld =modelOfTheWorld;//EL nuevo modelo del mundo es registrado en la memoria de trabajo
        }
        
        this.initSensors();//Se inicializan los sensores
        this._perception       =new Perception();//Se inicializa el sistema de percepción
        this._recognition      =new Recognition();//Se inicializa el sistema de reconocimiento
        this._categorization   =new Categorization();//Se inicializa el sistema de categorización
        this._planning         =new Planning();//Se inicializa el sistema de planeación
        WorkingMemory.instance.getBCPU().then((bcpu)=>{//Se obtine la BasicCognitivePoccessingUnity desde la memoria de trabajo
            bcpu.categorys = [new Category('init')];//Se agrega una categoría a la BCPU
            WorkingMemory.instance.setBCPU(bcpu).then((result)=>{//Se actualiza la BCPU en la memoria de trabajo
                this.cognitiveLoop();//Se inicia un ciclo cognitivo
            });
        });
        // this.plans  =new HashMap<>();
//         Consola.getConsola('consolaEstadosMentales').log(WorkingMemory.instance.bcpu.name);
    }
    /**
     * Proceso de inicialización de los sensores
     */
    public initSensors(){
        this._playerMovement   =new PlayerMovement();//Se obtiene una instancia de sonsor encargado de registrar las jugadas
        this._playerMovement.addEventListener('sensing', this.sensing);//Se asocia una acción a realizar cada vez que sea activado el sensor
        this._resetButton = new ResetButton();//Se obtiene una instancia de sonsor encargado de registrar el reinicio del juego
        this._resetButton.addEventListener('sensing', this.sensing);//Se asocia una acción a realizar cada vez que sea activado el sensor
    }
    public sensing = (sensor: Sensor)=>{
        //Cada vez que se active un sensor, se inicia un ciclo cognitivo
        this.cognitiveLoop(sensor);
    }
    /**
     * El ciclo cognitvo a desarrollar por el agente
     */
     public cognitiveLoop(sensor?: Sensor){
         if (sensor){//Si el ciclo cognitivo es iniciado por un sensor
            Consola.getConsola('consolaEventos').log('Sensing....');//Se nuestra en la consola de eventos el paso actual del proceso cognitivo
            this.perception(sensor).then((perceived)=>{//Se realiza el proceso de percepción, utilizando el sensor que inicio el ciclo cognitivo.
                //Una vez se termine el proceso de percepción,
                //se intenta identificar la información percibida
                //mediante un proceso de reconocimiento
                this.recognition().then((recognized)=>{
                    //Si la información percibida se puede reconocer
                    if (recognized){
                        //Una vez reconocida la iformación percibida,
                        //se intenta categorizar para su procesamiento
                        this.categorization().then((categorized)=>{
                            //Si la información percibida se encuentra dentro de una del las categorías conocidas
                            if(categorized){
                                //Se intenta realizar el proceso de planeación
                                this.planning().then((plans)=>{
                                    //Una vez obtenido un(os) plan(es)
                                    //Son ejecutadas las cciones definidas
                                    this.run(plans).then((executed)=>{                                    
                                    });
                                });
                            }else{
                                //Si la información percibida no se encuentra dentro de una del las categorías conocidas
                                //Se muestra en la consola de eventos.
                                Consola.getConsola('consolaEventos').log('No associated category ...');
                            }
                        });
                    }else{
                        //Si la información percibida no pudo ser reconocida
                        //Se muestra en la consola de eventos.
                        Consola.getConsola('consolaEventos').log('No recognized ...');
                    }
                });
            });
         }else{//El ciclo cognitivo no es iniciado por un sensor; en este caso, es iniciado cuando el sistema inicia o recarga(Despierta)
            //Se intenta realizar el proceso de planeación
            this.planning().then((plans)=>{
                //Una vez obtenido un(os) plan(es)
                //Son ejecutadas las cciones definidas
                this.run(plans).then((executed)=>{
                });
            });
        }        
    }
    /**
     * Actividad interna del razonador para realizar la percepción
     */
    public perception(sensor: Sensor): Promise<boolean>{
        return new Promise((resolve)=>{
            //Se recuperan los datos registrados por el sensor en la memoria sensorial
            sensor.sensorMemory.retrieveInformation(sensor.type).then((result)=>{
                var param:any={
                    'information':result.information,
                    'type_sensor':result.cue
                }
                //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                Consola.getConsola('consolaEventos').log('Perceiving...');
                //Se intentan procesar los datos generados por el sensor con el sistema de percepción
                //Este internamente envia los resultados a la BCPU
                this._perception.processInformation(param).then((result)=>{                    
                    resolve(true);
                });
            });  
        });
    }
    /**
     * Actividad interna del razonador para realizar el reconocimiento
     */
    public recognition(): Promise<boolean>{
        return new Promise((resolve)=>{
            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
            Consola.getConsola('consolaEventos').log('Recognizing...');
            //Se intentan procesar los datos generados por el sistema de percepción y que se encuentran en la BCPU
            //Para identificarlos y definir si son reconocidos, usa el sistema de reconocimiento
            this._recognition.processInformation().then((recognized)=>{
                //Una vez obtenido un resultado, se ectualiza el estado menta correspondiente
                WorkingMemory.instance.updateMentalState("is_recognized", recognized).then((result)=>{
                    //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                    Consola.getConsola('consolaEventos').log(recognized?'Recognized...':'No recognized...');
                    resolve(recognized);
                });
            });
        });
    }
    /**
     * Actividad interna del razonador para realizar la categorización
     */
    public categorization(): Promise<boolean>{
        return new Promise((resolve)=>{
            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
            Consola.getConsola('consolaEventos').log('Categorizing...');
            //Se intentan procesar los datos generados por el sistema de reconocimiento y que se encuentran en la BCPU
            //Para enmarcarlos dentro de la categorias conocidas.
            //Es necesario decir al sistema de categorización cual será la estrategia a utilizar
            this._categorization.processInformation(CategorizationAlgorithmStrategy).then((categorized)=>{
                //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                Consola.getConsola('consolaEventos').log(categorized?'Categorized...':'No categorized...');
                resolve(categorized);
            });
        });
    }
    /**
     * Actividad interna del razonador para realizar la planeación
     */
    public planning(): Promise<any>{
        return new Promise((resolve)=>{
            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
            Consola.getConsola('consolaEventos').log('Planning...');
            //Se intentan realizar la planeación con base en la categorización previa y que se encuentran en la BCPU            
            //Es necesario decir al sistema de planeación cual será la estrategia a utilizar
            this._planning.processInformation(PlanningAlgorithmStrategy).then((plans)=>{
                //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                Consola.getConsola('consolaEventos').log('Planned...');
                resolve(plans);
            });
        });
    }
    /**
     * Actividad interna del razonador para la ejecuación de los planes
     */
    public run(plans:any): Promise<boolean>{
        return new Promise((resolve)=>{
            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
            Consola.getConsola('consolaEventos').log('Executing plan...');
            //Se intentan ejecutar las acciones definidas en los planes que se encuentran en la bcpu            
            this._planning.executePlans(plans).then((executed)=>{
                resolve(executed);                
            });
        });
    }    
}