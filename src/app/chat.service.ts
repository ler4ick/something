import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Room, rooms } from './rooms';
import { Message } from './messages';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  rooms = [...rooms];

  private currentRoomSubject = new BehaviorSubject<Room | null>(null);
  currentRoom$: Observable<Room | null> = this.currentRoomSubject.asObservable();

  setCurrentRoom(roomId: number): void {
    const room = this.rooms.find(r => r.id === roomId);
    this.currentRoomSubject.next(room || null);
  }

  sendMessage(message: Message): void {
    const currentRoom = this.currentRoomSubject.getValue();
    if (currentRoom) {
      currentRoom.messages.push(message);
      this.updateRoom(currentRoom);
    }
  }

  private updateRoom(room: Room): void {
    const index = this.rooms.findIndex(r => r.id === room.id);
    this.rooms[index] = { ...room };
    this.currentRoomSubject.next({ ...this.rooms[index] });
  }

  // private selectedChatIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  // public selectedChatId$ = this.selectedChatIdSubject.asObservable();

  // // constructor() { }

  // setSelectedChatId(id: number) {
  //   this.selectedChatIdSubject.next(id);
  // }

}
