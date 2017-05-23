import { Component } from "@angular/core";

import { CalculusRules } from '../../constants/calculus-rules';

@Component({
	selector: 'diff-dash',
	templateUrl: '../../templates/differentiation/differentiation-dash.template.html'
})
export class DifferentiationDashboardComponent {
	public variables: string[] = CalculusRules.variables;
	public selectedVariable: string = 'x';
}