import { TrigonometricFunction } from './trigonometricFunction';
import { MathsFn } from '../mathematicalFunctions';

export class Cosine extends TrigonometricFunction {

	public evaluate(): number {
		if(typeof this.operand === 'number') {
			return Math.cos(this.operand);
		}
		else if(MathsFn.isMathematicalFunction(this.operand)) {
			return Math.cos(<number> this.operand.evaluate());
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