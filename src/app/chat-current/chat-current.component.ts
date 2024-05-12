import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrl: './chat-current.component.scss'
})
export class ChatCurrentComponent {

  @Input() dialogId: number | null = null;
  message: string = '';

  sendMessage() {
    // Ваш код для обработки отправки сообщения
    console.log(this.message);
    // Очистка поля ввода
    this.message = '';
  }

}
