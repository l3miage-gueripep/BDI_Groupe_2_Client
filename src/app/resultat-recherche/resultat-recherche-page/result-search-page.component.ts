import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {provideNativeDateAdapter} from "@angular/material/core";
import {ActivatedRoute} from "@angular/router";
import { AppService } from '../../services/app.service';
import { Festival } from '../../modele/festival.model';
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
  citySelected = 'grenoble'
  categoriesSelected = 'rock'
  query: string | undefined;
  festivals: Festival[]= [];
  cities = this._formBuilder.group({
    grenoble: false,
    lyon: false,
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


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      console.log('this.query', this.query);
      if (this.query) {
        this.loadFestivalsByQuery();
      } else {
        this.loadAllFestivals();
      }
    });
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

  loadFestivalsByQuery(){
    this.festivals = [];
  }
}

