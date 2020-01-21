import { IParseResult } from "@parser/interface/IParseResult";
import { IMatchResult } from "@matches/interface/IMatchResult";

export interface IHillWarriorResult {
    
    source: IParseResult;
    age: number;
    won: number;
    drawn: number;
    lost: number;
    matches: IMatchResult[];
}