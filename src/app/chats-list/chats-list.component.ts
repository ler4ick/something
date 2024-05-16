import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { TogglerService } from '../toggler.service';
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
  constructor(private chatService: ChatService,
              private togglerService: TogglerService,
              private searchFilterService: SearchFilterService
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
    // Ваш код инициализации компонента
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
}
