import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatCurrentComponent } from './chat-current/chat-current.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
