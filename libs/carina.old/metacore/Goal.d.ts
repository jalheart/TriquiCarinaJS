import { Element } from './Element';
import { State } from './State';
export declare class Goal extends Element {
    private _sourceState;
    private _targetState;
    sourceState: State;
    targetState: State;
}
