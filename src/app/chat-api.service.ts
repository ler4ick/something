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

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }
  //const message = { mess: 'Привет, сервер!' };

  sendMessage(message: Message): Observable<any> {
  //   const formData = new FormData();
  // formData.append('id', message.id.toString());
  // formData.append('id_creator', message.id_creator.toString());
  // formData.append('id_room', message.id_room.toString());
  // formData.append('date', message.date.toString());
  // formData.append('content', message.content);
  // console.log(formData);
  console.log(message);
  return this.http.post(`${this.apiUrl}/messages`, message);
   // Создаем новый объект, в котором ожидаемое поле называется 'mess'

  }


  send(bitc: string){
    return this.http.post(`${this.apiUrl}/messages`, bitc);
  }


}
