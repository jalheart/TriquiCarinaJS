import { Sensor } from '../../../libs/carina/metacore/Sensor';
/**
 * Se encarga de realizar el proceso de razonamiento del triqui
 */
export declare class Reasoner {
    private _workingMemory;
    private _perception;
    private _playerMovement;
    private _resetButton;
    private _recognition;
    private _categorization;
    private _planning;
    /**
     * EN el constructor se inicializan los elementos necesarios para que el razonador pueda realizar su trabajo
     */
    constructor();
    /**
     * Proceso de inicialización de los sensores
     */
    initSensors(): void;
    sensing: (sensor: Sensor) => void;
    /**
     * El ciclo cognitvo a desarrollar por el agente
     */
    cognitiveLoop(sensor?: Sensor): void;
    /**
     * Actividad interna del razonador para realizar la percepción
     */
    perception(sensor: Sensor): Promise<boolean>;
    /**
     * Actividad interna del razonador para realizar el reconocimiento
     */
    recognition(): Promise<boolean>;
    /**
     * Actividad interna del razonador para realizar la categorización
     */
    categorization(): Promise<boolean>;
    /**
     * Actividad interna del razonador para realizar la planeación
     */
    planning(): Promise<any>;
    /**
     * Actividad interna del razonador para la ejecuación de los planes
     */
    run(plans: any): Promise<boolean>;
}
