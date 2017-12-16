﻿import { ISimulator } from "./interface/ISimulator";
import { IState } from "./interface/IState";
import { ILoader } from "./interface/ILoader";
import { IFetcher } from "./interface/IFetcher";
import { IDecoder } from "./interface/IDecoder";
import { IExecutive } from "./interface/IExecutive";
import { IEndCondition } from "./interface/IEndCondition";
import { IOptionValidator } from "./interface/IOptionValidator";
import { ICore } from "./interface/ICore";
import { IOptions } from "./interface/IOptions";
import { IParseResult } from "../parser/interface/IParseResult";
import Defaults from "./Defaults";
import * as clone from "clone";

export class Simulator implements ISimulator {

    private state: IState;

    private core: ICore;
    private loader: ILoader;
    private fetcher: IFetcher;
    private decoder: IDecoder;
    private executive: IExecutive;
    private endCondition: IEndCondition;
    private optionValidator: IOptionValidator;

    private pubSubProvider: any;

    constructor(
        core: ICore,
        loader: ILoader,
        fetcher: IFetcher,
        decoder: IDecoder,
        executive: IExecutive,
        endCondition: IEndCondition,
        optionValidator: IOptionValidator) {

        this.core = core;

        this.state = {
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null
        };

        this.loader = loader;
        this.fetcher = fetcher;
        this.decoder = decoder;
        this.executive = executive;
        this.endCondition = endCondition;
        this.optionValidator = optionValidator;
    }

    private publishInitialise(state: IState) {

        if (!this.pubSubProvider) {
            return;
        }

        this.pubSubProvider.publishSync('CORE_INITIALISE', {
            state: clone(state)
        });
    }

    public initialise(options: IOptions, warriors: IParseResult[]) {

        this.state = {
            cycle: 0,
            warriors: [],
            warriorIndex: 0,
            options: null
        };

        const defaultedOptions = Object.assign({}, Defaults, options);

        this.optionValidator.validate(defaultedOptions, warriors.length);

        this.state.options = defaultedOptions;

        this.core.initialise(options);

        this.state.warriors = this.loader.load(warriors, options);

        this.publishInitialise(this.state);
    }

    public setMessageProvider(provider: any) {
        this.pubSubProvider = provider;
        this.endCondition.setMessageProvider(provider);
        this.executive.setMessageProvider(provider);
    }

    public run(): Promise<IState> {

        return new Promise((resolve, reject) => {

            // TODO: progress updates based on core cycles
            while (this.step() === false) {
            }

            resolve(clone(this.state));
        });

    }

    private publishRoundStart(): void {
        if (!this.pubSubProvider) {
            return;
        }

        this.pubSubProvider.publishSync('ROUND_START', {});
    }

    public step(): boolean {

        if (this.endCondition.check(this.state)) {
            return true;
        }

        if (this.state.cycle === 0) {
            this.publishRoundStart();
        }

        var context = this.fetcher.fetch(this.state, this.core);

        context = this.decoder.decode(context);

        context.command.apply(this.executive, [context]);

        this.state.cycle += 1;

        return this.endCondition.check(this.state);
    }

    public getState(): IState {
        return clone(this.state);
    }
}