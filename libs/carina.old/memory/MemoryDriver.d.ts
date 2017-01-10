import { BasicMemoryUnity } from './BasicMemoryUnity';
export declare abstract class MemoryDriver {
    private _config;
    constructor(config: any);
    abstract init(): Promise<boolean>;
    abstract storeInformation(information: BasicMemoryUnity): Promise<boolean>;
    abstract retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
    abstract forgetInformation(cue: string): Promise<boolean>;
    config: any;
}
