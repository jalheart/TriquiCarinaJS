import * as modulo from "../../../libs/CarinaCore";
import Element=carina.metacore.Element;
/**
 *
 * @author jalheart
 */
export class Board extends Element{
    private _cells:string[][];
    public create(filas:number,columnas:number){
        this._cells =[];
        for(var i=0;i<filas;i++){
            this._cells[i]  =[];
            for (var j = 0; j < columnas; j++) {
                this.cells[i][j]    ='';
            }
        }
        //this._cells   =[][];
    }
    public getData(fila:number,columna:number):string{
        return this._cells[fila][columna];
    }
    public setData(fila:number,columna:number,dato:string){
        this._cells[fila][columna]   =dato;
    }
    /**
     * @return the cells
     */
    public get cells():string[][]{
        return this._cells;
    }
    /**
     * @param cells the cells to set
     */
    public set cells(cells:string[][]) {
        this._cells = cells;
    }
}