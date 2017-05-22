import { Component } from '@angular/core';

import { CalculusRules, IRules } from '../../constants/calculus-rules';

@Component({
	selector: 'int-rules',
	templateUrl: '../../templates/integration/integration-rules.template.html'
})
export class IntegrationRulesComponent {
	public readonly intRules: IRules[] = [
		{ name: 'Constants', rule: CalculusRules.intConstants },
		{ name: 'Coeffecients', rule: CalculusRules.intCoefficients },
		{ name: 'The Power Rule', rule: CalculusRules.intPowerRule },
		{ name: 'Rational Function', rule: CalculusRules.intRatFunc }
	];

	public readonly intExpLogRules: IRules[] = [
		{ name: 'Exponential', rule: CalculusRules.intExponentials },
		{ name: 'Logarithms', rule: CalculusRules.intLogarithms }
	];

	public readonly intTrigRules: IRules[] = [
		{ name: 'Sine', rule: CalculusRules.intSin },
		{ name: 'Cosine', rule: CalculusRules.intCos },
		{ name: 'Tangent', rule: CalculusRules.intTan },
	];
}