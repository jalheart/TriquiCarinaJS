import { Memory } from './Memory';
import { MemoryDriver } from './MemoryDriver';
export declare class PerceptualMemory extends Memory {
    private static _instance;
    private constructor(driver);
    static init(driver: MemoryDriver): void;
    static readonly instance: PerceptualMemory;
}
