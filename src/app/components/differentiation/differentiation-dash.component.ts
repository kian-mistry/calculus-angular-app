import { Component } from "@angular/core";

import { Expression } from '../../classes/expression/expression';
import { CalculusRules } from '../../constants/calculus-rules';

@Component({
	selector: 'diff-dash',
	templateUrl: '../../templates/differentiation/differentiation-dash.template.html'
})
export class DifferentiationDashboardComponent {
	public variables: string[] = CalculusRules.variables;
	public selectedVariable: string = 'x';

	//Initialise graph with options.
	public graphOptions: {} = {
		responsive: true,
		maintainAspectRatio: false,
		tooltips: {
			intersect: false,
			mode: "x"
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		},
		select: {
			enabled: true
		}
	};

	public graphDatasets = [
    	{
			label: "f(x)",
			fill: false,
      		data: []
    	}
	];
	
	public graphLabels = [];

	/**
	 * Evaluates given expression with respect to x and plots on the graph.
	 * @param exprString The expression to be plotted on the graph.
	 */
	public evaluate(exprString: string): void {
		let MAX_X_AXIS: number = 5;
		let DX: number = 0.1;

		this.graphDatasets[0].data = new Array();
		this.graphLabels = new Array();

		let expr = new Expression(exprString, this.selectedVariable);
		expr.shuntingYard();

		let i: number = -5;
		while(i <= MAX_X_AXIS) {
			let ans = expr.evaluate(i);

			this.graphDatasets[0].data.push((<number> ans).toFixed(3));
			this.graphLabels.push(i + "");

			i += DX;
			i = parseFloat(i.toFixed(1));
		}
	}
}