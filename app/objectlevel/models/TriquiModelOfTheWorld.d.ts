import { ModelOfTheWorld } from '../../../libs/carina/objectlevel/ModelOfTheWorld';
import { Board } from '../models/Board';
/**
 * @author jalheart
 */
export declare class TriquiModelOfTheWorld extends ModelOfTheWorld {
    private _board;
    private _machineToken;
    private _playerToken;
    private _isMeTurn;
    constructor();
    changeTurn(): void;
    readonly currentToken: string;
    /**
     * Agrega los TOKENs usados para cada jugador
     * <p>
     * @param machine_token
     * @param player_token
     * </p>
     */
    addTokens(machineToken: string, playerToken: string): void;
    addMission(value: string): void;
    /**
     * @return the board
     */
    /**
     * @param board the board to set
     */
    board: Board;
    /**
     * @return the is_me_turn
     */
    /**
     * @param is_me_turn the is_me_turn to set
     */
    stateIsMeTurn: boolean;
    /**
     * @return the machine_token
     */
    /**
     * @param machine_token the machine_token to set
     */
    machineToken: string;
    /**
     * @return the player_token
     */
    /**
     * @param player_token the player_token to set
     */
    playerToken: string;
    updateModelOfTheWorld(): Promise<any>;
    static fromJSON(jsonObject: any): TriquiModelOfTheWorld;
}
