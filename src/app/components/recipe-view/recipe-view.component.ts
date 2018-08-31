import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

import { WOW } from 'wowjs/dist/wow.min';

const searchTerms: string[] = [
  "chicken",
  "steak",
  "turkey",
  "broccoli",
  "pasta",
  "macaroni",
  "pizza",
  "bagel"
];

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  

  isLoading: boolean = true;
  error: boolean = false;
  queryTerm: string = 'chicken';
  currentFuckingRecipe: Recipe;
  queryOptions: any = {
    celeryfree: false,
    crustaceanfree: false,
    dairyfree: false,
    eggfree: false,
    glutenfree: false,
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {    
    this.search();
  }

  ngAfterViewInit() {
    let wow = new WOW(
      {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
      });
  
    wow.init();
  }

  randomSearch() {
    Object.keys(this.queryOptions).forEach(key => {
      this.queryOptions[key] = Math.random() >= 0.5;
    });

    this.queryTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

    this.performRequest().subscribe(data => 
      {
        this.currentFuckingRecipe = data;
        console.log(data.image_url);
        this.isLoading = false;
      },
      error => {
        this.randomSearch();
    });
  }

  performRequest(): Observable<Recipe> {
    let result: Observable<Recipe>;

    console.log('Getting info from server...');
    this.isLoading = true;
    this.error = false;
    
    this.recipeService.getAuth().subscribe(auth => {
      result = this.recipeService.getRandomRecipe(auth, this.queryTerm, this.queryOptions)});

    if (result) {
      return result;
    }
  }

  search() {    
    this.performRequest().subscribe(data => 
      {
        this.currentFuckingRecipe = data;
        console.log(data.image_url);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.error = true;
    });  
  }

}
