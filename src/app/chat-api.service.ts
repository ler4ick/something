import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private apiUrl = 'http://localhost:3000/api'; // URL моего backend-API

  constructor(private http: HttpClient) { }

  // getMessages(): Observable<Message[]> {
  //   return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  // }

  sendMessage(message: Message): Observable<any> {
  console.log(message);
  return this.http.post(`${this.apiUrl}/messages`, message);
  }

}
