import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink, 
    MatToolbarModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  

  isloggedIn : boolean = false;
  private destroySubject = new Subject();

  constructor(private authService : AuthService){
    authService.authStatus.pipe(takeUntil(this.destroySubject)).subscribe(
      result => this.isloggedIn = result
    )
  }

  logout() {
  this.authService.logout();
  }

  ngOnInit(): void {
    this.isloggedIn = this.authService.isAuthenticated();  

  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  
}
