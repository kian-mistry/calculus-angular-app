import { IMathematicalFunction } from '../mathematicalFunctions';

export abstract class ExponentialFunction implements IMathematicalFunction {

	constructor(protected operand: number | string | IMathematicalFunction) {}

	public abstract evaluate(): number;
	public abstract toString(): string;

	protected printError(): void {
		throw new Error(this.operand + " cannot be evaluated.");
	}
}