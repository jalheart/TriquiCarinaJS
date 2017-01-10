import { ModelOfTheWorld } from '../../../libs/carina/objectlevel/ModelOfTheWorld';
import { Goal } from '../../../libs/carina/metacore/Goal';
import { WorkingMemory } from '../../../libs/carina/memory/WorkingMemory';
import { BasicMemoryUnity } from '../../../libs/carina/memory/BasicMemoryUnity';
import {Board} from '../models/Board';
declare var global:any;
/**
 * @author jalheart
 */
export class TriquiModelOfTheWorld extends ModelOfTheWorld{
    private  _board:Board;
    private _machineToken:string   = "O";
    private _playerToken:string    = "X";
    private _isMeTurn:boolean      = false;

    public constructor() {
        super();
        this._board  =new Board();
        this._board.create(3,3);
        this.mission    =new Goal();        
        //Si no se ha inicializado la board, se inicializado
        //Si ya se inicilaizo, se carga de la workingMemory la board guardada
        // if(!board.equals(getStateIs_created())){
        //     this.setStateIs_created(true);
        //     this.updateModelOfTheWorld();
        // }else{
        //     this.getBoard().setCells((String[][])WorkingMemory.getInstance().retrieveInformation("cells").information);
        // }
    }
    public changeTurn(){
        this.stateIsMeTurn  =!this.stateIsMeTurn;        
    }
    public get currentToken():string{
        return this.stateIsMeTurn?this.machineToken:this.playerToken;
    }
    /**
     * Agrega los TOKENs usados para cada jugador
     * <p>
     * @param machine_token
     * @param player_token
     * </p>
     */
    public addTokens(machineToken:string, playerToken:string){
        this.machineToken=machineToken;
        this.playerToken=playerToken;        
    }
    public addMission(value:string){
        if(this.mission.sourceState!=null){
            this.mission.sourceState.name   =value;
            this.mission.sourceState.value=false;
            this.mission.targetState.name=value;
            this.mission.targetState.value=false;
        }
    }
    /**
     * @return the board
     */
    public get board():Board{
        return this._board;
    }

    /**
     * @param board the board to set
     */
    public set board(board:Board) {
        this._board = board;
    }        
    /**
     * @return the is_me_turn
     */
    public get stateIsMeTurn():boolean{
        return this._isMeTurn;
    }

    /**
     * @param is_me_turn the is_me_turn to set
     */
    public set stateIsMeTurn(isMeTurn:boolean) {
        this._isMeTurn = isMeTurn;
    }
    /**
     * @return the machine_token
     */
    public get machineToken():string{
        return this._machineToken
    }

    /**
     * @param machine_token the machine_token to set
     */
    public set machineToken(machineToken:string) {
        this._machineToken = machineToken;
    }

    /**
     * @return the player_token
     */
    public get playerToken():string{
        return this._playerToken;
    }
    /**
     * @param player_token the player_token to set
     */
    public set playerToken(playerToken:string) {
        this._playerToken = playerToken
    }
    public updateModelOfTheWorld(): Promise<any>{
        return new Promise((resolve)=>{
//            WorkingMemory.instance.storeInformation(new BasicMemoryUnity("cells", this.board.cells)).then((resultCells)=>{
                WorkingMemory.instance.storeInformation(new BasicMemoryUnity("is_created", this.stateIsCreated)).then((resultCreated)=>{
                    resolve(true);
                });
//            });
        });
    }
    // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
    public static fromJSON(jsonObject: any): TriquiModelOfTheWorld{
        var salida: TriquiModelOfTheWorld;
        salida = new TriquiModelOfTheWorld();
        if (jsonObject['_isMeTurn']) salida.stateIsMeTurn = <boolean>jsonObject['_isMeTurn'];
        if (jsonObject['_board']) salida.board = Board.fromJSON(jsonObject['_board']);
        if (jsonObject['_machineToken']) salida.machineToken = jsonObject['_machineToken'];
        if (jsonObject['_playerToken']) salida.playerToken= jsonObject['_playerToken'];
        return salida;
    }    
    // </editor-fold>
}