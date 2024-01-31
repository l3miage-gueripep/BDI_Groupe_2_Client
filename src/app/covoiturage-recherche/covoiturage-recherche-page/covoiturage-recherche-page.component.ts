import {Component, Injectable} from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Covoiturage} from "../../modele/covoiturage.model";
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {CovoiturageLieuList} from "../../modele/covoiturageLieuList.model";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {$localize} from "@angular/localize/init";
import {Festival} from "../../modele/festival.model";

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
  selector: 'app-covoiturage-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './covoiturage-recherche-page.component.html',
  styleUrl: './covoiturage-recherche-page.component.scss'
})
export class CovoiturageRecherchePageComponent {
  constructor(private route: ActivatedRoute, private appService: AppService) {
  }
  currentLoadMode: 'all' | 'byId' = 'all';
  pageSize = 10;
  currentPage = 0;
  nbResult = 0;
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
  festival: Festival = {
    codePostal: '',
    dateDebut: '',
    dateFin: '',
    lieuPrincipal: '',
    nomManifestation: '',
    siteWeb: '',
    tarifPass: 0,
    sousDomaine: {
        nomDomaine: '',
        nomSousDomaine: ''
    }
};

  loadAllCarpools(page: number, pageSize: number) {
      this.currentLoadMode = 'all';
      this.currentPage = page;
      this.pageSize = pageSize;
    this.appService.getAllCovoiturageLieu(page, pageSize).subscribe(
        (data) => {
            this.carpoolList=data;
            this.offerCarpools = data.content;
            this.nbResult = data.totalElements;
        },
        (error) => {
          console.error('Error fetching offerCarpools', error);
        }
    );
  }

  loadCarpoolsByFestivalId(festivalName: string, page: number, pageSize: number) {
      this.currentLoadMode = 'byId';
      this.currentPage = page;
      this.pageSize = pageSize;
    this.appService.getCovoiturageLieuByFestival(festivalName, page, pageSize).subscribe(
        (data) => {
            this.carpoolList = data;
            this.offerCarpools = data.content;
            this.nbResult = data.totalElements;
        },
        (error) => {
          console.error('Error fetching festivals', error);
        }
    );

      this.appService.getFestivalsById(festivalName).subscribe(
          (data) => {
              this.festival = data;
          }
      )
  }

    onPageChange(event: any) {
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;

        switch (this.currentLoadMode) {
            case 'all':
                this.loadAllCarpools(pageIndex, pageSize);
                break;
            case 'byId':
                this.loadCarpoolsByFestivalId(this.queryByFestivalId, pageIndex, pageSize);
                break;
        }
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryByFestivalId = params['query'];
      if (this.queryByFestivalId) {
        this.loadCarpoolsByFestivalId(this.queryByFestivalId, this.currentPage, this.pageSize);
      } else {
        this.loadAllCarpools(this.currentPage, this.pageSize);
      }
    });
  }
}
