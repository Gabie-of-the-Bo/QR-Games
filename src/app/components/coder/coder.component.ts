import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import 'brace';
import { edit } from 'brace';

import 'brace/mode/javascript';

import { toCanvas } from 'qrcode'

import { minify } from 'terser'
import { compressToEncodedURIComponent  } from 'lz-string';

@Component({
	selector: 'coder',
	templateUrl: './coder.component.html',
	styleUrls: ['./coder.component.scss']
})
export class CoderComponent implements OnInit {

	@Input() qrCanvas: ElementRef<HTMLCanvasElement>;

	@Output() execute: EventEmitter<string> = new EventEmitter();
	@Output() executeF: EventEmitter<string> = new EventEmitter();
	@Output() stop: EventEmitter<void> = new EventEmitter();

	editor;
	code: string = "";
	minified_code: string = "";
	error: string = "";
	url: string = "";

	constructor() { }

	ngOnInit(): void {
		this.editor = edit('editor');
		this.editor.getSession().setMode('ace/mode/javascript');
		this.editor.setTheme('ace/theme/monokai');

		this.editor.setShowPrintMargin(false);

		setInterval(() => {
			let val = this.editor.getValue();

			if(val != this.code){
				this.code = val;

				minify(this.code).then(val => {
					this.minified_code = compressToEncodedURIComponent(val.code?? "");
					this.url = window.location.origin + "/game/" + this.minified_code;
					this.error = "";

					if(this.qrCanvas && this.qrCanvas.nativeElement){
						toCanvas(this.qrCanvas.nativeElement, this.url);
					}
	
				}).catch(err => {
					this.error = err;
					this.minified_code = "";
				})
	 		}
		}, 1000);
	}

	executeCode(){
		this.execute.emit(this.code);
	}

	executeFrame(){
		this.executeF.emit(this.code);
	}

	stopCode(){
		this.stop.emit();
	}
}
