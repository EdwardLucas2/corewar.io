﻿import { IWarrior } from "./interface/IWarrior";
import { IInstruction } from "./interface/IInstruction";
import { ITask } from "./interface/ITask";

export class Warrior implements IWarrior {

    public name: string;
    public author: string;
    public strategy: string;

    public instructions: IInstruction[];

    public taskIndex: number;
    public tasks: ITask[];

    public startAddress: number;

    constructor() {
        this.name = "";
        this.author = "";
        this.strategy = "";
        this.instructions = [];
        this.taskIndex = 0;
        this.tasks = [];
        this.startAddress = 0;
    }
}