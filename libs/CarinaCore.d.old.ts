declare module carina.metacore {
    abstract class RootElement {
        private _name;
        private _output;
        constructor();
        name: string;
        output: string;
    }
}
declare module carina.metacore {
    abstract class Element extends RootElement {
    }
}
declare module carina.metacore {
    class Event extends Element {
        constructor(name: string);
    }
}
declare module carina.metacore {
    abstract class CognitiveFunction extends Element {
        abstract processInformation(value: any): Promise<any>;
    }
}
declare module carina.metacore {
    abstract class EstructureElement extends RootElement {
    }
}
declare module carina.metacore {
    class Field extends RootElement {
        private _value;
        constructor(name: string, value: any);
        value: any;
    }
}
declare module carina.metacore {
    abstract class Profile extends RootElement {
    }
}
declare module carina.metacore {
    class ReasoningTaskProfile extends Profile {
        private _fields;
        ReasoningTaskProfile(fields: Field[]): void;
        setField(name: string, value: any): void;
    }
}
declare module carina.metacore {
    class State extends Element {
        private _value;
        constructor(name: string, value: boolean);
        value: boolean;
    }
}
declare module carina.metacore {
    abstract class FuntionalElement extends RootElement {
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
declare module carina.metacore {
    class Goal extends Element {
        private _sourceState;
        private _targetState;
        sourceState: State;
        targetState: State;
    }
}
declare module carina.metacore {
    abstract class Task extends FuntionalElement {
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
declare module carina.metacore {
    abstract class Action extends Task {
    }
}
declare module carina.metacore {
    abstract class Strategy extends FuntionalElement {
        abstract run(): any;
    }
}
declare module carina.metacore {
    abstract class ComputationalStrategy extends Strategy {
    }
}
declare module carina.metacore {
    class Plan extends Element {
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
declare module carina.memory {
    class BasicMemoryUnity {
        cue: string;
        information: any;
        constructor(cue: string, information: any);
    }
}
declare module carina.memory {
    abstract class MemoryDriver {
        private _config;
        constructor(config: any);
        abstract init(): Promise<boolean>;
        abstract storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        abstract retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        abstract forgetInformation(cue: string): Promise<boolean>;
        config: any;
    }
}
declare module carina.memory {
    abstract class Memory {
        private _driver;
        constructor(driver: MemoryDriver);
        storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        forgetInformation(cue: string): void;
        driver: MemoryDriver;
    }
}
declare module carina.memory {
    class LongTermMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: LongTermMemory;
    }
}
declare module carina.memory {
    class SensorMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: SensorMemory;
    }
}
declare module carina.metacore {
    import SensorMemory = carina.memory.SensorMemory;
    abstract class Sensor extends RootElement {
        private _type;
        private _sensorMemory;
        constructor();
        perceiveInformation(value: any): any;
        type: string;
        readonly sensorMemory: SensorMemory;
    }
}
declare module carina.objectlevel {
    import Goal = carina.metacore.Goal;
    class ModelOfTheWorld {
        private _mission;
        private _isCreated;
        mission: Goal;
        getStateIsCreated(): Promise<boolean>;
        stateIsCreated: boolean;
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    import Plan = carina.metacore.Plan;
    import Goal = carina.metacore.Goal;
    class BasicCognitiveProcessingUnit extends RootElement {
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
declare module carina.memory {
    import cmc = carina.metacore;
    import col = carina.objectlevel;
    class WorkingMemory extends Memory {
        private static _instance;
        private _bcpu;
        private _model_of_the_world;
        private _profiles;
        private _mental_state;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        bcpu: col.BasicCognitiveProcessingUnit;
        modelOfTheWorld: col.ModelOfTheWorld;
        getProfile(id: number): cmc.Profile;
        readonly profiles: cmc.Profile[];
        setProfiles(profile: cmc.Profile, s?: boolean): void;
        mentalStates: cmc.State[];
        getMentalState(state: string): cmc.State;
        updateMentalState(name: string, value: boolean): Promise<boolean>;
        setMentalState(ms: cmc.State, s?: boolean): Promise<boolean>;
        static readonly instance: WorkingMemory;
        private getMentalStatePos(name);
        syncBCPU(value: col.BasicCognitiveProcessingUnit): void;
        syncModelOfTheWorld(value: col.ModelOfTheWorld): void;
    }
}
declare module carina.memory {
    class MemoryDriverIndexDB extends MemoryDriver {
        private _dataBase;
        constructor(config: any);
        init(): Promise<boolean>;
        storeInformation(information: BasicMemoryUnity): Promise<boolean>;
        retrieveInformation(cue: string): Promise<BasicMemoryUnity>;
        forgetInformation(cue: string): Promise<boolean>;
    }
}
declare module carina.memory {
    class PerceptualMemory extends Memory {
        private static _instance;
        private constructor(driver);
        static init(driver: MemoryDriver): void;
        static readonly instance: PerceptualMemory;
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    class AgentSettings extends RootElement {
        static db_settings: string[];
        static config: JSON;
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    class Actuator extends RootElement {
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    class Pattern extends RootElement {
        private _pattern;
        constructor(pattern?: any);
        pattern: any;
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    class Category extends RootElement {
        private _category;
        constructor(category?: any);
        category: any;
    }
}
declare module carina.objectlevel {
    import RootElement = carina.metacore.RootElement;
    class Input extends RootElement {
        private _information;
        private _type;
        constructor(information?: any, type?: string);
        information: any;
        type: string;
    }
}
declare module carina.objectlevel {
    import CognitiveFunction = carina.metacore.CognitiveFunction;
    class Planning extends CognitiveFunction {
        processInformation(value: any): any;
        private processInformationComputationalStrategy(value);
        executePlans(): any;
    }
}
declare module carina.objectlevel {
    import CognitiveFunction = carina.metacore.CognitiveFunction;
    import ComputationalStrategy = carina.metacore.ComputationalStrategy;
    class Categorization extends CognitiveFunction {
        processInformation(value: any): any;
        processInformationComputationalStrategy(value: new (categories: Category[]) => ComputationalStrategy): Promise<any[]>;
        getCategories(): Promise<Category[]>;
    }
}
declare module carina.objectlevel {
    import Task = carina.metacore.Task;
    abstract class CognitiveTask extends Task {
    }
}
declare module carina.objectlevel {
    import Event = carina.metacore.Event;
    class MemoryEvent extends Event {
    }
}
declare module carina.objectlevel {
    import Sensor = carina.metacore.Sensor;
    class MouseSensor extends Sensor {
        constructor();
    }
}
declare module carina.objectlevel {
    import CognitiveFunction = carina.metacore.CognitiveFunction;
    class Perception extends CognitiveFunction {
        private _perception;
        processInformation(value: any[]): any;
        private processInformationObject(value);
        perception: BasicCognitiveProcessingUnit;
    }
}
declare module carina.objectlevel {
    import Event = carina.metacore.Event;
    import Profile = carina.metacore.Profile;
    class ReasoningEvent extends Event {
        private _profile;
        profile: Profile;
    }
}
declare module carina.objectlevel {
    import Strategy = carina.metacore.Strategy;
    class ReasoningTask extends CognitiveTask {
        private _strategys;
        buildProfile(): void;
        run(): any;
        strategys: Strategy[];
        addStrategy(strategy: Strategy): void;
        getStrategy(pos: number): Strategy;
    }
}
declare module carina.objectlevel {
    import CognitiveFunction = carina.metacore.CognitiveFunction;
    class Recognition extends CognitiveFunction {
        processInformation(value: any): Promise<any>;
        processInformationComputationalStrategy(value: any): Promise<boolean>;
        private checkText();
    }
}
declare namespace carina.modeloftheself {
    import Profile = carina.metacore.Profile;
    import Event = carina.metacore.Event;
    import CognitiveFunction = carina.metacore.CognitiveFunction;
    class ModelOfTheSelf {
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
