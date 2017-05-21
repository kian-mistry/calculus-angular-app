//Converts a typed string into LaTeX format.
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

declare var MathJax: {
	Hub: {
		Queue: (param: Object[]) => void;
	}
}

@Directive({
	selector: '[mathJax]'
})
export class MathJaxDirective implements OnChanges {
	@Input('mathJax') private texExpression: string = "";

	constructor(private element: ElementRef) {}

	public ngOnChanges(): void {
		this.element.nativeElement.innerHTML = this.texExpression;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
	}
}