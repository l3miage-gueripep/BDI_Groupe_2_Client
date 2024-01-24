import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-covoiturage-driver-card',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatButton,
        RouterLink
    ],
  templateUrl: './covoiturage-driver-card.component.html',
  styleUrl: './covoiturage-driver-card.component.scss'
})
export class CovoiturageDriverCardComponent {
    @Input() imageUrl: string = 'assets/photoDriver.jpg';
    @Input() driverName: string = 'Default Driver Name';
    @Input() departureTime: string = 'Default DepartureTime';
    @Input() arrivalTime: string = 'Default ArrivalTime';
    @Input() departureCity: string = 'Default DepartureCity';
    @Input() arrivalCity: string = 'Default ArrivalCity';
    @Input() placeLibre: number = 0;
    @Input() price: number = 0;


}
