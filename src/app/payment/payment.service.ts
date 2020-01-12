import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId: string;
  token;
  db = [];

  constructor(private http: HttpClient) {
       this.userId = '1e44GSJDDJ999';
  }

   processPayment(token: any, amount: number) {
     const payment = { token, amount };
     this.token = payment;
     console.log(token);
      this.http.post('charg-card', {token: this.token}).subscribe();
     return this.db.push(payment);
   }

}
