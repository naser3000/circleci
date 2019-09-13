import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserGuard implements CanActivate {

  constructor(public _auth: AuthService, 
              private _router: Router) {}

  canActivate() {
    const observable = new Observable<boolean>((observer) => {
        this._auth.getUserInfo().subscribe(
          response => {
            observer.next(true);   
          },
          error => {
            observer.next(false);
            this._router.navigate(['/login']);
          }
        );
    });
    return observable;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggedOutUserGuard implements CanActivate {

  constructor(public _auth: AuthService, 
              private _router: Router) {}

  canActivate() {
    const observable = new Observable<boolean>((observer) => {
        this._auth.getUserInfo().subscribe(
          response => {
            observer.next(false);
            this._router.navigate(['']);
          },
          error => {
            observer.next(true);   
          }
        );
    });
    return observable;
  }
}
