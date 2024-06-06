import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ChatService } from '../chat.service';
import { TimestampsService } from '../timestamps.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../rooms';
import { Message } from '../messages';
import { ChatApiService } from '../chat-api.service';
import { AuthService } from '../auth.service';
import { SocketsService } from '../sockets.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss',
})
export class ChatCurrentComponent implements OnInit {
  newMessage: string = '';

  messages: Message[] = [];
  timestamps: string[] = [];
  selectedChatId: number = 1;
  currentRoom: Room | null = null;

  constructor(
    private chatService: ChatService,
    private socketsService: SocketsService,
    private chatApiService: ChatApiService,
    private authService: AuthService,
    private timestampsService: TimestampsService
  ) {}

  ngOnInit() {
    this.chatService.currentRoom$.subscribe((room) => {
      if (room) {
        this.currentRoom = room;
        this.socketsService.sendRoomId(room?.id);
        console.log(room?.id);
        this.messages = [];
      }
    });

    this.socketsService.getMessage().subscribe((message: Message) => {
      console.log(message);
      const newMessage: Message = {
        ...message,
        isSentByLoggedInUser:
          message.id_sender === this.authService.getUserId(),
      };
      this.messages = [...this.messages, newMessage];
    });

    this.socketsService.getMessages().subscribe((message: Message[]) => {
      const newMessages = message.map((msg) => {
        if (msg.id_sender === this.authService.getUserId()) {
          msg.isSentByLoggedInUser = true;
        } else {
          msg.isSentByLoggedInUser = false;
        }
        return msg;
      });

      console.log(newMessages);

      //this.messages.push(message);
      this.messages = [...newMessages];
      // this.func_isSender(message)
    });

    this.socketsService
      .listenToAnyMessageEdit()
      .subscribe((message: Message) => {
        console.log('edited message: ', message);

        const newMessages = this.messages.map((msg) => {
          if (msg.id === message.id) {
            return {
              ...message,
              isSentByLoggedInUser:
                msg.id_sender === this.authService.getUserId(),
            };
          }

          return msg;
        });

        this.messages = [...newMessages];
      });

    this.socketsService
      .listenToAnyMessageDelete()
      .subscribe((id: number | undefined) => {
        const newMessages = this.messages.filter((msg) => msg.id !== id);

        this.messages = [...newMessages];
      });
  }

  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    if (this.newMessage && this.currentRoom) {
      const message: Message = {
        id_sender: this.authService.getUserId()!,
        id_room: this.currentRoom.id,
        timestamp: new Date().toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        content: this.newMessage,
      };
      this.socketsService.sendMessage(message);
      this.timestampsService.setLastMessageTimestamp(message.timestamp); //не пашет
      this.timestampsService.setLastMessage(message.content);
      this.newMessage = '';
      console.log(message);
    }
  }

  // sendMessage() {
  // if (this.newMessage && this.currentRoom) {
  //   const message: Message = {
  //     id: this.currentRoom.messages.length + 1,
  //     id_creator: 1,
  //     id_room: this.currentRoom.id,
  //     date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  //     content: this.newMessage
  //   };
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

  deleteMessage(id: number | undefined) {
    // Логика для удаления сообщения
    if (this.currentRoom && id) {
      this.socketsService.deleteMessage(id);
    }
    this.hideContextMenu();
  }

  editMessage(message: Message) {
    const messageToEdit = {
      ...message,
    };
    // Логика для редактирования сообщения
    if (this.currentRoom) {
      const newContent = prompt(
        'Введите новый текст сообщения:',
        messageToEdit.content
      );
      if (newContent !== null) {
        messageToEdit.content = newContent;
        console.log('message to edit: ', messageToEdit);

        this.socketsService.editMessage(messageToEdit);
      }
    }
    this.hideContextMenu();
  }

  // Редактирование сообщения
}
