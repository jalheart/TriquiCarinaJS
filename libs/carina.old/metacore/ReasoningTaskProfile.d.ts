import { Profile } from './Profile';
import { Field } from './Field';
export declare class ReasoningTaskProfile extends Profile {
    private _fields;
    ReasoningTaskProfile(fields: Field[]): void;
    setField(name: string, value: any): void;
}
