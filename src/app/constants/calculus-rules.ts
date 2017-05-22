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
	static readonly diffCoefficients = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "a \\cdot f(x) = a \\cdot f'(x)" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffPowerRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "x^n = n \\cdot x^{n-1}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffProductRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "(f(x) \\cdot g(x)) = f(x) \\cdot g'(x) + f'(x) \\cdot g(x)" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffQuotientRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\frac{f(x)}{g(x)} = \\frac{f'(x) \\cdot g(x) - f(x) \\cdot g'(x)}{g^2(x)}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffChainRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "f(g(x)) = f'(g(x)) \\cdot g'(x)" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly diffExponentials: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "e^x = e^x" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffLogarithms: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\ln{x} = \\frac{1}{x}" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly diffSin: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\sin{x} = \\cos{x}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffCos: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\cos{x} = -\\sin{x}" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly diffTan: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.DERIVATIVE + "\\tan{x} = \\sec^2{x}" + MathJaxConstants.DOUBLE_DOLLARS;

	/********** Integration */
	static readonly intConstants: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{a \\cdot dx} = ax + C" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intCoefficients: string = MathJaxConstants.DOUBLE_DOLLARS +	MathJaxConstants.INTEGRAL + "{a \\cdot f(x) \\cdot dx} = a \\cdot F(x) + C" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intPowerRule: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{x^n \\cdot dx} = \\frac{x^{n + 1}}{n + 1} + C, \\ \\ \\ (n \\neq -1)" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intRatFunc: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{\\frac{f'(x)}{f(x)} \\cdot dx} = \\ln{|f(x)|} + C" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly intExponentials: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{e^{ax} \\cdot dx} = \\frac{e^{ax}}{a} + C" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intLogarithms: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{\\ln{x} \\cdot dx} = x(\\ln{|x|} - 1) + C" + MathJaxConstants.DOUBLE_DOLLARS;

	static readonly intSin: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{\\sin{ax} \\cdot dx} = -\\frac{\\cos{ax}}{a} + C" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intCos: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{\\cos{ax} \\cdot dx} = \\frac{\\sin{ax}}{a} + C" + MathJaxConstants.DOUBLE_DOLLARS;
	static readonly intTan: string = MathJaxConstants.DOUBLE_DOLLARS + MathJaxConstants.INTEGRAL + "{\\tan{ax} \\cdot dx} = \\frac{\\ln{|\\cos{ax}|}}{a} + C" + MathJaxConstants.DOUBLE_DOLLARS; 
}