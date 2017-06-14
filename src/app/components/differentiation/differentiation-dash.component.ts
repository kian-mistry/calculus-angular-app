import { Component } from "@angular/core";

import { Expression } from '../../classes/expression/expression';
import { CalculusRules } from '../../constants/calculus-rules';

@Component({
	selector: 'diff-dash',
	templateUrl: '../../templates/differentiation/differentiation-dash.template.html'
})
export class DifferentiationDashboardComponent {
	private readonly MIN_X_AXIS: number = -5;
	private readonly MAX_X_AXIS: number = 5;
	private readonly DX: number = 0.1;

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
	 * Sets the minimum tick value of the y-axis from an array of numbers.
	 * @param d The array of numbers.
	 */
	private setMinYAxis(d: Array<number>) {
		let min = Math.min(...d);
		let minFloor = Math.floor(min);

		this.graphOptions["scales"].yAxes[0].ticks.min = minFloor;
	}

	/**
	 * Sets the maximum tick value of the y-axis from an array of numbers.
	 * @param d The array of numbers.
	 */
	private setMaxYAxis(d: Array<number>) {
		let max = Math.max(...d);
		let maxCeil = Math.ceil(max);

		this.graphOptions["scales"].yAxes[0].ticks.max = maxCeil;
	}

	/**
	 * Evaluates given expression with respect to x and plots on the graph.
	 * @param exprString The expression to be plotted on the graph.
	 */
	public evaluate(exprString: string): void {
		this.graphDatasets[0].data = new Array();
		this.graphLabels = new Array();

		let expr = new Expression(exprString, this.selectedVariable);
		expr.shuntingYard();

		let i: number = this.MIN_X_AXIS;
		while(i <= this.MAX_X_AXIS) {
			let ans = expr.evaluate(i);

			this.graphDatasets[0].data.push((<number> ans).toFixed(3));
			this.graphLabels.push(i + "");

			i += this.DX;
			i = parseFloat(i.toFixed(1));
		}

		let filteredData = this.graphDatasets[0].data.filter((x) => {
			return (x == undefined || isNaN(x) || !isFinite(x)) ? 0 : x;
		});

		this.setMinYAxis(filteredData);
		this.setMaxYAxis(filteredData);
	}
}