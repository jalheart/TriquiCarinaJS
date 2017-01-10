/**
 *
 * @author jalheart
 */
import { Element } from '../../../libs/carina/metacore/Element';
export declare class Board extends Element {
    private _cells;
    constructor();
    create(filas: number, columnas: number): void;
    getData(fila: number, columna: number): string;
    setData(fila: number, columna: number, dato: string): void;
    /**
     * @return the cells
     */
    /**
     * @param cells the cells to set
     */
    cells: string[][];
    static fromJSON(jsonObject: any): Board;
}
