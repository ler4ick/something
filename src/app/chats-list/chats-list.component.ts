import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { TogglerService } from '../toggler.service';
import { persons } from '../persons';
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
              private togglerService: TogglerService
  ) {
    this.togglerService.showChatList$.subscribe(showChatList => {
      this.showChatList = showChatList;
    });
   }
  ngOnInit() {
    // Ваш код инициализации компонента
  }

  onChatClick(id: number) {
    this.chatService.setSelectedChatId(id);
  }
}
