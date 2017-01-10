import { Goal } from '../metacore/Goal';
export declare class ModelOfTheWorld {
    private _mission;
    private _isCreated;
    mission: Goal;
    getStateIsCreated(): Promise<boolean>;
    stateIsCreated: boolean;
}
