import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {
  private showChatListSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public showChatList$ = this.showChatListSubject.asObservable();

  toggleChatList() {
    this.showChatListSubject.next(!this.showChatListSubject.value);
  }
  constructor() { }
}
