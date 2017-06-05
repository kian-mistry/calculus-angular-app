import { Operator } from './operator';

export class Divide extends Operator {

	private divByZeroCheck(opOne: number, opTwo: number): number {
		if(this.operandTwo == 0) {
			throw new Error("Error: Division by 0.");
		}
		else {
			return opOne / opTwo;
		}
	}

	public evaluate(): number {
		if(typeof this.operandOne === 'number' && typeof this.operandTwo === 'number') {
			return this.divByZeroCheck(this.operandOne, this.operandTwo);
		}
		else if(this.operandOne instanceof Operator && typeof this.operandTwo === 'number') {
			let opOne: number = <number> this.operandOne.evaluate();

			return this.divByZeroCheck(opOne, this.operandTwo);
		}
		else if(this.operandTwo instanceof Operator && typeof this.operandOne === 'number') {
			let opTwo: number = <number> this.operandTwo.evaluate();

			return this.divByZeroCheck(this.operandOne, opTwo);
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
			return this.operandOne + " / " + this.operandTwo;
		}
	}
}