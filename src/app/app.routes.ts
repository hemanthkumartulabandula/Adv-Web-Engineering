import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CountryPopulationComponent } from './country-population/country-population.component';
import { LoginComponent } from './auth/login.component';
import { CountryEditComponent } from './country-edit/country-edit.component';

export const routes: Routes = [
    {path: "weather", component: WeatherComponent},
    {path: "cities", component: CitiesComponent},
    {path: "countries", component: CountriesComponent},
    {path: "navbar", component: NavBarComponent},
    {path: "countryPopulation/:id", component: CountryPopulationComponent},
    {path: "countryEdit", component: CountryEditComponent},
    {path: "countryEdit/:id", component: CountryEditComponent},
    {path: "login", component: LoginComponent},
    {path:"", component:WeatherComponent, pathMatch: "full"}

];
