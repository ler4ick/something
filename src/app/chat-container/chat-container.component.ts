import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { Room } from '../rooms';
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
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

  onUserNameChanged(event: { name: string; lastName: string }) {
    this.selectedUserName = event.name;
    this.selectedUserLastname = event.lastName;
  }

  id: number | null = 0;
  isLoggedIn: boolean = false;
  async login() {
    this.isLoggedIn = await this.authService.login(this.id ?? -1);
  }

  getUsername() {
    return this.authService.getUsername();
  }
}
