﻿import { ILoader } from "./Interface/ILoader";
import { IRandom } from "./Interface/IRandom";
import { ICore } from "./Interface/ICore";
import { IWarriorLoader } from "./Interface/IWarriorLoader";
import { IParseResult } from "../Parser/Interface/IParseResult";
import { IWarrior } from "./Interface/IWarrior";
import { IOptions } from "./Interface/IOptions";

export class Loader implements ILoader {

    private random: IRandom;
    private warriorLoader: IWarriorLoader;
    private core: ICore;

    constructor(random: IRandom, core: ICore, warriorLoader: IWarriorLoader) {

        this.random = random;
        this.warriorLoader = warriorLoader;
        this.core = core;
    }

    public load(warriors: IParseResult[], options: IOptions): IWarrior[] {

        var result: IWarrior[] = [];

        _(warriors).forEach((w: IParseResult) => {

            var address = this.getValidAddress(result, options);

            result.push(this.warriorLoader.load(address, w));
        });

        return result;
    }

    private getValidAddress(warriors: IWarrior[], options: IOptions): number {

        while (true) {

            var address = this.random.get(options.coresize);

            if (this.isValidAddress(address, warriors, options)) {
                return address;
            }
        }
    }

    private isValidAddress(address: number, warriors: IWarrior[], options: IOptions): boolean {

        var valid = true;
        var core = this.core;

        var instructionLimitLess1 = options.instructionLimit - 1;
        var minSeparationLess1 = options.minSeparation - 1;

        _(warriors).forEach((w: IWarrior) => {

            var s0 = address;
            var f0 = address + instructionLimitLess1;

            var s1 = w.startAddress - minSeparationLess1;
            var f1 = w.startAddress + minSeparationLess1 + instructionLimitLess1;

            s0 = core.wrap(s0);
            f0 = core.wrap(f0);
            s1 = core.wrap(s1);
            f1 = core.wrap(f1);

            if (s0 <= f0) {
                
                if (s1 <= f1) {

                    if (s0 <= f1 && s1 <= f0) {
                        valid = false;
                        return;
                    }

                } else if (s0 <= f1 || s1 <= f0) {
                    valid = false;
                    return;
                }

            } else if (s0 <= f1 || s1 <= f0) {
                valid = false;
                return;
            }
        });

        return valid;
    }
} 