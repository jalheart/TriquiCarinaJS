import { ComputationalStrategy } from '../../../libs/carina/metacore/ComputationalStrategy';
export class RandomAlgorithmStrategy extends ComputationalStrategy{
    private _cells: string[][];
    public constructor(cells: string[][]) {
        super();
        this._cells = cells;
    }    
    public run(): any{
        var salida: number[]    =[];
        var valorTmp: string;
        do{
            salida[0] = Math.floor(Math.random()*3);            
            salida[1] = Math.floor(Math.random()*3);
            valorTmp    =this._cells[salida[0]][salida[1]];
        } while (valorTmp != null && valorTmp!='');
        return salida;
    }
    // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
    /**
     * @return the _cells
     */
    public get cells(): string[][]{
        return this._cells;
    }

    /**
     * @param _cells the _cells to set
     */
    public set cells(cells: string[][]) {
        this._cells = cells;
    }
    // </editor-fold>
}