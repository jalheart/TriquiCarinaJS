import { Strategy } from '../metacore/Strategy';
import { CognitiveTask } from './CognitiveTask';
export declare class ReasoningTask extends CognitiveTask {
    private _strategys;
    buildProfile(): void;
    run(): any;
    strategys: Strategy[];
    addStrategy(strategy: Strategy): void;
    getStrategy(pos: number): Strategy;
}
