import { TrigonometricFunction } from './trigonometricFunction';
import { MathsFn } from '../mathematicalFunctions';

export class Sine extends TrigonometricFunction {

	public evaluate(): number {
		if(typeof this.operand === 'number') {
			return Math.sin(this.operand);
		}
		else if(MathsFn.isMathematicalFunction(this.operand)) {
			return Math.sin(<number> this.operand.evaluate());
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