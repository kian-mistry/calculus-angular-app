import { TrigonometricFunction } from './trigonometricFunction';
import { MathsFn } from '../mathematicalFunctions';

export class Tangent extends TrigonometricFunction {

	public evaluate(): number {
		if(typeof this.operand === 'number') {
			return Math.tan(this.operand);
		}
		else if(MathsFn.isMathematicalFunction(this.operand)) {
			return Math.tan(<number> this.operand.evaluate());
		}
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if(typeof this.operand === 'string') {
			return "tan(" + this.operand + ")";
		}
	}
}