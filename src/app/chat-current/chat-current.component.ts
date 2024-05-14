import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent {

  selectedChatId: number = 1;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.selectedChatId$.subscribe(id => {
      if (id !== null) {
        this.selectedChatId = id;
      } else {
        // Обработка случая, когда id равно null
        // Например, можно присвоить переменной значение по умолчанию
        this.selectedChatId = 0; // Или любое другое значение по умолчанию
      }
    });
  }

  newMessage: string = '';
  messages: string[] = [];

  sendMessage() {
    if (this.newMessage) {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }


}
