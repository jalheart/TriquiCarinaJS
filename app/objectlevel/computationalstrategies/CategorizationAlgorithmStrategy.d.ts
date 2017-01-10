import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
import { ModelOfTheWorld } from '../../../libs/carina/objectlevel/ModelOfTheWorld';
import { Category } from '../../../libs/carina/objectlevel/Category';
export declare class CategorizationAlgorithmStrategy extends ComputationalStrategy {
    private _modelOfTheWorld;
    private _categories;
    private _value;
    constructor(categories?: Category[]);
    run(): Promise<any>;
    /**
     * @return the modelOfTheWorld
     */
    /**
     * @param modelOfTheWorld the modelOfTheWorld to set
     */
    modelOfTheWorld: ModelOfTheWorld;
    /**
     * @return the categories
     */
    /**
     * @param categories the categories to set
     */
    categories: Category[];
    /**
     * @return the value
     */
    /**
     * @param value the value to set
     */
    value: string;
}
