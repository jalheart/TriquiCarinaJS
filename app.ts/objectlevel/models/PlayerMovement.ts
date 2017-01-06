import * as modulo from "../../../libs/CarinaCore";
import MouseSensor=carina.objectlevel.MouseSensor;
import BasicMemoryUnity=carina.memory.BasicMemoryUnity;
export class PlayerMovement extends MouseSensor{    
    constructor(){
        super();
    }
    public set movement(value:any){
        this.sensorMemory.storeInformation(new BasicMemoryUnity(this.type, value));
    }
    public get movement():any{
        return this.sensorMemory.retrieveInformation(this.type);
    }
}