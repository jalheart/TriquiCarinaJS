import { MemoryDriver } from './MemoryDriver';
import { BasicMemoryUnity } from './BasicMemoryUnity';
export declare class MemoryDriverIndexDB extends MemoryDriver {
    private _dataBase;
    constructor(config: any);
    init(): Promise<boolean>;
    storeInformation(information: BasicMemoryUnity): Promise<boolean>;
    retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
    forgetInformation(cue: string): Promise<boolean>;
}
