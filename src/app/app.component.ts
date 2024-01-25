import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private appService: AppService) { 
		this.appService.getFestivals().subscribe((festival: any) => {
			console.log(festival);
		});
	}
}

	// title = 'angular-nodejs-example';

	// person: any;
    
    // connected = false;

	// ngOnInit() {
	// 	this.appService.getPerson()
	// 		.subscribe((person: any) => {
	// 			this.person = person;
    //             this.connected = true;
	// 		});
	// }

