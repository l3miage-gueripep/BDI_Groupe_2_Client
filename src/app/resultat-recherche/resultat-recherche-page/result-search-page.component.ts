import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {provideNativeDateAdapter} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
import { AppService } from '../../services/app.service';
import { Festival } from '../../modele/festival.model';
import { FilterQuery } from '../../modele/filterQuery.model';
@Component({
  selector: 'app-resultat-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './result-search-page.component.html',
  styleUrls: ['./result-search-page.component.scss'],
})


export class ResultSearchPageComponent {

  wordSearch = 'grenoble';
  nbResult = 16;
  isFilterMenuOpen = false;
  isCityMenuOpen = false;
  isCategoriesMenuOpen = false;
  isChoiceBarVisible: boolean = true;
  filterSelected = 'Par pertinence'
  citySelected = 'Ville'
  categoriesSelected = 'Type'
  queryByName: string | undefined;
  filterQuery: FilterQuery =  {
    dateDebut: "",
    dateFin: "",
    lieuPrincipal:""
  };

  festivals: Festival[]= [];
  cities = this._formBuilder.group({
    ARLES: false,
    LYON: false,
  });

  categories = this._formBuilder.group({
    pop: false,
    rock: false,
  });

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private appService: AppService ) {
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  toggleChoiceBar() {
    this.isChoiceBarVisible = !this.isChoiceBarVisible;
  }


  loadAllFestivals() {
    this.appService.getFestivals().subscribe(
        (data) => {
          this.festivals = data;
          console.log('this.festivals',this.festivals)
        },
        (error) => {
          console.error('Error fetching festivals', error);
        }
    );
  }

  loadFestivalsById(name: string) {
    this.appService.getFestivalsById(name).subscribe(
        (data) => {
          this.festivals = Array.isArray(data) ? data : [data];
          console.log('this.festivals', this.festivals);
        },
        (error) => {
          console.error('Error fetching festivals', error);
        }
    );
  }


  loadFestivalsByFilter(query: FilterQuery) {
    this.appService.getFestivalsByFilter(query).subscribe(
        (data) => {
          this.festivals = Array.isArray(data) ? data : [data];
          console.log('this.festivals', this.festivals);
        },
        (error) => {
          console.log('query',query)
          console.error('Error fetching festivals', error);

        }
    );
  }

  updateFilterQuery() {
    const cityValues = this.cities.getRawValue() as { [key: string]: any };
    const rangeValues = this.range.value;
    console.log('rangeValues', rangeValues);

    const formatDate = (date: Date | null | undefined): string => {
      return date ? date.toISOString() : '';
    };

    let lieuPrincipal = '';
    Object.keys(cityValues).forEach(key => {
      if (cityValues[key]) {
        lieuPrincipal = key;
      }
    });

    this.filterQuery = {
      lieuPrincipal: lieuPrincipal,
      dateDebut: formatDate(rangeValues.start),
      dateFin: formatDate(rangeValues.end)
    };

    console.log('filterQuery', this.filterQuery);


    console.log('Updated filterQuery:', this.filterQuery);
  }




  ngOnInit() {
    this.cities.valueChanges.subscribe(() => this.updateFilterQuery());
   this.categories.valueChanges.subscribe(() => this.updateFilterQuery());


    this.route.queryParams.subscribe(params => {
      this.queryByName = params['query'];
      console.log('this.query', this.queryByName);
      if (this.queryByName) {
        this.loadFestivalsById(this.queryByName);
      } else {
        this.loadAllFestivals();
      }
    });

    this.cities.valueChanges.subscribe((val:any) => {
      const selectedCities = Object.keys(val).filter(city => val[city]);
      this.citySelected = selectedCities.join(', ');
    });
  }

}

