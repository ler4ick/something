import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private selectedChatIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedChatId$ = this.selectedChatIdSubject.asObservable();

  constructor() { }

  setSelectedChatId(id: number) {
    this.selectedChatIdSubject.next(id);
  }

}
