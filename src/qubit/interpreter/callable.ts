// src/qubit/interpreter/callable.ts
import { Interpreter, QubitValue } from './interpreter';

export interface QubitCallable {
    arity(): number;
    call(interpreter: Interpreter, args: QubitValue[]): QubitValue;
}
