import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  messages = [];
  message: string;
  userMessages:  Observable<any>[] = new Array();
  from;
  adminMessages:  Observable<any>[] = new Array();
  check = false;
  imgPath;
  searchText;

  constructor(private chatService: ChatService,
     private userService: UserService,
     private sanitizer: DomSanitizer) { }

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
        const m: {content} = {content: ''};
        m.content = message.message;
        this.userMessages.push(of(m));
        this.getAllMessages();
      });
    } else {
      this.chatService.getMessages().subscribe(message => {
        
        this.userMessages.push(of(message));
        this.getAllMessages();
      });
    }

    this.userService.getProfilePicture()
    .subscribe(photo => {
        this.imgPath = photo;
        console.log(photo)
    });

    this.getUserMgs();

    this.getAllMessages();

  }
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imgPath);
}
  isAdmin() {
   return this.userService.isAdmin();
  }
  getID() {
    const token = localStorage.getItem('token');
    const decodedToket = this.userService.getDecodedAccessToken(token);
    const user = decodedToket.user;
    const _id  = user._id;
    return _id;
  }
  getUserMgs() {
    this.chatService.getUserMessage(this.getID())
      .subscribe( (msg: []) => {
        msg.map((m: any) => {
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

      this.messages.sort(function(a, b) {
        const c = +new Date(a.date);
        const d = +new Date(b.date);
        return d - c;
      });
       console.log('all-msg', messages);
    });
  }

  onGetClientMesseges(id) {
    this.from = id._id;
    console.log('from', this.from);
    this.chatService.getUserMessage(id._id)
      .subscribe((msg: []) => {
        this.userMessages = [];
        msg.map((m: any) => {
          if (m['from'] === this.chatService.getID()) {
            m.check = true;
          } else {
            m.check = false;
          }
          this.userMessages.push(of(m));
        });
      });
  }
 
  ngOnDestroy () {
    this.userMessages = [];
    this.messages = [];
  }
}

