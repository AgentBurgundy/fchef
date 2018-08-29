import { Routes } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";

export const appRoutes: Routes = [
    { path: 'home', component: MainComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]