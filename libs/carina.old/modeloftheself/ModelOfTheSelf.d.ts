import { Profile } from '../metacore/Profile';
import { Event } from '../metacore/Event';
import { CognitiveFunction } from '../metacore/CognitiveFunction';
export declare class ModelOfTheSelf {
    private _profiles;
    private _events;
    private _knownCognitiveFunctions;
    static _modelOfTheSelf: ModelOfTheSelf;
    private constructorf();
    static readonly modelOfTheSelf: ModelOfTheSelf;
    profiles: Profile[];
    getProfile(i: number): Profile;
    addProfile(profile: Profile, i: number): void;
    events: Event[];
    getEvent(i: number): Event;
    addEvent(event: Event, i: number): void;
    readonly knownCognitiveFunctions: CognitiveFunction[];
}
