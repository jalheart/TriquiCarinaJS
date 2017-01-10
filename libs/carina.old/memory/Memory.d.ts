import { MemoryDriver } from './MemoryDriver';
import { BasicMemoryUnity } from './BasicMemoryUnity';
export declare abstract class Memory {
    private _driver;
    constructor(driver: MemoryDriver);
    storeInformation(information: BasicMemoryUnity): Promise<boolean>;
    retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
    forgetInformation(cue: string): void;
    driver: MemoryDriver;
}
