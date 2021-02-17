import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.code = decompressFromEncodedURIComponent(this.route.snapshot.paramMap.get('code'));
	}

	ngAfterViewInit(): void {
		if(this.code){
			this.runner.executeCode(this.code);
		}
	}
}
