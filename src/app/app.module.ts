import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { DifferentiationComponent } from './components/differentiation.component';
import { IntegrationComponent } from './components/integration.component';

import { DifferentiationDashboardComponent } from './components/differentiation/differentiation-dash.component';
import { IntegrationDashboardComponent } from './components/integration/integration-dash.component';

import { DifferentiationRulesComponent } from './components/differentiation/differentiation-rules.component';
import { IntegrationRulesComponent } from './components/integration/integration-rules.component';

import { ExpressionDirective } from './directives/expression.directive';
import { MathJaxDirective } from './directives/mathjax.directive';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DifferentiationComponent,
		DifferentiationDashboardComponent,
		DifferentiationRulesComponent,
		IntegrationComponent,
		IntegrationDashboardComponent,
		IntegrationRulesComponent,
		ExpressionDirective,
		MathJaxDirective
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		ChartsModule,
		FlexLayoutModule,
		FormsModule,
		HttpModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}