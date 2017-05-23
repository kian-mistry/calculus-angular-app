import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { DifferentiationComponent } from './components/differentiation.component';
import { IntegrationComponent } from './components/integration.component';

import { DifferentiationDashboardComponent } from './components/differentiation/differentiation-dash.component';

import { DifferentiationRulesComponent } from './components/differentiation/differentiation-rules.component';
import { IntegrationRulesComponent } from './components/integration/integration-rules.component';

import { MathJaxDirective } from './directives/mathjax.directive';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DifferentiationComponent,
		IntegrationComponent,
		DifferentiationDashboardComponent,
		DifferentiationRulesComponent,
		IntegrationRulesComponent,
		MathJaxDirective
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FlexLayoutModule,
		FormsModule,
		HttpModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}