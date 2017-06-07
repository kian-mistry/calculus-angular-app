import { ExponentialFunction } from './exponentialFunction';
import { MathsFn } from '../mathematicalFunctions';

export class NaturalLog extends ExponentialFunction {

	public evaluate(): number {
		if(typeof this.operand === 'number') {
			return Math.log(this.operand);
		}
		else if(MathsFn.isMathematicalFunction(this.operand)) {
			return Math.log(<number> this.operand.evaluate());
		}
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if(typeof this.operand === 'string') {
			return "ln(" + this.operand + ")";
		}
	}
}