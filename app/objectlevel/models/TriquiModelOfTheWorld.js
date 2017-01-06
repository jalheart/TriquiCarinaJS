System.register(['../models/Board'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Board_1;
    var ModelOfTheWorld, Goal, WorkingMemory, BasicMemoryUnity, TriquiModelOfTheWorld;
    return {
        setters:[
            function (Board_1_1) {
                Board_1 = Board_1_1;
            }],
        execute: function() {
            ModelOfTheWorld = carina.objectlevel.ModelOfTheWorld;
            Goal = carina.metacore.Goal;
            BasicMemoryUnity = carina.memory.BasicMemoryUnity;
            /**
             * @author jalheart
             */
            class TriquiModelOfTheWorld extends ModelOfTheWorld {
                constructor() {
                    super();
                    this._machineToken = "O";
                    this._playerToken = "X";
                    this._isMeTurn = false;
                    this._board = new Board_1.Board();
                    this._board.create(3, 3);
                    this.mission = new Goal();
                    console.log(this.stateIsCreated);
                    // if(!board.equals(getStateIs_created())){
                    //     this.setStateIs_created(true);
                    //     this.updateModelOfTheWorld();
                    // }else{
                    //     this.getBoard().setCells((String[][])WorkingMemory.getInstance().retrieveInformation("cells").information);
                    // }
                }
                changeTurn() {
                    this.stateIsMeTurn = !this.stateIsMeTurn;
                }
                currentToken() {
                    return this.stateIsMeTurn ? this.machineToken : this.playerToken;
                }
                /**
                 * Agrega los TOKENs usados para cada jugador
                 * <p>
                 * @param machine_token
                 * @param player_token
                 * </p>
                 */
                addTokens(machineToken, playerToken) {
                    this.machineToken = machineToken;
                    this.playerToken = playerToken;
                }
                addMission(value) {
                    if (this.mission.sourceState != null) {
                        this.mission.sourceState.name = value;
                        this.mission.sourceState.value = false;
                        this.mission.targetState.name = value;
                        this.mission.targetState.value = false;
                    }
                }
                /**
                 * @return the board
                 */
                get board() {
                    return this._board;
                }
                /**
                 * @param board the board to set
                 */
                set board(board) {
                    this._board = board;
                }
                /**
                 * @return the is_me_turn
                 */
                get stateIsMeTurn() {
                    return this._isMeTurn;
                }
                /**
                 * @param is_me_turn the is_me_turn to set
                 */
                set stateIsMeTurn(isMeTurn) {
                    this._isMeTurn = isMeTurn;
                }
                /**
                 * @return the machine_token
                 */
                get machineToken() {
                    return this._machineToken;
                }
                /**
                 * @param machine_token the machine_token to set
                 */
                set machineToken(machineToken) {
                    this._machineToken = machineToken;
                }
                /**
                 * @return the player_token
                 */
                get playerToken() {
                    return this._playerToken;
                }
                /**
                 * @param player_token the player_token to set
                 */
                set playerToken(playerToken) {
                    this._playerToken = playerToken;
                }
                updateModelOfTheWorld() {
                    var workingMemory = global.WorkingMemory.instance;
                    ;
                    workingMemory.storeInformation(new BasicMemoryUnity("cells", this.board.cells));
                    workingMemory.storeInformation(new BasicMemoryUnity("is_created", this.stateIsCreated));
                }
            }
            exports_1("TriquiModelOfTheWorld", TriquiModelOfTheWorld);
        }
    }
});
