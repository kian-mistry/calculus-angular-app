import { Queue, Stack } from 'typescript-collections';

import { MathematicalConstant, MathematicalFunction, Operator } from './tokens';
import { IMathematicalFunction } from '../tokens/mathematicalFunctions';
import { Add } from '../tokens/operators/add';
import { Divide } from '../tokens/operators/divide';
import { Multiply } from '../tokens/operators/multiply';
import { Power } from '../tokens/operators/power';
import { Subtract } from '../tokens/operators/subtract';
import { Cosine } from '../tokens/trigonometric_functions/cosine';
import { Sine } from '../tokens/trigonometric_functions/sine';
import { Tangent } from '../tokens/trigonometric_functions/tangent';
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

	private tokensQueue: Queue<string>;
	private operandStack: Stack<number | IMathematicalFunction>;

	private postFix: string = "";

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
	 * Checks if string given is a number.
	 * @param str The string to test.
	 * @return True if the string is a number.
	 */
	private isNumber(str: string): boolean {
		return /^\d+$/.test(str);
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

	/**
	 * Converts an array into a queue.
	 * 
	 * @param arr The array to retrieve the data from.
	 * @return A queue that lists all the data from the array.
	 */
	private arrayToQueue<T>(arr: Array<T>): Queue<T> {
		if(arr.length > 0) {
			let queue = new Queue<T>();

			for(let i: number = 0; i < arr.length; i++) {
				queue.enqueue(arr[i]);
			}

			return queue;
		}

		return null;
	}

	/**
	 * Converts infix notation to postfix notation.
	 * @return The postfix notation for the expression.
	 */
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
						let currentOp: string = this.operatorStack.peek();
						if(currentOp === "(") {
							foundLeftParenthesis = true;

							//Remove ( from the stack but do not push to the output queue.
							this.operatorStack.pop();

							//Check if the previous item in the operator stack is a function.
							let currentFunc: string = this.operatorStack.peek();
							if(currentFunc === "fn") {
								//Remove fn from the stack and push to the output queue.
								this.operatorStack.pop();
								this.outputQueue.enqueue(this.functionStack.pop());
							}

							break;
						}
						else {
							this.outputQueue.enqueue(this.operatorStack.pop());
						}
					}

					if(!foundLeftParenthesis) {
						throw "Error: Parenthesis mismatched!";
					}
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

		this.postFix = result;
		return result;
	}

	public evaluate(): string | number {
		let result: string | number;
		let tokensArray: Array<string> = this.postFix.split(" ");
		this.tokensQueue = this.arrayToQueue<string>(tokensArray);

		if(this.tokensQueue != null) {
			this.operandStack = new Stack<number | IMathematicalFunction>();

			while(!this.tokensQueue.isEmpty()) {
				let currentToken: string = this.tokensQueue.dequeue();

				if(this.isNumber(currentToken)) {
					this.operandStack.push(parseInt(currentToken));
				}
				else if(currentToken in this.operatorSet) {
					let opTwo: number | IMathematicalFunction = this.operandStack.pop();
					let opOne: number | IMathematicalFunction = this.operandStack.pop();

					switch(currentToken) {
						case "+":
							this.operandStack.push(new Add(opOne, opTwo));
							break;
						case "-":
							this.operandStack.push(new Subtract(opOne, opTwo));
							break;
						case "*":
							this.operandStack.push(new Multiply(opOne, opTwo));
							break;
						case "/":
							this.operandStack.push(new Divide(opOne, opTwo));
							break;
						case "^":
							this.operandStack.push(new Power(opOne, opTwo));
							break;
						default:
							break;
					}
				}
				else if(currentToken in this.mathematicalFunctions) {
					let op: number | IMathematicalFunction = this.operandStack.pop();

					switch(currentToken) {
						case "sin":
							this.operandStack.push(new Sine(op));
							break;
						case "cos":
							this.operandStack.push(new Cosine(op));
							break;
						case "tan":
							this.operandStack.push(new Tangent(op));
							break;
						case "ln":
							break;
						default:
							break;
					}
				}
			}

			if(this.operandStack.size() === 1) {
				let token: IMathematicalFunction = <IMathematicalFunction> this.operandStack.pop();
				result = token.evaluate();
			}
		}

		return result;
	}
}