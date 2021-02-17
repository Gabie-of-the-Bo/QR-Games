import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { toCanvas } from 'qrcode'

import { decompressFromEncodedURIComponent  } from 'lz-string';
import { RunnerComponent } from '../runner/runner.component';

@Component({
	selector: 'game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

	@ViewChild(RunnerComponent) runner: RunnerComponent;

	code: string;
	qr: string;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		let canvas = document.createElement("canvas");
		toCanvas(canvas, window.location.href, _ => {})
		this.qr = canvas.toDataURL();

		this.code = decompressFromEncodedURIComponent(this.route.snapshot.paramMap.get('code'));
	}

	ngAfterViewInit(): void {
		if(this.code){
			this.runner.executeCode(this.code);
		}
	}
}
