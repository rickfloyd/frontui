// src/qubit/parser/parser.ts
import { Token, TokenType } from '../lexer/token';
import { Expr, Binary, Grouping, Literal, Unary, Variable, Assign, Logical, Call } from './ast';
import { Stmt, Expression, Print, Var, Block, If, While, Function, Return } from './ast';

class ParseError extends Error { }

export class Parser {
    private readonly tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse(): Stmt[] {
        const statements: Stmt[] = [];
        while (!this.isAtEnd()) {
            statements.push(this.declaration());
        }
        return statements;
    }

    // ...existing code from your previous parser sample...
}
