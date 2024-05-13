import { Component } from '@angular/core';

import { persons } from '../persons';
@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  persons = [...persons];


}
