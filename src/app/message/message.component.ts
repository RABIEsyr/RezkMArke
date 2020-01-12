import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages;
  message: string;
  userMessages:  Observable<any>[] = new Array();
  from;
  adminMessages:  Observable<any>[] = new Array();
  check = false;

  constructor(private chatService: ChatService, private userService: UserService) { }

  sendMessage() {
    if (!this.isAdmin()) {
      this.chatService.sendMessage(this.message);
      const m: {content, check} = {content: '', check: true};
      m.content = this.message;
      m.check = true;
      this.userMessages.push(of(m));

      this.message = '';
    } else {
      this.chatService.sendUserMessage(this.from , this.message).subscribe();
      const m: {content, check} = {content: '', check: false};
      m.content = this.message;
      m.check = true;
      this.userMessages.push(of(m));
      this.message = '';
    }
  }

  ngOnInit() {
    if (this.isAdmin()) {
      this.chatService.getMessages().subscribe(message => {
        console.log('111', message);
        const m: {content} = {content: ''};
        m.content = message.message;
        this.userMessages.push(of(m));

      });
    } else {
      this.chatService.getMessages().subscribe(message => {
        console.log('222', message);
         this.userMessages.push(of(message));

      });
    }


    this.getUserMgs();

    this.getAllMessages();

  }

  isAdmin() {
   return this.userService.isAdmin();
  }

  getUserMgs() {
    this.chatService.getUserMessage(this.chatService.getID())
      .subscribe( (msg: []) => {
        msg.map(m => {
          if (m['from'] === this.chatService.getID()) {
            m.check = true;
          } else {
            m.check = false;
          }
          this.userMessages.push(of(m));
        });

        console.log('user-msg', msg);
      });
  }

  getAllMessages() {
    this.chatService.getAllMessages().subscribe((messages) => {
      this.messages = messages['msgs'];
       console.log('all-msg', messages);
    });
  }

  onGetClientMesseges(id) {
    this.from = id._id;
    console.log('from', this.from);
    this.chatService.getUserMessage(id._id)
      .subscribe((msg: []) => {
        this.userMessages = [];
        msg.map(m => {
          if (m['from'] === this.chatService.getID()) {
            m.check = true;
          } else {
            m.check = false;
          }
          this.userMessages.push(of(m));
        });
      });
  }
}

