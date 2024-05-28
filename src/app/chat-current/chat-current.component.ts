import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { TimestampsService } from '../timestamps.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../rooms';
import { Message } from '../messages';
import { ChatApiService } from '../chat-api.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent {
  newMessage: string = '';
  messages: Message[] = [];
  timestamps: string[] = [];
  selectedChatId: number = 1;
  currentRoom: Room | null = null;

  constructor(private chatService: ChatService,
              private chatApiService: ChatApiService,
              private timestampsService: TimestampsService

  ) { this.loadMessages(); }

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

  loadMessages() {
    this.chatApiService.getMessages().subscribe(msgs => {
      this.messages = msgs;
    });
  }

  ngOnInit() {
    this.chatService.currentRoom$.subscribe(room => {
      this.currentRoom = room;
    });
  }

  @Output() messageSent = new EventEmitter<string>();

  // sendMessage() {
  //   if (this.newMessage && this.currentRoom) {
  //     const message: Message = {
  //       id: this.currentRoom.messages.length + 1,
  //       id_creator: 1, // assuming the current user has id 1
  //       id_room: this.currentRoom.id,
  //       date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  //       content: this.newMessage
  //     };
  //     this.chatService.sendMessage(message);
  //     this.timestampsService.setLastMessageTimestamp(message.date);
  //     this.timestampsService.setLastMessage(message.content);
  //     this.newMessage = '';
  //   }
  // }

  // sendMessage() {
  //   this.chatApiService.sendMessage(this.newMessage).subscribe(() => {
  //     this.newMessage = '';
  //     this.loadMessages();
  //   });
  // }

  sendMessage() {
    if (this.newMessage && this.currentRoom) {
      const message: Message = {
        id: this.currentRoom.messages.length + 1,
        id_creator: 1,
        id_room: this.currentRoom.id,
        date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
        content: this.newMessage
      };
      console.log(message);
      this.chatApiService.sendMessage(message)
        .pipe(
          tap(() => {
            this.timestampsService.setLastMessageTimestamp(message.date);
            this.timestampsService.setLastMessage(message.content);
            this.newMessage = '';
          }),
          catchError((error) => {
            console.error('УАААА:', error);
            return throwError(() => error); // Используйте новый синтаксис
          })
        )
        .subscribe({
          next: () => {
            console.log('Ушло успещно:');
          },
          error: (error) => {
            // Добавьте здесь логику обработки ошибок
            console.error('Ошибка отправки сообщения:', error);
          }
        });
    }
  }

  showMenu = false;
  selectedMessage: Message | undefined = undefined;
  contextMenuPosition = { x: 0, y: 0 };

  showContextMenu(event: MouseEvent, message: Message) {
    event.preventDefault();
    this.selectedMessage = message;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.showMenu = true;
  }

  hideContextMenu() {
    this.showMenu = false;
  }

  deleteMessage(message: Message) {
    // Логика для удаления сообщения
    if (this.currentRoom) {
      this.currentRoom.messages = this.currentRoom.messages.filter(msg => msg !== message);
    }
    this.hideContextMenu();
  }

  editMessage(message: Message) {
    // Логика для редактирования сообщения
    if (this.currentRoom) {
      const newContent = prompt("Введите новый текст сообщения:", message.content);
      if (newContent !== null) {
        message.content = newContent;
      }
    }
    this.hideContextMenu();
  }
}
