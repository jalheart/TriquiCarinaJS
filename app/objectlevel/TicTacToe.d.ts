import { Agent } from '../../libs/carina/objectlevel/Agent';
export declare class TicTacToe extends Agent {
    private _path;
    private _config;
    init(): void;
    /** Se usa para cargar el archivo de configuración **/
    private loadJSON(url);
    /** Se inicializan las consolas para mostrar un log de los procesos internos realizados **/
    private initConsoles();
    /** Carga la inromación el JSON a las memorias utilizadas por el sistema **/
    private initMemories();
    private initMemory(dataBaseConfig, memory, tableName);
    /** Carga los datos iniciales definidos por el archivo de configuración **/
    private loadInitialData(config);
    private loadPatterns(patterns);
    private loadCategories(categories);
    private loadMentalStates(states);
    private loadCognitiveModels(cognitiveModelsJSON);
    private initModelOfTheSelf();
}
