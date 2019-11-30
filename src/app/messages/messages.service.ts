import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();

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

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  initMessages() {

  }


  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('https://davidcms-project.firebaseio.com/messages.json', this.messages, { headers: header })
      .subscribe(
        (messages: Message[]) => {
          this.messageChangeEvent.next(this.messages.slice());
        }
      );
  }
}
