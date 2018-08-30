import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { appRoutes } from './app-routes';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { ImageViewComponent } from './components/image-view/image-view.component';

import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RecipeViewComponent,
    ImageViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6330340371201691',
      adSlot: 7259870550,
      pageLevelAds: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
