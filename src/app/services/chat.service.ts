import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient, private userService: UserService) {

    this.socket = io(this.url, {
      query: {token: this.token}
    });

    this.socket.emit('join', this.getID() );
   }


   public sendMessage(message) {
    this.socket.emit('send-message', {_id: this.getID(),  message, });
}

public getMessages = () => {
  return Observable.create((observer) => {
      this.socket.on('receive-message', (message) => {
          observer.next(message);
      });
  });
}


getUserMessage(id) {
  return this.http.get(this.url + '/user-msg/' + id, { headers: this.userService.getHeader() });
}

sendUserMessage(id, message) {
  return this.http.post(this.url + '/user-msg/' + id, {message}, { headers: this.userService.getHeader() });
}

getAllMessages() {
  return this.http.get(this.url + '/all-msg', { headers: this.userService.getHeader() });
}

getID() {
  const decodedToket = this.userService.getDecodedAccessToken(this.token);
  const user = decodedToket.user;
  const _id  = user._id;
  return _id;
}




}
