import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RunnerComponent } from './components/runner/runner.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'qr-games';

	constructor(
		private router: Router
	){}

	navigateTo(path: string){
		this.router.navigate([path]);
	}
}
