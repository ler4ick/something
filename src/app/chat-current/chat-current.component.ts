import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { TimestampsService } from '../timestamps.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent {

  selectedChatId: number = 1;

  constructor(private chatService: ChatService,
    private timestampsService: TimestampsService

  ) { }

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
  timestamps: string[] = [];

  @Output() messageSent = new EventEmitter<string>();


  sendMessage() {
    if (this.newMessage) {
      this.messages.push(this.newMessage);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      //this.newMessage = '';
      //this.lastMessageTimestamp.emit(timestamp); //чтобы отправлять время в другой компонент
      //this.messageSent.emit(timestamp);
      this.timestampsService.setLastMessageTimestamp(timestamp);
      this.timestamps.push(timestamp);
      this.newMessage = '';
    }
  }



}
