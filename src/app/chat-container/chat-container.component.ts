import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {
  showChatList = true;

  constructor() {
    // Инициализация свойства showChatList
    this.showChatList = true;
  }

  toggleChatList() {
    this.showChatList = !this.showChatList;
  }
}
