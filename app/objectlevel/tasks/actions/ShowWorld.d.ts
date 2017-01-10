import { Action } from '../../../../libs/carina/metacore/Action';
export declare class ShowWorld extends Action {
    private _styles;
    run(): Promise<any>;
    /**
     * @return the styles
     */
    /**
     * @param styles the styles to set
     */
    styles: any;
}
