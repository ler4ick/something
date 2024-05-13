import { Component, OnInit } from '@angular/core';
import { persons } from '../persons';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  selectedChatId: number | null = null;
  name: string = 'Не';
  lastName: string = 'выбран';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.selectedChatId$.subscribe(chatId => {
      this.selectedChatId = chatId;
      this.loadUserName();
    });
  }

  loadUserName() {
    if (this.selectedChatId !== null) {
      const user = persons.find(person => person.id === this.selectedChatId);
      if (user) {
        this.lastName = user.lastname;
        this.name = user.name;
      } else {
        this.lastName = '';
        this.name = '';
      }
    }
  }

}
