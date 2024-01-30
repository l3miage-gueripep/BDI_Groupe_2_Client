import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
import { AppService } from '../../services/app.service';
import { Festival } from '../../modele/festival.model';
import { FilterQuery } from '../../modele/filterQuery.model';
import {debounceTime, distinctUntilChanged, firstValueFrom, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private appService: AppService ) {
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  toggleChoiceBar() {
    this.isChoiceBarVisible = !this.isChoiceBarVisible;
  }

    loadCities(): void {
        const cachedCities = localStorage.getItem('cities');
        if (cachedCities) {
            this.options = JSON.parse(cachedCities);
        } else {
            this.appService.getAllCity().subscribe(
                (data) => {
                    this.options = data;
                    this.appService.saveCitiesToLocal(data);
                },
                (error) => {
                    console.error('Error fetching cities', error);
                }
            );
        }
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
    const cityValues = this.myControl.value;
    const rangeValues = this.range.value;
    console.log('rangeValues', rangeValues);

    const formatDate = (date: Date | null | undefined): string => {
      return date ? date.toISOString() : '';
    };



    this.filterQuery = {
      lieuPrincipal: cityValues || "",
      dateDebut: formatDate(rangeValues.start),
      dateFin: formatDate(rangeValues.end)
    };

    console.log('filterQuery', this.filterQuery);


    console.log('Updated filterQuery:', this.filterQuery);
  }




  async ngOnInit() {
      this.loadCities();

      this.myControl?.valueChanges
          ?.pipe(
              debounceTime(300),
              distinctUntilChanged()
          )
          ?.subscribe(() => {
              this.updateFilterQuery();
          });
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

      this.cities.valueChanges.subscribe((val: any) => {
          const selectedCities = Object.keys(val).filter(city => val[city]);
          this.citySelected = selectedCities.join(', ');
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  /*
    async loadAllCitiesFromLocalOrAPI(): Promise<string[]> {
        const citiesKey = 'allCities';
        const citiesFromStorage = localStorage.getItem(citiesKey);

        if (citiesFromStorage) {
            return JSON.parse(citiesFromStorage) as string[];
        } else {
            try {
                const data: string[] = await this.loadAllCities();
                localStorage.setItem(citiesKey, JSON.stringify(data));
                return data;
            } catch (error) {
                console.error('Error loading cities from server', error);
                return [];
            }
        }
    }

   */
}

