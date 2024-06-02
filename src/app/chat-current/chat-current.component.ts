import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { TimestampsService } from '../timestamps.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../rooms';
import { Message } from '../messages';
import { ChatApiService } from '../chat-api.service';
import { SocketsService } from '../sockets.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent implements OnInit {
  message: string =''; //тестовое
  newMessage: string = '';
  messages_test: string[] = []; //тестовое
  messages: Message[] = [];
  timestamps: string[] = [];
  selectedChatId: number = 1;
  currentRoom: Room | null = null;

  constructor(private chatService: ChatService,
              private socketsService: SocketsService,
              private chatApiService: ChatApiService,
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

  // loadMessages() {
  //   this.socketsService.getMessages().subscribe(msg => {
  //     this.messages_test.push(msg);
  //   });
  // }

  ngOnInit() {
    this.chatService.currentRoom$.subscribe(room => {
      this.currentRoom = room;
    });
    this.socketsService.getMessages().subscribe((message: string) => {
      this.messages_test.push(message);
      console.log(message);

    });
  }

  @Output() messageSent = new EventEmitter<string>();

  sendMessage(){
    console.log(this.message);
    this.socketsService.sendMessage(this.message);
    this.message = '';
  }

  // sendMessage() {
  //   if (this.newMessage && this.currentRoom) {
  //     const message: Message = {
  //       id: this.currentRoom.messages.length + 1,
  //       id_creator: 1,
  //       id_room: this.currentRoom.id,
  //       date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  //       content: this.newMessage
  //     };
  //     console.log(message);
  //     this.chatApiService.sendMessage(message)
  //       .pipe(
  //         tap(() => {
  //           this.timestampsService.setLastMessageTimestamp(message.date);
  //           this.timestampsService.setLastMessage(message.content);
  //           this.newMessage = '';
  //         }),
  //         catchError((error) => {
  //           console.error('УАААА:', error);
  //           return throwError(() => error); // Используйте новый синтаксис
  //         })
  //       )
  //       .subscribe({
  //         next: () => {
  //           console.log('Ушло успещно:');
  //         },
  //         error: (error) => {
  //           // Добавьте здесь логику обработки ошибок
  //           console.error('Ошибка отправки сообщения:', error);
  //         }
  //       });
  //   }
  // }

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
