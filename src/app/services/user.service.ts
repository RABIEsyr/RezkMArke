import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, Subject, of } from 'rxjs';

import * as jwt_decode from 'jwt-decode';

const url = 'http://localhost:3000/register'; // http://localhost:3000

@Injectable({
  providedIn: 'root'
})
export class UserService {

  openSlide = new Subject<boolean>();
  isLoggedIn = new Subject<any>();
  isImageLoading: boolean;
  imageService: any;
  constructor(private http: HttpClient) { }

  getHeader() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get User(): Observable<string> {
    return Observable.create((observ: Observer<String>) => {
      const token = this.getDecodedAccessToken(localStorage.getItem('token'));
      const userName = token.user.name;
      observ.next(userName);
    });
  }

  isAdmin() {
   const decodedToken = this.getDecodedAccessToken(localStorage.getItem('token'));
   if (decodedToken) {
      const is_admin = decodedToken.user.isAdmin;
      return is_admin;
   }
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    this.isLoggedIn.next(token);
    return token ? true : false;
  }

  signup(body: Object) {
    return this.http.post(url + '/sign-up', body);
  }

  signin(body) {
    return this.http.post(url + '/sign-in', body);
  }

  getName() {
    const decodedToken = this.getDecodedAccessToken(localStorage.getItem('token'));
    const name = decodedToken.user.name;
    console.log(88, name);
    return name;
  }

  getProfilePicture() {
    return this.http.get('http://localhost:3000/upload-photo/get', {headers: this.getHeader()});
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return null;
    }
  }

}
