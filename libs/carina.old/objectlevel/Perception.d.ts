import { CognitiveFunction } from '../metacore/CognitiveFunction';
import { BasicCognitiveProcessingUnit } from './BasicCognitiveProcessingUnit';
export declare class Perception extends CognitiveFunction {
    private _perception;
    processInformation(value: any[]): any;
    private processInformationObject(value);
    perception: BasicCognitiveProcessingUnit;
}
