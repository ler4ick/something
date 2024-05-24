import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { TimestampsService } from '../timestamps.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../rooms';
import { Message } from '../messages';

@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent {
  newMessage: string = '';
  messages: string[] = [];
  timestamps: string[] = [];
  selectedChatId: number = 1;
  currentRoom: Room | null = null;

  constructor(private chatService: ChatService,
              private timestampsService: TimestampsService

  ) { }

  // ngOnInit() {
  //   this.chatService.selectedChatId$.subscribe(id => {
  //     if (id !== null) {
  //       this.selectedChatId = id;
  //     } else {
  //       // Обработка случая, когда id равно null
  //       // Например, можно присвоить переменной значение по умолчанию
  //       this.selectedChatId = 0; // Или любое другое значение по умолчанию
  //     }
  //   });
  // }

  ngOnInit() {
    this.chatService.currentRoom$.subscribe(room => {
      this.currentRoom = room;
    });
  }

  @Output() messageSent = new EventEmitter<string>();


  // sendMessage() {
  //   if (this.newMessage) {
  //     this.messages.push(this.newMessage);
  //     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  //     //вот эти двое отправляют в список чатов последнее сообщение и его метку времени
  //     this.timestampsService.setLastMessageTimestamp(timestamp);
  //     this.timestampsService.setLastMessage(this.newMessage);
  //     this.timestamps.push(timestamp);  //постится временная метка в current-chat
  //     this.newMessage = '';  //очистка поля после отправки сообщения
  //   }
  // }

  sendMessage() {
    if (this.newMessage && this.currentRoom) {
      const message: Message = {
        id: this.currentRoom.messages.length + 1,
        id_creator: 1, // assuming the current user has id 1
        id_room: this.currentRoom.id,
        date: new Date().toLocaleString(),
        content: this.newMessage
      };
      this.chatService.sendMessage(message);
      this.timestampsService.setLastMessageTimestamp(message.date);
      this.timestampsService.setLastMessage(message.content);
      this.newMessage = '';
    }
  }



}
