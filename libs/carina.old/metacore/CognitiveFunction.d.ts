import { Element } from './Element';
export declare abstract class CognitiveFunction extends Element {
    abstract processInformation(value: any): Promise<any>;
}
