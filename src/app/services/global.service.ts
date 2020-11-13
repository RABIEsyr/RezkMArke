import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

const url = 'api/new-product-image'; //'http://localhost:3000/api/new-product-image'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  openNewSlide = new Subject<boolean>();
  windowWidth = new Subject<number>();
  serachActive = new Subject<boolean>();
  profilePicture =  new Subject<any>();
  animateCart = new Subject<boolean>();
  constructor(private http: HttpClient, private userService: UserService) { }

  uploadImage(formData) {
    return this.http.post(url, formData)
  }
}
