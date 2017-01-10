import { ReasoningTask } from '../../../libs/carina/objectlevel/ReasoningTask';
export declare class VerifyWinner extends ReasoningTask {
    /**
     * @return Boolean Devuelve true si la tarea se ejecuta exitosamente
     */
    run(): Promise<any>;
    private transposition(cells);
    private diagonal(cells);
    private tell(cells, token);
}
