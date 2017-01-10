/**
 *
 * @author jalheart
 */
import { Element } from '../../../libs/carina/metacore/Element';
export class Board extends Element{
    private _cells:string[][];
    constructor(){
        super();        
    }
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
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): Board{
        var salida: Board;
        salida = new Board();
        if (jsonObject._cells) salida.cells= jsonObject['_cells'];
        return salida;
    }
    // </editor-fold>
}