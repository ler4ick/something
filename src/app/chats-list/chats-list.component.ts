import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { TogglerService } from '../toggler.service';
import { TimestampsService } from '../timestamps.service';
import { SearchFilterService } from '../search-filter.service';
import { Person } from '../persons';
import { Room } from '../rooms';
import { Message } from '../messages';
import { Router } from '@angular/router';
import { fetchRooms } from '../../queries/fetchRooms';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  //persons = [...persons];
  rooms: Room[] = [];
  showChatList = true;

  lastMessageTimestamp: string = '';
  lastMessage: string = '';

  @Output() userNameChanged = new EventEmitter<{
    name: string;
    lastName: string;
  }>();

  constructor(
    private chatService: ChatService,
    private timestampsService: TimestampsService,
    private togglerService: TogglerService,
    private searchFilterService: SearchFilterService,
    private authService: AuthService
  ) {
    this.togglerService.showChatList$.subscribe((showChatList) => {
      this.showChatList = showChatList;
    });

    this.searchFilterService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      //this.filteredRooms();
    });
  }

  async ngOnInit() {
    this.timestampsService.lastMessageTimestamp$.subscribe((timestamp) => {
      this.lastMessageTimestamp = timestamp;
    });
    this.timestampsService.lastMessage$.subscribe((lastmess) => {
      this.lastMessage = lastmess;
    });

    const newRooms = await fetchRooms(
      this.authService.getUserId() ?? -1,
      this.authService.getAuthToken()
    );

    this.rooms = [...newRooms];
  }

  onChatClick(roomId: number) {
    //this.chatService.setSelectedChatId(id);
    const room = this.rooms.find((r) => r.id === roomId);
    if (room) {
      const user = this.chatService.getUserById(room.id_person_2);
      if (user) {
        this.userNameChanged.emit({ name: user.name, lastName: user.lastname });
      }
    }
    this.chatService.setCurrentRoom(roomId, this.rooms);
  }

  searchQuery: string = '';
  filteredPersons: Person[] = [];

  // filterPersons() {
  //   this.filteredPersons = persons.filter(person =>
  //     person.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //     person.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }

  filteredRooms(): Room[] {
    return this.rooms.filter((room) => {
      const user = this.chatService.getUserById(room.id_person_2);
      if (user) {
        const fullName = `${user.name} ${user.lastname}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      }
      return false;
    });
  }

  updateLastMessageTimestamp(timestamp: string) {
    this.lastMessageTimestamp = timestamp;
  }

  getPersonNameFromRoom(room: Room): string {
    const user = this.chatService.getUserById(room.id_person_2);
    return user ? `${user.name} ${user.lastname}` : '';
  }

  getLastMessageFromRoom(room: Room): Message | undefined {
    return room.messages.length > 0
      ? room.messages[room.messages.length - 1]
      : undefined;
  }
}
