import { Component } from "@angular/core";

import { CalculusRules } from '../../constants/calculus-rules';

@Component({
	selector: 'int-dash',
	templateUrl: '../../templates/integration/integration-dash.template.html'
})
export class IntegrationDashboardComponent {
	public variables: string[] = CalculusRules.variables;
	public selectedVariable: string = 'x';
}