import { Injectable,EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[];
  messageChangeEvent = new EventEmitter<Message[]>();

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  //functions are responsible
  //getting the list of messages and a single message respectively. 
  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id)
        return message;
    }
    return null;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  // addMessage(message: Message) {
  //   if (message === null) {
  //     return;
  //   }

  //   this.maxMessageId++;
  //   newMessage.id = String(this.maxMessageId);
  //   this.messages.push(message);
  //   // this.messageChangeEvent.emit(this.messages.slice());
  //   this.storeMessages();
  // }
  
}
