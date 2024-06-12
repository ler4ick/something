import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { Room } from './rooms';
import { Message } from './messages';
import { Person, persons } from './persons';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private authService: AuthService) {}
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

  updateRoom(room: Room): void {
    const index = this.rooms.findIndex((r) => r.id === room.id);
    this.rooms[index] = { ...room };
    console.log('new current room: ', room);

    this.currentRoomSubject.next({ ...this.rooms[index] });
  }

  getUserById(id: number): Person | undefined {
    return this.persons.find((person) => person.id === id);
  }

  sobes: Person | null = null;

  whoIsSender(room: Room) {
    //const room = this.rooms.find((r) => r.id === roomId)!;
    if (this.authService.getUserId() === room.id_person_2) {
      this.sobes = this.getUserById(room.id_person_1)!;
    } else {
      this.sobes = this.getUserById(room.id_person_2)!;
    }
    return this.sobes;
  }
}
