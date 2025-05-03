import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from './login-request';
@Component({
  selector: 'app-login',
  imports: [ MatFormFieldModule, ReactiveFormsModule, RouterLink, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService : AuthService, private router : Router){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    let loginRequest = <LoginRequest>{
      userName : this.form.controls['userName'].value,
      password : this.form.controls['password'].value
    };

    this.authService.login(loginRequest).subscribe({
      next: result => {
        if(result.success)
          {
          //localStorage.setItem("token7", result.token);
          this.router.navigate(["/"]);  
          }
      },
      error : error => console.error(error)
      
    });
    }
}
