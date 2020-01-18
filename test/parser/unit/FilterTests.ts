﻿import { expect } from "chai";

import { IToken, TokenCategory } from "@parser/interface/IToken";
import { Context } from "@parser/Context";
import { Parser } from "@parser/Parser";
import { Filter } from "@parser/Filter";
import { TestHelper } from "@parser/tests/unit/TestHelper";

"use strict";

describe("Filter", () => {

    it("Does not modify tokens if no empty lines, comments or END found", () => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ","
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: "label123"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "7"
            }, {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: "MOV"
            }, {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: "."
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: TokenCategory.Preprocessor,
                position: { line: 1, char: 1 },
                lexeme: "FOR"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new Filter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(11);
        expect(actual.messages.length).to.be.equal(0);

        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i]);
        }
    });

    it("Removes empty lines from the output", () => {

        var line1 = TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");
        var line2 = TestHelper.emptyLine(2);
        var line3 = TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");

        var expected = line1.concat(line3);

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new Filter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(expected.length);
        expect(actual.messages.length).to.be.equal(0);

        for (var i = 0; i < expected.length; i++) {

            expect(actual.tokens[i]).to.deep.equal(expected[i]);
        }
    });

    it("Removes comments from the output", () => {

        var line1 = TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "; this is a comment");
        var line2 = TestHelper.comment(2, "; comment on a line by itself");
        var line3 = TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");

        var expected = line1.concat(line3);
        expected.splice(4, 1); // Expect everything but the comments

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new Filter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(expected.length);
        expect(actual.messages.length).to.be.equal(0);

        for (var i = 0; i < expected.length; i++) {

            expect(actual.tokens[i]).to.deep.equal(expected[i]);
        }
    });

    it("Removes everything after the END statement from the output", () => {

        var line1 = TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");
        var line2 = TestHelper.endStatement(2, "alabel");
        var line3 = TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");

        var expected = line1.concat(line2);

        var context = new Context();
        context.tokens = line1.concat(line2).concat(line3);

        var pass = new Filter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(expected.length);
        expect(actual.messages.length).to.be.equal(0);

        for (var i = 0; i < expected.length; i++) {

            expect(actual.tokens[i]).to.deep.equal(expected[i]);
        }
    });
});