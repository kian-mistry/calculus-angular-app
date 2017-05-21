import { MathJaxConstants } from './mathjax';

export interface IRules {
	name: string;
	rule: string;
}

export class CalculusRules {
	/********** List of Variables */
	static readonly variables: string[] = ['a', 'b', 'c', 'g', 'h', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

	/********** Differentiation */
	static readonly diffConstants = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "C = 0" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffPowerRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "x^n = n \\cdot x^{n-1}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffProductRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "(f(x) \\cdot g(x)) = f(x) \\cdot g'(x) + f'(x) \\cdot g(x)" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffQuotientRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\frac{f(x)}{g(x)} = \\frac{f'(x) \\cdot g(x) - f(x) \\cdot g'(x)}{g^2(x)}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffChainRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "f(g(x)) = f'(g(x)) \\cdot g'(x)" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly diffExponentials: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "e^x = e^x" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffLogarithms: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\ln{x} = \\frac{1}{x}" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly diffSin: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\sin{x} = \\cos{x}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffCos: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\cos{x} = -\\sin{x}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffTan: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\tan{x} = \\sec^2{x}" + MathJaxConstants.DOUBLE_DOLLARS;

	// private diffTan: string = this.DOUBLE_DOLLARS + "\\begin{align}" + 
	// 							this.DERIVATIVE + "\\tan{x} & = \\frac{\\sin{x}}{\\cos{x}} \\newline " +
	// 							"& = \\frac{\\cos{x} \\cdot \\cos{x} - \\sin{x} \\cdot -\\sin{x}}{\\cos^2{x}} \\newline " +
	// 							"& = \\frac{1}{\\cos^2{x}} \\newline" +
	// 							"& = \\sec^2{x}" +
	// 							"\\end{align}" + this.DOUBLE_DOLLARS;
}