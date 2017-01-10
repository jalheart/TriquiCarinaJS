import { MouseSensor } from '../../../libs/carina/objectlevel/MouseSensor';
import { BasicMemoryUnity } from '../../../libs/carina/memory/BasicMemoryUnity';
declare var global:any;
export class PlayerMovement extends MouseSensor{
    private _target: HTMLElement;        
    constructor(){
        super();
        this.type   ='player_move';
        var sensors=document.getElementsByName('player_move');
        var i: number;
        var ob: HTMLElement;
        for (i = 0; i < sensors.length;i++){
            sensors[i].addEventListener('click', this.sensing);            
        }        
    }
    public sensing=(e)=>{
        this._target =e.srcElement;
        var pos:string=this._target.dataset['pos'];
        this.sensorMemory.storeInformation(new BasicMemoryUnity(this.type, pos)).then(()=>{
            this.dispatchAll('sensing');            
        });
    }
    public set movement(value:any){
        this.sensorMemory.storeInformation(new BasicMemoryUnity(this.type, value));
    }
    public get movement():any{
        return this.sensorMemory.retrieveInformation(this.type);
    }
}