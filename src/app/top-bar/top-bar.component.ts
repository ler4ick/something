import { Component, OnInit, Input } from '@angular/core';
import { persons } from '../persons';
import { ChatService } from '../chat.service';
import { TogglerService } from '../toggler.service';
import { ChatContainerComponent } from '../chat-container/chat-container.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  selectedChatId: number | null = null;
  name: string = 'Не';
  lastName: string = 'выбран';

  constructor(private chatService: ChatService,
              private togglerService: TogglerService
  ) {  }

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
  toggleChatList() {
    this.togglerService.toggleChatList();
  }

}
