import { Component, OnInit } from '@angular/core';
import { CountryPopulation } from '../country-population';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-population',
  imports: [RouterLink],
  templateUrl: './country-population.component.html',
  styleUrl: './country-population.component.scss'
})
export class CountryPopulationComponent implements OnInit{

public countrypopulation: CountryPopulation | undefined;
  
  constructor(private http: HttpClient,private activatedRoute : ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getCountryPopulation();
  }

getCountryPopulation() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.http.get<CountryPopulation>(`${environment.baseUrl}api/Countries/GetPopulation/${id}`).subscribe({
      next: result => this.countrypopulation = result,
      error : error => console.error(error)
      
    }
  );
}


}
