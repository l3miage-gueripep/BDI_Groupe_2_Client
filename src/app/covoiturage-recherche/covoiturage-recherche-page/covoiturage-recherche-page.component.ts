import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Covoiturage} from "../../modele/covoiturage.model";
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {CovoiturageLieuList} from "../../modele/covoiturageLieuList.model";

@Component({
  selector: 'app-covoiturage-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './covoiturage-recherche-page.component.html',
  styleUrl: './covoiturage-recherche-page.component.scss'
})
export class CovoiturageRecherchePageComponent {
  constructor(private route: ActivatedRoute, private appService: AppService) {
  }
  wordSearch = 'Musilac';
  nbResult = 20;
  departureFormControl = new FormControl('', [Validators.required]);
  arrivalFormControl = new FormControl('', [Validators.required]);
  nbPassenger = 2;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  isFilterMenuOpen = false;
  filterSelected = 'Départ le plus tôt';
  queryByFestivalId='';
  carpoolList : CovoiturageLieuList = {
      content: [],
      empty: false,
      first: false,
      last: false,
      number: 0,
      numberOfElements: 0,
      pageable: {offset: 0, pageNumber: 0, pageSize: 0, paged: false, sort: {}, unpaged: false},
      size: 0,
      sort: {},
      totalElements: 0,
      totalPages: 0
  };
  offerCarpools : CovoiturageLieu[] = [];

  loadAllCarpools() {
    this.appService.getAllCovoiturageLieu().subscribe(
        (data) => {
            this.carpoolList=data;
            this.offerCarpools = data.content;
          console.log('this.offerCarpools loadAllCarpools',this.offerCarpools)
        },
        (error) => {
          console.error('Error fetching offerCarpools', error);
        }
    );
  }

  loadCarpoolsByFestivalId(festivalName: string) {
    this.appService.getCarpoolByIdFestival(festivalName).subscribe(
        (data) => {
            this.carpoolList = data;
          this.offerCarpools = data.content;
          console.log('this.offerCarpools loadCarpoolsByFestivalId', this.offerCarpools);
        },
        (error) => {
          console.error('Error fetching festivals', error);
        }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryByFestivalId = params['query'];
      console.log('this.queryByFestivalId', this.queryByFestivalId);
      if (this.queryByFestivalId) {
        this.loadCarpoolsByFestivalId(this.queryByFestivalId);
      } else {
        this.loadAllCarpools();
      }
    });
  }
}
