import { TrigonometricFunction } from './trigonometricFunction';
import { IMathematicalFunction, MathsFn } from '../mathematicalFunctions';

export class Sine extends TrigonometricFunction {
	
	/**
	 * Calculates the sine of a number.
	 * @param x An expression that contains an angle measured in radians.
	 */
	private sin(x: number | IMathematicalFunction): number {
		let op: number;

		if(typeof x === 'number') {
			op = x;
		}
		else if(MathsFn.isMathematicalFunction(x)) {
			op = <number> x.evaluate();
		}

		if(op !== null) {
			if(op % Math.PI === 0) {
				return 0;
			}
			else {
				return Math.sin(op);
			}
		}
		else {
			return NaN;
		}
	}

	public evaluate(): number {
		if(typeof this.operand === 'number' || MathsFn.isMathematicalFunction(this.operand)) {
			return this.sin(this.operand);
		}
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if(typeof this.operand === 'string') {
			return "sin(" + this.operand + ")";
		}
	}
}