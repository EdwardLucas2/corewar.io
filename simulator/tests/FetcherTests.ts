﻿import { expect } from "chai";
import * as sinon from "sinon";

import { IState } from "../interface/IState";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import Defaults from "../Defaults";
import { IOptions } from "../interface/IOptions";
import { ITask } from "../interface/ITask";
import { Fetcher } from "../Fetcher";
import DataHelper from "./DataHelper";

describe("Fetcher",() => {

    var imp = DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Direct, 0, ModeType.Direct, 1);
    var dat = DataHelper.buildInstruction(0, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Direct, 0);

    var state: IState;
    var core: ICore;

    beforeEach(() => {

        var options = Object.assign({}, Defaults);
        options.coresize = 5;

        core = {
            getSize: () => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub(),
            wrap(address: number) {
                return address;
            },
            initialise: (options: IOptions) => {
                //
            }
        };

        state = {
            cycle: 0,
            options: options,
            warriorIndex: 0,
            warriors: []
        };
    });

    it("fetches the next warrior's, next task's, next instruction",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 1;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            expectedTask,
            DataHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 1;

        expectedTask.instructionPointer = 3;

        var expectedInstruction = imp;
        var unexpectedInstruction = dat;
        core.executeAt = (task: ITask, address: number) => {
            if (address === 3) {
                return expectedInstruction;
            } else {
                return unexpectedInstruction;
            }
        };

        var fetcher = new Fetcher();
        var context = fetcher.fetch(state, core);

        expect(context.warrior).to.be.equal(expectedWarrior);
        expect(context.task).to.be.equal(expectedTask);
        expect(context.instruction).to.be.equal(expectedInstruction);

        expect(context.warriorIndex).to.be.equal(1);
        expect(context.taskIndex).to.be.equal(1);
        expect(context.instructionPointer).to.be.equal(3);
    });

    it("advances the correct warrior index, task index and instruction pointer",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            expectedWarrior,
            DataHelper.buildWarrior()
        ];
        state.warriorIndex = 1;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            expectedTask,
            DataHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 1;

        expectedTask.instructionPointer = 3;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state, core);

        expect(state.warriorIndex).to.be.equal(2);
        expect(expectedWarrior.taskIndex).to.be.equal(2);
        expect(expectedTask.instructionPointer).to.be.equal(4);
    });

    it("wraps the warrior index, task index and instruction pointer",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            DataHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 2;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            DataHelper.buildTask(),
            expectedTask
        ];
        expectedWarrior.taskIndex = 2;

        expectedTask.instructionPointer = 4;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state, core);

        expect(state.warriorIndex).to.be.equal(0);
        expect(expectedWarrior.taskIndex).to.be.equal(0);
        expect(expectedTask.instructionPointer).to.be.equal(0);
    });

    it("executes in the context of the next warrior if the current warrior has no tasks", () => {

        var validWarrior = DataHelper.buildWarrior();
        validWarrior.tasks = [
            DataHelper.buildTask()
        ]

        var deadWarrior = DataHelper.buildWarrior();
        deadWarrior.tasks = [];

        state.warriors = [
            validWarrior,
            deadWarrior
        ];

        state.warriorIndex = 1;

        var fetcher = new Fetcher();
        var executionContext = fetcher.fetch(state, core);

        expect(executionContext.warriorIndex).to.be.equal(0);
        expect(executionContext.warrior).to.be.equal(validWarrior);
    })

});