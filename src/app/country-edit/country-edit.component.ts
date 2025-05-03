import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryPopulation } from '../country-population';
import { environment } from '../../environments/environment.development';
import { Country } from '../country';

@Component({
  selector: 'app-country-edit',
  imports: [MatFormFieldModule, RouterLink,ReactiveFormsModule, MatInputModule],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent {
  form!: FormGroup;
  public country: Country | undefined;
  constructor(private http: HttpClient,private activatedRoute : ActivatedRoute) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl('', Validators.required),
      iso2 : new FormControl('', Validators.required),
      iso3 : new FormControl('', Validators.required)
    });
    this.populateData();
  }

  onSubmit(){}
    
  populateData() {
      let id = this.activatedRoute.snapshot.paramMap.get("id");
      this.http.get<Country>(`${environment.baseUrl}api/Countries/${id}`).subscribe({
        next: result => {
          this.country = result;
          this.form.patchValue(result);

        },
        error : error => console.error(error)
        
      }
    );
  }
}
