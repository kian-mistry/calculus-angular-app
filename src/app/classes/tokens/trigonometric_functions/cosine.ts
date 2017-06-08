import { TrigonometricFunction } from './trigonometricFunction';
import { IMathematicalFunction, MathsFn } from '../mathematicalFunctions';

export class Cosine extends TrigonometricFunction {

	/**
	 * Calculates the cosine of a number.
	 * @param x An expression that contains an angle measured in radians.
	 */
	private cos(x: number | IMathematicalFunction): number {
		let op: number;

		if(typeof x === 'number') {
			op = x;
		}
		else if(MathsFn.isMathematicalFunction(x)) {
			op = <number> x.evaluate();
		}

		if(op !== null) {
			if(op % ((1/2) * Math.PI) === 0) {
				return 0;
			}
			else {
				return Math.cos(op);
			}
		}
		else {
			return NaN;
		}
	}

	public evaluate(): number {
		if(typeof this.operand === 'number' || MathsFn.isMathematicalFunction(this.operand)) {
			return this.cos(this.operand);
		}
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if(typeof this.operand === 'string') {
			return "cos(" + this.operand + ")";
		}
	}
}