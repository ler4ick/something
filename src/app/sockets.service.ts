import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './messages';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private  socket = io("http://localhost:3000", {
  ackTimeout: 10000,
  retries: 3,
  });
  private counter = 0;

  sendRoomId(roomId: number | undefined) {
    this.socket.emit("get-room-messages", roomId);
  }

 sendMessage (msg: Message) {
    // compute a unique offset
    const clientOffset = `${this.socket.id}-${this.counter++}`;
    console.log(clientOffset);
    this.socket.emit("chat message", msg, clientOffset);
  }

  getMessages() {
    let observable = new Observable<Message[]>(observer => {
      this.socket.on('room-messages', (msg: Message[]) => {
        observer.next(msg)
      })

      return () => { this.socket.disconnect()}
    })
    return observable;
  };
};
