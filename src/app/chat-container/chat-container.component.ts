import { Component, ViewChild } from '@angular/core';

import { ChatsListComponent } from '../chats-list/chats-list.component';
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

  selectedUserName: string = '';
  selectedUserLastname: string = '';

  onUserNameChanged(event: { name: string, lastName: string }) {
    this.selectedUserName = event.name;
    this.selectedUserLastname = event.lastName;
  }

}
