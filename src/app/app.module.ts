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

import { DifferentiationRulesComponent } from './components/differentiation/differentiation-rules.component';

import { MathJaxDirective } from './directives/mathjax.directive';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DifferentiationComponent,
		IntegrationComponent,
		DifferentiationRulesComponent,
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