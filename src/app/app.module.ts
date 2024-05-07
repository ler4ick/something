import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatCurrentComponent } from './chat-current/chat-current.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ChatsListComponent,
    ChatContainerComponent,
    ChatCurrentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
