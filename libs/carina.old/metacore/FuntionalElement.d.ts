import { RootElement } from './RootElement';
import { State } from './State';
export declare abstract class FuntionalElement extends RootElement {
    state: State;
    startTime: any;
    endTime: any;
    private _effect;
    private _precodition;
    constructor();
    effect: State;
    precodition: State;
}
