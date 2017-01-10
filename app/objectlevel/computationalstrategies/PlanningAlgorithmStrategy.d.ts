import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
import { Category } from '../../../libs/carina/objectlevel/Category';
export declare class PlanningAlgorithmStrategy extends ComputationalStrategy {
    private _categories;
    constructor(categories: Category[]);
    run(): Promise<any>;
}
