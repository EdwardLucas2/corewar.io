"use strict";
/// <reference path="references.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const Parser_1 = require("../Parser");
const IMessage_1 = require("../interface/IMessage");
const IParseOptions_1 = require("../interface/IParseOptions");
const _ = require("underscore");
"use strict";
describe("Parser", () => {
    var context;
    var scanner;
    var filter;
    var forPass;
    var preprocessCollector;
    var preprocessAnalyser;
    var preprocessEmitter;
    var labelCollector;
    var labelEmitter;
    var mathsProcessor;
    var defaultPass;
    var orgPass;
    var syntaxCheck;
    var illegalCommandCheck;
    var parser;
    var calls;
    var expected94Calls = [
        "scan", "filter", "for", "equCollector",
        "equAnalyser", "equEmitter", "labelCollector", "labelEmitter",
        "maths", "org", "default", "syntax"
    ];
    beforeEach(() => {
        calls = [];
        context = new Context_1.Context();
        scanner = fakeScanner("scan");
        filter = fakePass("filter");
        forPass = fakePass("for");
        preprocessCollector = fakePass("equCollector");
        preprocessAnalyser = fakePass("equAnalyser");
        preprocessEmitter = fakePass("equEmitter");
        labelCollector = fakePass("labelCollector");
        labelEmitter = fakePass("labelEmitter");
        mathsProcessor = fakePass("maths");
        defaultPass = fakePass("default");
        orgPass = fakePass("org");
        syntaxCheck = fakePass("syntax");
        illegalCommandCheck = fakePass("illegal");
        parser = new Parser_1.Parser(scanner, filter, forPass, preprocessCollector, preprocessAnalyser, preprocessEmitter, labelCollector, labelEmitter, mathsProcessor, defaultPass, orgPass, syntaxCheck, illegalCommandCheck);
    });
    function fakeScanner(name) {
        return {
            scan: jasmine.createSpy("Scanner.scan")
                .and.callFake((s, options) => {
                calls.push(name);
                return context;
            })
        };
    }
    function fakePass(name) {
        return {
            process: jasmine.createSpy("Pass.process")
                .and.callFake((context, options) => {
                calls.push(name);
                return context;
            })
        };
    }
    function fakeError() {
        return {
            text: "",
            type: IMessage_1.MessageType.Error,
            position: { line: 1, char: 1 }
        };
    }
    function fakeWarning() {
        return {
            text: "",
            type: IMessage_1.MessageType.Warning,
            position: { line: 1, char: 1 }
        };
    }
    function errorIn(pass, name) {
        pass.process.and.callFake(() => {
            context.messages.push(fakeError());
            calls.push(name);
            return context;
        });
    }
    function warningIn(pass, name) {
        pass.process.and.callFake(() => {
            context.messages.push(fakeWarning());
            calls.push(name);
            return context;
        });
    }
    it("Calls passes in correct order under ICWS'94-draft", () => {
        var options = Parser_1.Parser.DefaultOptions;
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(12);
        expect(calls).toEqual(expected94Calls);
    });
    it("Calls passes in correct order under ICWS'88", () => {
        var options = _.defaults({ standard: IParseOptions_1.Standard.ICWS88 }, Parser_1.Parser.DefaultOptions);
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(12);
        expect(calls[0]).toBe("scan");
        expect(calls[1]).toBe("filter");
        expect(calls[2]).toBe("equCollector");
        expect(calls[3]).toBe("equAnalyser");
        expect(calls[4]).toBe("equEmitter");
        expect(calls[5]).toBe("labelCollector");
        expect(calls[6]).toBe("labelEmitter");
        expect(calls[7]).toBe("maths");
        expect(calls[8]).toBe("org");
        expect(calls[9]).toBe("default");
        expect(calls[10]).toBe("syntax");
        expect(calls[11]).toBe("illegal");
    });
    it("Calls passes in correct order under ICWS'86", () => {
        var options = _.defaults({ standard: IParseOptions_1.Standard.ICWS86 }, Parser_1.Parser.DefaultOptions);
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(12);
        expect(calls[0]).toBe("scan");
        expect(calls[1]).toBe("filter");
        expect(calls[2]).toBe("equCollector");
        expect(calls[3]).toBe("equAnalyser");
        expect(calls[4]).toBe("equEmitter");
        expect(calls[5]).toBe("labelCollector");
        expect(calls[6]).toBe("labelEmitter");
        expect(calls[7]).toBe("maths");
        expect(calls[8]).toBe("org");
        expect(calls[9]).toBe("default");
        expect(calls[10]).toBe("syntax");
        expect(calls[11]).toBe("illegal");
    });
    it("Does not call syntax check if default pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(defaultPass, "default");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(11);
        expect(calls).toEqual(expected94Calls.slice(0, 11));
    });
    it("Does not call default pass check if org pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(orgPass, "org");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(10);
        expect(calls).toEqual(expected94Calls.slice(0, 10));
    });
    it("Does not call org pass if maths pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(mathsProcessor, "maths");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(9);
        expect(calls).toEqual(expected94Calls.slice(0, 9));
    });
    it("Does not call maths pass if label emitter fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(labelEmitter, "labelEmitter");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(8);
        expect(calls).toEqual(expected94Calls.slice(0, 8));
    });
    it("Does not call label emitter if label collector fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(labelCollector, "labelCollector");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(7);
        expect(calls).toEqual(expected94Calls.slice(0, 7));
    });
    it("Does not call label collector if equ emitter fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(preprocessEmitter, "equEmitter");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(6);
        expect(calls).toEqual(expected94Calls.slice(0, 6));
    });
    it("Does not call equ emitter if equ analyser fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(preprocessAnalyser, "equAnalyser");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(5);
        expect(calls).toEqual(expected94Calls.slice(0, 5));
    });
    it("Does not call equ analyser if equ collector fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(preprocessCollector, "equCollector");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(4);
        expect(calls).toEqual(expected94Calls.slice(0, 4));
    });
    it("Does not call equ collector if for pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(forPass, "for");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(3);
        expect(calls).toEqual(expected94Calls.slice(0, 3));
    });
    it("Does not call for pass if filter pass fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        errorIn(filter, "filter");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(2);
        expect(calls).toEqual(expected94Calls.slice(0, 2));
    });
    it("Does not call filter pass if scan fails", () => {
        var options = Parser_1.Parser.DefaultOptions;
        scanner.scan.and.callFake(() => {
            context.messages.push(fakeError());
            calls.push("scan");
            return context;
        });
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(1);
        expect(calls).toEqual(expected94Calls.slice(0, 1));
    });
    it("Does call all passes regardless of raised warnings", () => {
        var options = Parser_1.Parser.DefaultOptions;
        scanner.scan.and.callFake(() => {
            context.messages.push(fakeWarning());
            calls.push("scan");
            return context;
        });
        warningIn(filter, "filter");
        warningIn(forPass, "for");
        warningIn(preprocessCollector, "equCollector");
        warningIn(preprocessAnalyser, "equAnalyser");
        warningIn(preprocessEmitter, "equEmitter");
        warningIn(labelCollector, "labelCollector");
        warningIn(labelEmitter, "labelEmitter");
        warningIn(mathsProcessor, "maths");
        warningIn(orgPass, "org");
        warningIn(defaultPass, "default");
        warningIn(syntaxCheck, "syntax");
        context.messages = [];
        calls = [];
        parser.parse("MOV 0, 1", options);
        expect(calls.length).toBe(12);
        expect(calls).toEqual(expected94Calls.slice(0, 12));
    });
    it("Passes supplied options to each pass", () => {
        var document = "MOV 0, 1";
        var options = {};
        parser.parse(document, options);
        expect(scanner.scan).toHaveBeenCalledWith(document, options);
        expect(filter.process).toHaveBeenCalledWith(context, options);
        expect(forPass.process).toHaveBeenCalledWith(context, options);
        expect(preprocessCollector.process).toHaveBeenCalledWith(context, options);
        expect(preprocessAnalyser.process).toHaveBeenCalledWith(context, options);
        expect(preprocessEmitter.process).toHaveBeenCalledWith(context, options);
        expect(labelCollector.process).toHaveBeenCalledWith(context, options);
        expect(labelEmitter.process).toHaveBeenCalledWith(context, options);
        expect(mathsProcessor.process).toHaveBeenCalledWith(context, options);
        expect(orgPass.process).toHaveBeenCalledWith(context, options);
        expect(defaultPass.process).toHaveBeenCalledWith(context, options);
        expect(syntaxCheck.process).toHaveBeenCalledWith(context, options);
    });
    it("Returns context tokens, messages and metaData in ParserResult", () => {
        var actual = parser.parse("MOV 0, 1", {});
        expect(actual.metaData).toBe(context.metaData);
        expect(actual.tokens).toBe(context.tokens);
        expect(actual.messages).toBe(context.messages);
    });
    it("Defaults the standard to ICWS'94-draft if not specified", () => {
        parser.parse("MOV 0, 1");
        expect(scanner.scan.calls.mostRecent().args[1].standard).toBe(IParseOptions_1.Standard.ICWS94draft);
    });
});
