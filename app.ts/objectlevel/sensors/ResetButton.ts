import { MouseSensor } from '../../../libs/carina/objectlevel/MouseSensor';
import { BasicMemoryUnity } from '../../../libs/carina/memory/BasicMemoryUnity';
export class ResetButton extends MouseSensor{
    private _target: HTMLElement;
    constructor(){
        super();
        this.type   ='reset';
        var sensor = document.getElementById('btn_reset');
        sensor.addEventListener('click', this.sensing);            
    }
    public sensing=(e)=>{
        this._target =e.srcElement;
        this.sensorMemory.storeInformation(new BasicMemoryUnity(this.type, 'reset')).then(()=>{
            this.dispatchAll('sensing');
        });
    }    
}