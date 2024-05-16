import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { TogglerService } from '../toggler.service';
import { TimestampsService } from '../timestamps.service';
import { SearchFilterService } from '../search-filter.service';
import { Person, persons } from '../persons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  persons = [...persons];
  showChatList = true;

  lastMessageTimestamp: string = '';

  constructor(private chatService: ChatService,
              private timestampsService: TimestampsService,
              private togglerService: TogglerService,
              private searchFilterService: SearchFilterService,

  ) {
    this.togglerService.showChatList$.subscribe(showChatList => {
      this.showChatList = showChatList;
    });

    this.searchFilterService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterPersons();
    });
  }


  ngOnInit() {

  }

  onChatClick(id: number) {
    this.chatService.setSelectedChatId(id);
  }

  searchQuery: string = '';
  filteredPersons: Person[] = [];

  filterPersons() {
    this.filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      person.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  updateLastMessageTimestamp(timestamp: string) {
    this.lastMessageTimestamp = timestamp;
  }


}
