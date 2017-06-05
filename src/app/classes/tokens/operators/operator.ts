import { IMathematicalFunction } from '../mathematicalFunctions';

export abstract class Operator implements IMathematicalFunction {

	constructor(protected operandOne: number | string | IMathematicalFunction, protected operandTwo: number | string | IMathematicalFunction){}

	public abstract evaluate(): number;
	public abstract toString(): string;

	protected printError(): void {
		throw new Error(this.operandOne + " and " + this.operandTwo + " cannot be evaluated.");
	}
}