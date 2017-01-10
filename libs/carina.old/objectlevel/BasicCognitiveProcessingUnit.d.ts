import { RootElement } from '../metacore/RootElement';
import { Input } from './Input';
import { Pattern } from './Pattern';
import { Category } from './Category';
import { Plan } from '../metacore/Plan';
import { Goal } from '../metacore/Goal';
export declare class BasicCognitiveProcessingUnit extends RootElement {
    private _inputs;
    private _pattern;
    private _categorys;
    private _plans;
    private _goal;
    addInput(input: Input | any, typeSensor?: string): void;
    addPattern(pattern: any): void;
    addCategories(categories: any[]): void;
    addPlans(plans: Plan[]): void;
    readonly inputs: Input[];
    getInput(type: string): Input;
    input: Input;
    pattern: Pattern;
    categorys: Category[];
    readonly plans: Plan[];
    goal: Goal;
    static fromJSON(jsonObject: any): BasicCognitiveProcessingUnit;
}
