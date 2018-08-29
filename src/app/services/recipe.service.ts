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
    return this.http.get('https://api.edamam.com/search', {
      params: {
        "app_id": data.id,
        "app_key": data.key,
        "q": query,
      }
    }).pipe(map((res: Response) => {
      let index : number = Math.floor(Math.random() * Object.keys(res['hits']).length);
      let recipe: any = res['hits'][index]['recipe']
      
      return new Recipe({
        title: recipe.label,
        source_url: recipe.url
      });
    }));
  }
}
