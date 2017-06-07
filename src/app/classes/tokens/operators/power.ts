import { Operator } from './operator';
import { MathsFn } from '../mathematicalFunctions';

export class Power extends Operator {

	public evaluate(): number {
		if(typeof this.operandOne === 'number' && typeof this.operandTwo === 'number') {
			return Math.pow(this.operandOne, this.operandTwo);
		}
		else if(MathsFn.isMathematicalFunction(this.operandOne) && typeof this.operandTwo === 'number') {
			return Math.pow((<number> this.operandOne.evaluate()), this.operandTwo);
		}
		else if(typeof this.operandOne === 'number' && MathsFn.isMathematicalFunction(this.operandTwo)) {
			return Math.pow(this.operandOne, (<number> this.operandTwo.evaluate()));
		}
		else if(MathsFn.isMathematicalFunction(this.operandOne) && MathsFn.isMathematicalFunction(this.operandTwo)) {
			return Math.pow((<number> this.operandOne.evaluate()), (<number> this.operandTwo.evaluate()));
		}
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if((typeof this.operandOne === 'string' && typeof this.operandTwo === 'number') ||
				(typeof this.operandOne === 'number' && typeof this.operandTwo === 'string') ||
				(typeof this.operandOne === 'string' && typeof this.operandTwo === 'string')) {
			return this.operandOne + " ^ " + this.operandTwo;
		}
	}
}