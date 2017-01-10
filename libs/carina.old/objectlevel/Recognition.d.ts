import { CognitiveFunction } from '../metacore/CognitiveFunction';
export declare class Recognition extends CognitiveFunction {
    processInformation(value: any): Promise<any>;
    processInformationComputationalStrategy(value: any): Promise<boolean>;
    private checkText();
}
