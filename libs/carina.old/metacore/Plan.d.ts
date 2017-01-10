import { Element } from './Element';
import { Task } from './Task';
export declare class Plan extends Element {
    private _actions;
    private _currentAction;
    Plan(): void;
    executePlan(): any;
    readonly actionsLength: number;
    actions: Task[];
    action: Task;
    currentAction: number;
}
