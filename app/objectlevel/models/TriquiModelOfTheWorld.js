System.register(["../../../libs/carina/objectlevel/ModelOfTheWorld", "../../../libs/carina/metacore/Goal", "../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/memory/BasicMemoryUnity", "../models/Board"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelOfTheWorld_1, Goal_1, WorkingMemory_1, BasicMemoryUnity_1, Board_1, TriquiModelOfTheWorld;
    return {
        setters: [
            function (ModelOfTheWorld_1_1) {
                ModelOfTheWorld_1 = ModelOfTheWorld_1_1;
            },
            function (Goal_1_1) {
                Goal_1 = Goal_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            },
            function (Board_1_1) {
                Board_1 = Board_1_1;
            }
        ],
        execute: function () {
            /**
             * @author jalheart
             */
            TriquiModelOfTheWorld = class TriquiModelOfTheWorld extends ModelOfTheWorld_1.ModelOfTheWorld {
                constructor() {
                    super();
                    this._machineToken = "O";
                    this._playerToken = "X";
                    this._isMeTurn = false;
                    this._board = new Board_1.Board();
                    this._board.create(3, 3);
                    this.mission = new Goal_1.Goal();
                    //Si no se ha inicializado la board, se inicializado
                    //Si ya se inicilaizo, se carga de la workingMemory la board guardada
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
                get currentToken() {
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
                    return new Promise((resolve) => {
                        //            WorkingMemory.instance.storeInformation(new BasicMemoryUnity("cells", this.board.cells)).then((resultCells)=>{
                        WorkingMemory_1.WorkingMemory.instance.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("is_created", this.stateIsCreated)).then((resultCreated) => {
                            resolve(true);
                        });
                        //            });
                    });
                }
                // <editor-fold defaultstate="collapsed" desc="implementación fromJSON">
                static fromJSON(jsonObject) {
                    var salida;
                    salida = new TriquiModelOfTheWorld();
                    if (jsonObject['_isMeTurn'])
                        salida.stateIsMeTurn = jsonObject['_isMeTurn'];
                    if (jsonObject['_board'])
                        salida.board = Board_1.Board.fromJSON(jsonObject['_board']);
                    if (jsonObject['_machineToken'])
                        salida.machineToken = jsonObject['_machineToken'];
                    if (jsonObject['_playerToken'])
                        salida.playerToken = jsonObject['_playerToken'];
                    return salida;
                }
            };
            exports_1("TriquiModelOfTheWorld", TriquiModelOfTheWorld);
        }
    };
});
