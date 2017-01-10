import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { ComputationalStrategy } from '../metacore/ComputationalStrategy';
import { Category } from './Category';
export declare class Categorization extends CognitiveFunction {
    processInformation(value: any): any;
    processInformationComputationalStrategy(value: new (categories: Category[]) => ComputationalStrategy): Promise<any[]>;
    getCategories(): Promise<Category[]>;
}
