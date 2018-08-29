import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

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
  fuckingOptions: any = {

  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {    
    this.search();
  }

  search() {
    console.log('Getting info from server...');
    this.isLoading = true;
    this.error = false;

    this.recipeService.getAuth().subscribe(auth => {
      this.recipeService.getRandomRecipe(auth, this.queryTerm, this.fuckingOptions)
        .subscribe(data => 
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
    });    
  }

}
