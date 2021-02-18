import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RunnerComponent } from '../runner/runner.component';

@Component({
	selector: 'editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

	@ViewChild(RunnerComponent) runner: RunnerComponent;
	@ViewChild("qr") qrCanvas: ElementRef<HTMLCanvasElement>;

	tab: string = "game";

	constructor() { }

	ngOnInit(): void { }

	executeCode($event, keepRunning = true) {
		if(!this.runner.running){
			this.runner.executeCode($event, keepRunning);
		}
	}

	stopCode() {
		if(this.runner.running){
			this.runner.stopCode();
		}
	}
}
