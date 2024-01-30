import { Component, Injectable } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {provideNativeDateAdapter} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
import { AppService } from '../../services/app.service';
import { Festival } from '../../modele/festival.model';
import { FilterQuery } from '../../modele/filterQuery.model';
import {debounceTime, distinctUntilChanged, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import { $localize } from '@angular/localize/init';
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = $localize`First page`;
    itemsPerPageLabel = $localize`Items per page:`;
    lastPageLabel = $localize`Last page`;

    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return $localize`Page 1 of 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return $localize`Page ${page + 1} of ${amountPages}`;
    }
}

@Component({
  selector: 'app-resultat-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './result-search-page.component.html',
  styleUrls: ['./result-search-page.component.scss'],
})


export class ResultSearchPageComponent {

  nbResult = 0;
  isFilterMenuOpen = false;
  isChoiceBarVisible: boolean = true;
  filterSelected = 'Par pertinence'
  queryByName: string | undefined;
  filterQuery: FilterQuery =  {
    dateDebut: "",
    dateFin: "",
    lieuPrincipal:"",
    cityDeparture:"",
    nomDomaine:"",
  };
  cityDepartureValue = '';
  festivals: Festival[]= [];

  cityControl = new FormControl('');
  cityOptions: string[] = [];
  filteredCityOptions: Observable<string[]> | undefined;

  domaineControl = new FormControl('');
  domaineOptions: string[] = [];
  filteredDomaineOptions: Observable<string[]> | undefined;

    totalFestivals = 140;
    pageSize = 10;
    currentPage = 0;
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
            this.cityOptions = JSON.parse(cachedCities);
        } else {
            this.appService.getAllCity().subscribe(
                (data) => {
                    this.cityOptions = data;
                    this.appService.saveCitiesToLocal(data);
                },
                (error) => {
                    console.error('Error fetching cities', error);
                }
            );
        }
    }

    loadDomaines(): void {
        const cachedDomaines = localStorage.getItem('domaines');
        if (cachedDomaines) {
            this.domaineOptions = JSON.parse(cachedDomaines);
        } else {
            this.appService.getAllDomaine().subscribe(
                (data) => {
                    this.domaineOptions = data;
                    this.appService.saveDomaineToLocal(data);
                },
                (error) => {
                    console.error('Error fetching domaines', error);
                }
            );
        }
    }

    loadAllFestivals(page: number, pageSize: number) {
        this.currentPage = page;
        this.pageSize = pageSize;

        this.appService.getFestivals(page, pageSize).subscribe(
            (data) => {
              this.festivals = data;
              this.nbResult = this.totalFestivals
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
            this.nbResult = data.length
            const filterQueryValues = Object.keys(this.filterQuery)
                .filter(key => this.filterQuery[key])
                .map(key => this.filterQuery[key]);

            this.queryByName = filterQueryValues.join(', ');
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
            this.nbResult = data.length
            const filterQueryValues = Object.keys(this.filterQuery)
                .filter(key => this.filterQuery[key])
                .map(key => this.filterQuery[key]);

            this.queryByName = filterQueryValues.join(', ');
          console.log('this.festivals', this.festivals);
        },
        (error) => {
          console.log('query',query)
          console.error('Error fetching festivals', error);

        }
    );
  }

  updateFilterQuery() {
    const cityValue = this.cityControl.value;
    const domaineValue = this.domaineControl.value;
    const rangeValues = this.range.value;
    console.log('rangeValues', rangeValues);

    const formatDate = (date: Date | null | undefined): string => {
      return date ? date.toISOString() : '';
    };



    this.filterQuery = {
      lieuPrincipal: cityValue || "",
      dateDebut: formatDate(rangeValues.start),
      dateFin: formatDate(rangeValues.end),
      cityDeparture: this.cityDepartureValue,
      nomDomaine: domaineValue || "",
    };


    console.log('filterQuery', this.filterQuery);


    console.log('Updated filterQuery:', this.filterQuery);
  }


  clearCityDeparture() {
    this.cityDepartureValue = '';
    this.updateFilterQuery();
  }

    onPageChange(event: any) {
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;

        this.loadAllFestivals(pageIndex, pageSize);
    }

  async ngOnInit() {
      this.loadCities();
      this.loadDomaines();

      this.cityControl?.valueChanges
          ?.pipe(
              debounceTime(300),
              distinctUntilChanged()
          )
          ?.subscribe(() => {
              this.updateFilterQuery();
          });
      this.domaineControl?.valueChanges
          ?.pipe(
              debounceTime(300),
              distinctUntilChanged()
          )
          ?.subscribe(() => {
              this.updateFilterQuery();
          });


      this.route.queryParams.subscribe(params => {
          this.queryByName = params['query'];
          console.log('this.query', this.queryByName);
          if (this.queryByName) {
              this.loadFestivalsById(this.queryByName);
          } else {
              this.loadAllFestivals(this.currentPage, this.pageSize);
          }
      });


      this.filteredCityOptions = this.cityControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCity(value || '')),
      );

      this.filteredDomaineOptions = this.domaineControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDomaine(value || '')),
      );
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

    private _filterDomaine(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.domaineOptions.filter(option => option.toLowerCase().includes(filterValue));
    }

}

