import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'runner',
	templateUrl: './runner.component.html',
	styleUrls: ['./runner.component.scss']
})
export class RunnerComponent implements OnInit, AfterViewInit {

	@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
	public context: CanvasRenderingContext2D;

	@Input() width: number = 500;
	@Input() height: number = 500;

	parsedCode;
	fps: number = 60;
	run: boolean = true;
	running: boolean = false;

	constructor() { }

	ngOnInit(): void { }

	ngAfterViewInit(): void {
		this.context = this.canvas.nativeElement.getContext('2d');

		// Attributes
		this.context['w'] = this.canvas.nativeElement.width;
		this.context['h'] = this.canvas.nativeElement.height;
		this.context['t'] = 0;

		// Reset
		this.context['r'] = (c='#ffffff') => {
			this.context.fillStyle = c;
			this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		};		

		// Draw line
		this.context['l'] = (x1, y1, x2, y2, w=1, c='#000000') => {
			this.context.lineWidth = w;
			this.context.strokeStyle = c;
			this.context.beginPath();
			this.context.moveTo(x1, y1);
			this.context.lineTo(x2, y2);
			this.context.stroke();
		};

		// Draw circle
		this.context['c'] = (x, y, r, w=1, c='#000000') => {
			this.context.lineWidth = w;
			this.context.strokeStyle = c;
			this.context.beginPath();
			this.context.arc(x, y, r, 0, 2 * Math.PI)
			this.context.stroke();
		};

		// Draw square
		this.context['q'] = (x, y, w, h, wth=1, c='#000000') => {
			this.context.lineWidth = wth;
			this.context.strokeStyle = c;
			this.context.beginPath();
			this.context.rect(x, y, w, h);
			this.context.stroke();
		};

		// Events
		this.context['e'] = {
			c: [],
			k: [...Array(256)].map(() => 0)
		};
	}

	pressKey($event){
		this.context['e']['k'][$event.keyCode] = 1;
	}

	releaseKey($event){
		this.context['e']['k'][$event.keyCode] = 0;
	}

	registerClick($event){
		let rect = $event.target.getBoundingClientRect();
		let x = $event.clientX - rect.left;
		let y = $event.clientY - rect.top;

		this.context['e'].c.push([x, y]);
	}

	executeCode(code: string | boolean, keepRunning = true) {
		let t = performance.now();
		this.running = true;

		if (code) {
			code = "(c) => {\n" + code + "\n}";
			this.parsedCode = eval(code);
		}

		this.parsedCode(this.context)
		this.context['t'] += 1;

		if (keepRunning && this.run) {
			let delay = (1000 / this.fps) - (performance.now() - t);
			setTimeout(() => this.executeCode(false), delay);
		
		} else{
			this.run = true;
			this.running = false;
		}
	}

	stopCode(){
		this.run = false;
	}
}
