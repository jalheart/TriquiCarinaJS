import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
export declare class RandomAlgorithmStrategy extends ComputationalStrategy {
    private _cells;
    constructor(cells: string[][]);
    run(): any;
    /**
     * @return the _cells
     */
    /**
     * @param _cells the _cells to set
     */
    cells: string[][];
}
