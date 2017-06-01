import { Queue, Stack } from 'typescript-collections';

import { MathematicalConstant, MathematicalFunction, Operator } from './tokens';
import { CalculusRules } from '../../constants/calculus-rules';

export interface IOperator {
	token: Operator;
	precedence: number;
}

export class Expression {
	private readonly operatorSet: {} = {
		"fn": { token: Operator.FUNCTION, precedence: 6 },
		"^": { token: Operator.EXPONENT, precedence: 5 },
		"*": { token: Operator.MULTIPLY, precedence: 4 },
		"/": { token: Operator.DIVIDE, precedence: 4 },
		"+": { token: Operator.PLUS, precedence: 1 },
		"-": { token: Operator.MINUS, precedence: 1 }
	};

	private readonly mathematicalConstants: {} = {
		"e": { token: MathematicalConstant.E, value: Math.E },
		"pi": { token: MathematicalConstant.PI, value: Math.PI }
	};

	private readonly mathematicalFunctions: {} = {
		"sin": { token: MathematicalFunction.SIN, fn: Math.sin },
		"cos": { token: MathematicalFunction.COS, fn: Math.cos },
		"tan": { token: MathematicalFunction.TAN, fn: Math.tan },
		"ln": { token: MathematicalFunction.LN, fn: Math.log }
	};

	private readonly leftAssociativity: {} = {
		"fn": 1, "*": 1, "/": 1, "+": 1, "-": 1
	};

	private readonly rightAssociativity: {} = {
		"^": 1
	};

	private outputQueue: Queue<string>;
	private operatorStack: Stack<string>;
	private functionStack: Stack<string>;

	constructor(private expression: string, private variable: string) {
		this.outputQueue = new Queue<string>();
		this.operatorStack = new Stack<string>();
		this.functionStack = new Stack<string>();
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
			/********** CONVERTING */
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

					i += j;

					//Check whether current character is a varaible...
					if((currentChar === currentName) && (currentChar === this.variable)) {
						this.outputQueue.enqueue(currentChar);
					}
					//...or a mathematical constant...
					else if(currentName in this.mathematicalConstants) {
						this.outputQueue.enqueue(currentName);
					}
					//...or a mathematical function...
					else if(currentName in this.mathematicalFunctions) {
						//Check if the following character is an open parenthesis.
						let nextChar: string = this.expression[++i];
						if(nextChar === "(") {
							this.operatorStack.push("fn");
							this.operatorStack.push(nextChar);
							this.functionStack.push(currentName);
						}
						else {
							throw "Error: Missing parenthesis."; 
						}
					}
					//... otherwise throw an error.
					else {
						throw "Error: " + currentName + " is not a valid varaible or mathematical constant.";
					}
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
					let foundLeftParenthesis: boolean = false;

					while(this.operatorStack.size() != 0) {
						let currentOp: string = this.operatorStack.pop();
						if(currentOp === "(") {
							foundLeftParenthesis = true;

							//Check if the previous item in the operator stack is a function.
							let currentFunc: string = this.operatorStack.peek();
							if(currentFunc === "fn") {
								//Remove fn from the stack and push to the output queue.
								this.outputQueue.enqueue(this.functionStack.pop());
							}

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

			/********** UNROLLING */
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