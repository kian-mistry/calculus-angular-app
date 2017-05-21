import { Component } from '@angular/core';

import { OnSidenavListener } from '../classes/listeners/sidenav.listener';

@Component({
	selector: 'app-root',
	templateUrl: '../templates/app.template.html',
	styleUrls: ['../styles/app.style.css']
})
export class AppComponent extends OnSidenavListener {
	private navItems = [
		{icon: 'home', name: 'Home', link: 'home'},
		{icon: 'show_chart', name: 'Differentiation', link: 'differentiation'},
		{icon: 'insert_chart', name: 'Integration', link: 'integration'}
	];
}