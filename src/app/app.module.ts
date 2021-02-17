import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RunnerComponent } from './components/runner/runner.component';
import { CoderComponent } from './components/coder/coder.component';

import { AceEditorModule } from 'ng2-ace-editor';
import { EditorComponent } from './components/editor/editor.component';
import { GameComponent } from './components/game/game.component';
import { AboutComponent } from './components/about/about.component';
import { HowComponent } from './components/how/how.component';

const routes: Routes = [
	{ path: 'about', component: AboutComponent },
	{ path: 'how', component: HowComponent },
	{ path: 'editor', component: EditorComponent },
	{ path: 'game/:code', component: GameComponent },
	{ path: '',   redirectTo: '/about', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		AppComponent,
		RunnerComponent,
		CoderComponent,
		EditorComponent,
		GameComponent,
		AboutComponent,
		HowComponent
	],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		AppRoutingModule,
		AceEditorModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
