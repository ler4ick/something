import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Room } from './rooms';
import { Message } from './messages';
import { Person, persons } from './persons';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}
  rooms: Room[] = [];
  persons = [...persons];

  private currentRoomSubject = new BehaviorSubject<Room | null>(null);
  currentRoom$: Observable<Room | null> =
    this.currentRoomSubject.asObservable();

  setCurrentRoom(roomId: number, rooms: Room[]): void {
    const room = rooms.find((r) => r.id === roomId);
    this.currentRoomSubject.next(room || null);
    this.rooms = [...rooms];
  }

  sendMessage(message: Message): void {
    const currentRoom = this.currentRoomSubject.getValue();
    if (currentRoom) {
      currentRoom.messages.push(message);
      this.updateRoom(currentRoom);
    }
  }

  private updateRoom(room: Room): void {
    const index = this.rooms.findIndex((r) => r.id === room.id);
    this.rooms[index] = { ...room };
    this.currentRoomSubject.next({ ...this.rooms[index] });
  }

  getUserById(id: number): Person | undefined {
    return this.persons.find((person) => person.id === id);
  }
}
