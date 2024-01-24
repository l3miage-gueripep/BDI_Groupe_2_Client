import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-resultat-card',
  templateUrl: './resultat-card.component.html',
  styleUrl: './resultat-card.component.scss'
})
export class ResultatCardComponent {
    @Input() imageUrl: string = 'assets/musilac.jpg';
    @Input() festivalName: string = 'Default Festival Name';
    @Input() festivalIntro: string = 'Default Festival Intro';
    @Input() startDate: string = 'Default StartDate';
    @Input() endDate: string = 'Default EndDate';
    @Input() price: number = 0;

    ngOnInit() {
        console.log('Image URL:', this.imageUrl);
        console.log('festivalName', this.festivalName)
    }
}
