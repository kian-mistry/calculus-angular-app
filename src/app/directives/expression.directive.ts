import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { Expression } from '../classes/expression/expression';

@Directive({
	selector: '[expr]'
})
export class ExpressionDirective implements OnChanges {
	@Input('expr') private expression: string = "";

	constructor(private element: ElementRef) {}

	public ngOnChanges(): void {
		console.log("Expression: " + this.expression);

		let expr = new Expression(this.expression);
		let rpn = expr.shuntingYard();

		console.log("RPN: " + rpn);
	}
}