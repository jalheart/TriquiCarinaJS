declare module "metacore/RootElement" {
    export abstract class RootElement {
        private _name;
        private _output;
        constructor();
        name: string;
        output: string;
    }
}
declare module "metacore/Element" {
    import { RootElement } from "metacore/RootElement";
    export abstract class Element extends RootElement {
    }
}
declare module "metacore/Event" {
    import { Element } from "metacore/Element";
    export class Event extends Element {
        constructor(name: string);
    }
}
declare module "metacore/CognitiveFunction" {
    import { Element } from "metacore/Element";
    export abstract class CognitiveFunction extends Element {
        abstract processInformation(value: any): Promise<any>;
    }
}
declare module "metacore/EstructureElement" {
    import { RootElement } from "metacore/RootElement";
    export abstract class EstructureElement extends RootElement {
    }
}
declare module "metacore/Field" {
    import { RootElement } from "metacore/RootElement";
    export class Field extends RootElement {
        private _value;
        constructor(name: string, value: any);
        value: any;
    }
}
declare module "metacore/Profile" {
    import { RootElement } from "metacore/RootElement";
    export abstract class Profile extends RootElement {
    }
}
declare module "metacore/ReasoningTaskProfile" {
    import { Profile } from "metacore/Profile";
    import { Field } from "metacore/Field";
    export class ReasoningTaskProfile extends Profile {
        private _fields;
        ReasoningTaskProfile(fields: Field[]): void;
        setField(name: string, value: any): void;
    }
}
declare module "metacore/State" {
    import { Element } from "metacore/Element";
    export class State extends Element {
        private _value;
        constructor(name: string, value: boolean);
        value: boolean;
    }
}
declare module "metacore/FuntionalElement" {
    import { RootElement } from "metacore/RootElement";
    import { State } from "metacore/State";
    export abstract class FuntionalElement extends RootElement {
        state: State;
        startTime: any;
        endTime: any;
        private _effect;
        private _precodition;
        constructor();
        effect: State;
        precodition: State;
    }
}
declare module "metacore/Goal" {
    import { Element } from "metacore/Element";
    import { State } from "metacore/State";
    export class Goal extends Element {
        private _sourceState;
        private _targetState;
        sourceState: State;
        targetState: State;
    }
}
declare module "metacore/Task" {
    import { FuntionalElement } from "metacore/FuntionalElement";
    import { State } from "metacore/State";
    import { Goal } from "metacore/Goal";
    export abstract class Task extends FuntionalElement {
        private _goal;
        protected _effects: State[];
        protected _preconditions: State[];
        protected _executed: boolean;
        protected _successful: boolean;
        protected _stopPlan: boolean;
        Task(): void;
        abstract run(): any;
        buildProfile(): void;
        protected updateTaskState(executed: boolean, successful: boolean, stopPlan: boolean): void;
        goal: Goal;
        readonly executed: boolean;
        readonly successful: boolean;
        readonly stopPlan: boolean;
        effects: State[];
        preconditions: State[];
        addEffect(effect: State): void;
        addPrecondition(effect: State): void;
        getEffect(pos: number | string): State;
        private getEffectN(pos);
        private getEffectS(name);
        getPrecondition(pos: number | string): State;
        private getPreconditionN(pos);
        private getPreconditionS(name);
    }
}
declare module "metacore/Action" {
    import { Task } from "metacore/Task";
    export abstract class Action extends Task {
    }
}
declare module "metacore/Strategy" {
    import { FuntionalElement } from "metacore/FuntionalElement";
    export abstract class Strategy extends FuntionalElement {
        abstract run(): any;
    }
}
declare module "metacore/ComputationalStrategy" {
    import { Strategy } from "metacore/Strategy";
    export abstract class ComputationalStrategy extends Strategy {
    }
}
declare module "metacore/Plan" {
    import { Element } from "metacore/Element";
    import { Task } from "metacore/Task";
    export class Plan extends Element {
        private _actions;
        private _currentAction;
        Plan(): void;
        executePlan(): any;
        readonly actionsLength: number;
        actions: Task[];
        action: Task;
        currentAction: number;
    }
}
declare module "memory/BasicMemoryUnity" {
    export class BasicMemoryUnity {
        cue: string;
        information: any;
        constructor(cue: string, information: any);
    }
}
declare module "memory/MemoryDriver" {
    import { BasicMemoryUnity } from "memory/BasicMemoryUnity";
    export abstract class MemoryDriver {
        private _config;
        constructor(config: any);
        abstract init(): Promise<boolean>;
        abstract storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        abstract retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        abstract forgetInformation(cue: string): Promise<boolean>;
        config: any;
    }
}
declare module "memory/Memory" {
    import { MemoryDriver } from "memory/MemoryDriver";
    import { BasicMemoryUnity } from "memory/BasicMemoryUnity";
    export abstract class Memory {
        private _driver;
        constructor(driver: MemoryDriver);
        storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        forgetInformation(cue: string): void;
        driver: MemoryDriver;
    }
}
declare module "memory/LongTermMemory" {
    import { Memory } from "memory/Memory";
    import { MemoryDriver } from "memory/MemoryDriver";
    export class LongTermMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: LongTermMemory;
    }
}
declare module "memory/SensorMemory" {
    import { Memory } from "memory/Memory";
    import { MemoryDriver } from "memory/MemoryDriver";
    export class SensorMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: SensorMemory;
    }
}
declare module "metacore/Sensor" {
    import { SensorMemory } from "memory/SensorMemory";
    import { RootElement } from "metacore/RootElement";
    export abstract class Sensor extends RootElement {
        private _type;
        private _sensorMemory;
        constructor();
        perceiveInformation(value: any): any;
        type: string;
        readonly sensorMemory: SensorMemory;
    }
}
declare module "objectlevel/Input" {
    import { RootElement } from "metacore/RootElement";
    export class Input extends RootElement {
        private _information;
        private _type;
        constructor(information?: any, type?: string);
        information: any;
        type: string;
    }
}
declare module "objectlevel/Pattern" {
    import { RootElement } from "metacore/RootElement";
    export class Pattern extends RootElement {
        private _pattern;
        constructor(pattern?: any);
        pattern: any;
    }
}
declare module "objectlevel/Category" {
    import { RootElement } from "metacore/RootElement";
    export class Category extends RootElement {
        private _category;
        constructor(category?: any);
        category: any;
    }
}
declare module "objectlevel/BasicCognitiveProcessingUnit" {
    import { RootElement } from "metacore/RootElement";
    import { Input } from "objectlevel/Input";
    import { Pattern } from "objectlevel/Pattern";
    import { Category } from "objectlevel/Category";
    import { Plan } from "metacore/Plan";
    import { Goal } from "metacore/Goal";
    export class BasicCognitiveProcessingUnit extends RootElement {
        private _inputs;
        private _pattern;
        private _categorys;
        private _plans;
        private _goal;
        addInput(input: Input | any, typeSensor?: string): void;
        addPattern(pattern: any): void;
        addCategories(categories: any[]): void;
        addPlans(plans: Plan[]): void;
        readonly inputs: Input[];
        getInput(type: string): Input;
        input: Input;
        pattern: Pattern;
        categorys: Category[];
        readonly plans: Plan[];
        goal: Goal;
    }
}
declare module "memory/WorkingMemory" {
    import { Memory } from "memory/Memory";
    import { BasicCognitiveProcessingUnit } from "objectlevel/BasicCognitiveProcessingUnit";
    import { Profile } from "metacore/Profile";
    import { State } from "metacore/State";
    import { ModelOfTheWorld } from "objectlevel/ModelOfTheWorld";
    import { MemoryDriver } from "memory/MemoryDriver";
    export class WorkingMemory extends Memory {
        private static _instance;
        private _bcpu;
        private _model_of_the_world;
        private _profiles;
        private _mental_state;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        bcpu: BasicCognitiveProcessingUnit;
        modelOfTheWorld: ModelOfTheWorld;
        getProfile(id: number): Profile;
        readonly profiles: Profile[];
        setProfiles(profile: Profile, s?: boolean): void;
        mentalStates: State[];
        getMentalState(state: string): State;
        updateMentalState(name: string, value: boolean): Promise<boolean>;
        setMentalState(ms: State, s?: boolean): Promise<boolean>;
        static readonly instance: WorkingMemory;
        private getMentalStatePos(name);
        syncBCPU(value: BasicCognitiveProcessingUnit): void;
        syncModelOfTheWorld(value: ModelOfTheWorld): void;
    }
}
declare module "objectlevel/ModelOfTheWorld" {
    import { Goal } from "metacore/Goal";
    export class ModelOfTheWorld {
        private _mission;
        private _isCreated;
        mission: Goal;
        getStateIsCreated(): Promise<boolean>;
        stateIsCreated: boolean;
    }
}
declare module "memory/MemoryDriverIndexDB" {
    import { MemoryDriver } from "memory/MemoryDriver";
    import { BasicMemoryUnity } from "memory/BasicMemoryUnity";
    export class MemoryDriverIndexDB extends MemoryDriver {
        private _dataBase;
        constructor(config: any);
        init(): Promise<boolean>;
        storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        forgetInformation(cue: string): Promise<boolean>;
    }
}
declare module "memory/PerceptualMemory" {
    import { Memory } from "memory/Memory";
    import { MemoryDriver } from "memory/MemoryDriver";
    export class PerceptualMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: PerceptualMemory;
    }
}
declare module "objectlevel/AgentSettings" {
    import { RootElement } from "metacore/RootElement";
    export class AgentSettings extends RootElement {
        static db_settings: string[];
        static config: JSON;
    }
}
declare module "objectlevel/Actuator" {
    import { RootElement } from "metacore/RootElement";
    export class Actuator extends RootElement {
    }
}
declare module "objectlevel/Planning" {
    import { CognitiveFunction } from "metacore/CognitiveFunction";
    export class Planning extends CognitiveFunction {
        processInformation(value: any): any;
        private processInformationComputationalStrategy(value);
        executePlans(): any;
    }
}
declare module "objectlevel/Categorization" {
    import { CognitiveFunction } from "metacore/CognitiveFunction";
    import { ComputationalStrategy } from "metacore/ComputationalStrategy";
    import { Category } from "objectlevel/Category";
    export class Categorization extends CognitiveFunction {
        processInformation(value: any): any;
        processInformationComputationalStrategy(value: new (categories: Category[]) => ComputationalStrategy): Promise<any[]>;
        getCategories(): Promise<Category[]>;
    }
}
declare module "objectlevel/CognitiveTask" {
    import { Task } from "metacore/Task";
    export abstract class CognitiveTask extends Task {
    }
}
declare module "objectlevel/MemoryEvent" {
    import { Event } from "metacore/Event";
    export class MemoryEvent extends Event {
    }
}
declare module "objectlevel/MouseSensor" {
    import { Sensor } from "metacore/Sensor";
    export class MouseSensor extends Sensor {
        constructor();
    }
}
declare module "objectlevel/Perception" {
    import { CognitiveFunction } from "metacore/CognitiveFunction";
    import { BasicCognitiveProcessingUnit } from "objectlevel/BasicCognitiveProcessingUnit";
    export class Perception extends CognitiveFunction {
        private _perception;
        processInformation(value: any[]): any;
        private processInformationObject(value);
        perception: BasicCognitiveProcessingUnit;
    }
}
declare module "objectlevel/ReasoningEvent" {
    import { Event } from "metacore/Event";
    import { Profile } from "metacore/Profile";
    export class ReasoningEvent extends Event {
        private _profile;
        profile: Profile;
    }
}
declare module "objectlevel/ReasoningTask" {
    import { Strategy } from "metacore/Strategy";
    import { CognitiveTask } from "objectlevel/CognitiveTask";
    export class ReasoningTask extends CognitiveTask {
        private _strategys;
        buildProfile(): void;
        run(): any;
        strategys: Strategy[];
        addStrategy(strategy: Strategy): void;
        getStrategy(pos: number): Strategy;
    }
}
declare module "objectlevel/Recognition" {
    import { CognitiveFunction } from "metacore/CognitiveFunction";
    export class Recognition extends CognitiveFunction {
        processInformation(value: any): Promise<any>;
        processInformationComputationalStrategy(value: any): Promise<boolean>;
        private checkText();
    }
}
declare module "modeloftheself/ModelOfTheSelf" {
    import { Profile } from "metacore/Profile";
    import { Event } from "metacore/Event";
    import { CognitiveFunction } from "metacore/CognitiveFunction";
    export class ModelOfTheSelf {
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
}
