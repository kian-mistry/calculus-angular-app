import { Operator } from './operator';

export class Power extends Operator {

	public evaluate(): number {
		if(typeof this.operandOne === 'number' && typeof this.operandTwo === 'number') {
			return Math.pow(this.operandOne, this.operandTwo);
		}
		else if(this.operandOne instanceof Operator && typeof this.operandTwo === 'number') {
			return Math.pow((<number> this.operandOne.evaluate()), this.operandTwo);
		}
		else if(this.operandTwo instanceof Operator && typeof this.operandOne === 'number') {
			return Math.pow(this.operandOne, (<number> this.operandTwo.evaluate()));
		}
		else if(this.operandOne instanceof Operator && this.operandTwo instanceof Operator) {
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