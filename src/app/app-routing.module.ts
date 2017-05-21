import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { DifferentiationComponent } from './components/differentiation.component';
import { IntegrationComponent } from './components/integration.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'differentiation',
		component: DifferentiationComponent
	},
	{
		path: 'integration',
		component: IntegrationComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}