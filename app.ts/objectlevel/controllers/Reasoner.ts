/**
 * @author jalheart
 */
import * as modulo from "../../../libs/CarinaCore";
import * as mConsola from '../../../libs/Consola';
import WorkingMemory= carina.memory.WorkingMemory;
import Perception= carina.objectlevel.Perception;
import Recognition= carina.objectlevel.Recognition;
import Categorization= carina.objectlevel.Categorization;
import Planning= carina.objectlevel.Planning;
import Plan= carina.metacore.Plan;
import {PlayerMovement} from '../models/PlayerMovement';
import {Board} from '../models/Board';
import {TriquiModelOfTheWorld} from '../models/TriquiModelOfTheWorld';
declare var global:any;
/**
 * Se encarga de realizar el proceso de razonamiento del triqui
 */
export class Reasoner{
    private _workingMemory:WorkingMemory;
    private _perception:Perception;
    private _playerMovement:PlayerMovement;
    private _recognition:Recognition;
    private _categorization:Categorization;
    private _planning:Planning;
    private _plans:Plan[];
    private _inputs:string[][];
    private _output:any;
    constructor(inputs?:string[][],output?:any){
        this._inputs    =inputs;
        this._output    =output;
        this._workingMemory =global.WorkingMemory.instance;        
        if(this._workingMemory.modelOfTheWorld==null){
            var modelOfTheWorld:TriquiModelOfTheWorld   =new TriquiModelOfTheWorld();
            modelOfTheWorld.addMission("win_game");
            modelOfTheWorld.addTokens("O", "X");
            this._workingMemory.modelOfTheWorld =modelOfTheWorld;
        }
        
        // this._playerMovement    =new PlayerMovement();
        // this._recognition       =new Recognition();
        // this._categorization    =new Categorization();
        // this._perception        =new Perception();
        // this._planning          =new Planning();
        // this.plans  =new HashMap<>();
        
    }
    // private sleep(miliseconds:number) {        
    //     var currentTime = new Date().getTime();
    //     while (currentTime + miliseconds >= new Date().getTime()) {            
    //     }
    // }
}