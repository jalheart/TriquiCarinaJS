import { MouseSensor } from '../../../libs/carina/objectlevel/MouseSensor';
export declare class PlayerMovement extends MouseSensor {
    private _target;
    constructor();
    sensing: (e: any) => void;
    movement: any;
}
