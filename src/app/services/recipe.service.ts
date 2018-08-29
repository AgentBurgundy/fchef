import { Injectable } from '@angular/core';
import {Headers, Response, URLSearchParams} from '@angular/http';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  host: string;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.host = window.location.origin + '/api'
    }
    else {
      this.host = 'http://localhost:8080/api'
    }
  }

  public getAuth() {
    return this.http.get<Auth>(this.host);
  }

  public getRandomRecipe(data: any, query: string, options: any): Observable<Recipe> {
    return this.http.get('http://food2fork.com/api/search', {
      params: {
        "key": data.key,
        "q": query,
        "sort": "r"
      }
    }).pipe(map((res: Response) => {
      let recipe: any = res["recipes"][Math.floor(Math.random() * Object.keys(res["recipes"]).length)]
      
      return new Recipe({
        title: recipe["title"],
        image_url: recipe["image_url"],
        source_url: recipe["source_url"],
      });
    }));
  }
}
