import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimestampsService {

  constructor() { }
  private lastMessageTimestampSubject = new BehaviorSubject<string>('');
  lastMessageTimestamp$ = this.lastMessageTimestampSubject.asObservable();

  private lastMessageSubject = new BehaviorSubject<string>('');
  lastMessage$ = this.lastMessageSubject.asObservable();

  setLastMessageTimestamp(timestamp: string) {
    this.lastMessageTimestampSubject.next(timestamp);
  }

  setLastMessage(lastmess: string) {
    this.lastMessageSubject.next(lastmess);
  }
}
