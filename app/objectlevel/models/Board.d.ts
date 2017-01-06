import Element = carina.metacore.Element;
/**
 *
 * @author jalheart
 */
export declare class Board extends Element {
    private _cells;
    create(): void;
    getData(fila: number, columna: number): string;
    setData(fila: number, columna: number, dato: string): void;
    /**
     * @return the cells
     */
    /**
     * @param cells the cells to set
     */
    cells: string[][];
}
