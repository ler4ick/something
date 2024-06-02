import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private  socket = io("http://localhost:3000", {
  ackTimeout: 10000,
  retries: 3,
});
private counter = 0;

 sendMessage (msg: string) {
    // compute a unique offset
    const clientOffset = `${this.socket.id}-${this.counter++}`;
    console.log(clientOffset);
    this.socket.emit("chat message", msg, clientOffset);
  }

   getMessages() {
    let observable = new Observable<string>(observer => {
      this.socket.on('chat message', (msg: string) => {
        observer.next(msg)
      })

      return () => { this.socket.disconnect()}
    })

    return observable;
  };
};
