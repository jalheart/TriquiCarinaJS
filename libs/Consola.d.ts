export declare class Consola {
    private _elemento;
    private static _instances;
    private constructor();
    init(selector: string): void;
    log(dato: string): void;
    static getConsola(nombre: string): Consola;
}
