import { Component } from '@angular/core';

import { CalculusRules, IRules } from '../../constants/calculus-rules';

@Component({
	selector: 'diff-rules',
	templateUrl: '../../templates/differentiation/differentiation-rules.template.html'
})
export class DifferentiationRulesComponent {
	public readonly diffRules: IRules[] = [
		{ name: 'Constants', rule: CalculusRules.diffConstants },
		{ name: 'Coefficients', rule: CalculusRules.diffCoefficients },
		{ name: 'The Power Rule', rule: CalculusRules.diffPowerRule },
		{ name: 'The Product Rule', rule: CalculusRules.diffProductRule },
		{ name: 'The Quotient Rule', rule: CalculusRules.diffQuotientRule },
		{ name: 'The Chain Rule', rule: CalculusRules.diffChainRule }
	];

	public readonly diffExpLogRules: IRules[] = [
		{ name: 'Exponential', rule: CalculusRules.diffExponentials },
		{ name: 'Logarithms', rule: CalculusRules.diffLogarithms }
	];

	public readonly diffTrigRules: IRules[] = [
		{ name: 'Sine', rule: CalculusRules.diffSin },
		{ name: 'Cosine', rule: CalculusRules.diffCos },
		{ name: 'Tangent', rule: CalculusRules.diffTan },
	];
}