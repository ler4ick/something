import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { persons } from '../persons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  persons = [...persons];

  constructor(private chatService: ChatService) { }
  ngOnInit() {
    // Ваш код инициализации компонента
  }

  onChatClick(id: number) {
    this.chatService.setSelectedChatId(id);
  }
}
