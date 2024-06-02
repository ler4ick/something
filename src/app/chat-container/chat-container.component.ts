import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatsListComponent } from '../chats-list/chats-list.component';
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {
  showChatList = true;

  constructor(private authService: AuthService) {
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

  id: number = 0;
  isLoggedIn: boolean = false;
  async login() {
    this.isLoggedIn = await this.authService.login(this.id);
  }

}
