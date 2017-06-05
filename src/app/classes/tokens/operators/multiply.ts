import { Operator } from './operator';

export class Multiply extends Operator {

	public evaluate(): number {
		if(typeof this.operandOne === 'number' && typeof this.operandTwo === 'number') {
			return this.operandOne * this.operandTwo;
		}
		else if(this.operandOne instanceof Operator && typeof this.operandTwo === 'number') {
			return (<number> this.operandOne.evaluate()) * this.operandTwo;
		}
		else if(this.operandTwo instanceof Operator && typeof this.operandOne === 'number') {
			return this.operandOne * (<number> this.operandTwo.evaluate());
		} 
		else {
			this.printError();
			return null;
		}
	}

	public toString(): string {
		if(typeof this.operandOne === 'string' && typeof this.operandTwo === 'number') {
			return this.operandTwo + " + " + this.operandOne;
		}
		else if((typeof this.operandOne === 'number' && typeof this.operandTwo === 'string') ||
				(typeof this.operandOne === 'string' && typeof this.operandTwo === 'string')) {
			return this.operandOne + " + " + this.operandTwo;
		}
	}
}