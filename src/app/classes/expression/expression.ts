import { Queue, Stack } from 'typescript-collections';

import { MathematicalConstant, Operator } from './tokens';
import { CalculusRules } from '../../constants/calculus-rules';

export interface IOperator {
	token: Operator;
	precedence: number;
}

export class Expression {
	private readonly operatorSet: {} = {
		"^": { token: Operator.EXPONENT, precedence: 5 },
		"*": { token: Operator.MULTIPLY, precedence: 4 },
		"/": { token: Operator.DIVIDE, precedence: 4 },
		"+": { token: Operator.PLUS, precedence: 1 },
		"-": { token: Operator.MINUS, precedence: 1 }
	};

	private readonly mathematicalConstants: {} = {
		"e": { token: MathematicalConstant.E, value: Math.E },
		"pi": { token: MathematicalConstant.PI, value: Math.PI }
	}

	private readonly leftAssociativity: {} = {
		"*": 1, "/": 1, "+": 1, "-": 1
	}

	private readonly rightAssociativity: {} = {
		"^": 1
	}

	private outputQueue: Queue<string>;
	private operatorStack: Stack<string>;

	constructor(private expression: string, private variable: string) {
		this.outputQueue = new Queue<string>();
		this.operatorStack = new Stack<string>();
	}

	/**
	 * Checks if character given is a digit.
	 * 
	 * @param character The character to test.
	 * @return True if character is a digit.
	 */
	private isDigit(character: string): boolean {
		return /\d/.test(character);
	}

	/**
	 * Checks if character is a lowercase letter.
	 * 
	 * @param character Thr character to test.
	 * @return True if the character is a lowercase letter.
	 */
	private isLowercaseLetter(character: string): boolean {
		return (typeof character != 'undefined') ? /[a-z]/.test(character) : false;
	}

	private getPrecedence(value: string): number {
		if(value in this.operatorSet) {
			return this.operatorSet[value].precedence;
		}

		return null;
	}

	private hasHigherPrecedence(opOne: string, opTwo: string) {
		return this.getPrecedence(opOne) < this.getPrecedence(opTwo);
	}

	private hasHigherOrEqualPrecedence(opOne: string, opTwo: string) {
		return this.getPrecedence(opOne) <= this.getPrecedence(opTwo);
	}

	public shuntingYard(): string {
		let result: string = "";

		if(this.expression != null || this.expression != '') {
			for(let i: number = 0; i < this.expression.length; i++) {
				//Obtain current character.
				let currentChar: string = this.expression[i];

				//Skip whitespaces.
				if(currentChar === " ") {
					continue;
				}

				//Check if character(s) represents a number. If so add it to the output queue...
				if(this.isDigit(currentChar)) {
					let currentNumber: string = currentChar;
					let j: number = 0;
					
					while(j <= this.expression.length) {
						let nextChar: string = this.expression[i + j + 1];
						if(this.isDigit(nextChar)) {
							currentNumber = currentNumber + "" + nextChar;
							j++;
							continue;
						}
						else {
							break;
						}
					}

					this.outputQueue.enqueue(currentNumber);
					i += j;
				}
				//...else if character is a letter...
				else if(this.isLowercaseLetter(currentChar)) {
					//Check to see if the current character has other characters following it.
					let currentName: string = currentChar;
					let j: number = 0;

					while(j <= this.expression.length) {
						let nextChar: string = this.expression[i + j + 1];
						if(this.isLowercaseLetter(nextChar)) {
							currentName = currentName + "" + nextChar;
							j++;
							continue;
						}
						else {
							break;
						}
					}

					//Check whether current character is a varaible...
					if((currentChar === currentName) && (currentChar === this.variable)) {
						this.outputQueue.enqueue(currentChar);
					}
					//...or a mathematical constant...
					else if(currentName in this.mathematicalConstants) {
						this.outputQueue.enqueue(currentName);
					}
					else {
						throw "Error: " + currentName + " is not a valid varaible or mathematical constant.";
					}

					i += j;
				}
				//...else if character is an operator
				else if(currentChar in this.operatorSet) {
					let firstOp = currentChar;
					while(this.operatorStack.size() != 0) {
						let secondOp = this.operatorStack.peek();

						if(secondOp in this.operatorSet && (
							firstOp in this.leftAssociativity && (this.hasHigherOrEqualPrecedence(firstOp, secondOp)) || (
							firstOp in this.rightAssociativity && (this.hasHigherPrecedence(firstOp, secondOp))))
						) {
							this.outputQueue.enqueue(this.operatorStack.pop());
						}
						else {
							break;
						}
					}

					//Push the first operator onto the stack.
					this.operatorStack.push(firstOp);
				}
				else if(currentChar === "(") {
					this.operatorStack.push(currentChar);
				}
				else if(currentChar === ")") {
					let foundLeftParenthesis = false;

					while(this.operatorStack.size() != 0) {
						let currentOp = this.operatorStack.pop();
						if(currentOp === "(") {
							foundLeftParenthesis = true;
							break;
						}
						else {
							this.outputQueue.enqueue(currentOp);
						}
					}

					if(!foundLeftParenthesis) {
						throw "Error: Parenthesis mismatched!";
					}

					//Remove ( from the stack but do not push to the output queue.
					this.operatorStack.pop();
				}
				else {
					throw "Error: Unknown character - " + currentChar;
				}
			}

			while(this.operatorStack.size() != 0) {
				let currentOp = this.operatorStack.pop();
				if(currentOp === "(" || currentOp === ")") {
					throw "Error: Parenthesis mismatched!";
				}

				//Push operators to the queue.
				this.outputQueue.enqueue(currentOp);
			}

			while(!this.outputQueue.isEmpty()) {
				result = result + " " + this.outputQueue.dequeue();
			}
		}

		return result;
	}
}