﻿import { IExpression } from "./interface/IExpression";
import { TokenCategory } from "./interface/IToken";
import * as _ from "underscore";
import { PassBase } from "./PassBase";

export class MathsProcessor extends PassBase {

    private expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    protected processLine() {

        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address

        var next = this.stream.peek();

        if (next.category === TokenCategory.Number ||
            next.category === TokenCategory.Maths) {

            try {
                var address = this.expression.parse(this.stream);

                this.context.emitSingle({
                    category: TokenCategory.Number,
                    lexeme: address.toString(),
                    position: _.clone(next.position)
                });
            } catch (err) {
                this.stream.readToEOL();
            }
        } else {
            this.context.emitSingle(this.stream.read());
        }
    }
}