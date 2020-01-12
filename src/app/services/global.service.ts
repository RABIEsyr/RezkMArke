import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  openNewSlide = new Subject<boolean>();
  windowWidth = new Subject<number>();
  serachActive = new Subject<boolean>();
  profilePicture =  new Subject<any>();
  constructor() { }
}
