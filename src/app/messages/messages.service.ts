import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessagesService { 
  messageChangeEvent = new EventEmitter<Message[]>();

  private messages: Message[] = [];

  constructor(private http: HttpClient) { }

  getMessages() {
    // return this.messages.slice();
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (messageData) => {
          this.messages = messageData.messages;
          this.messageChangeEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
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

  initMessages() { }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    //make sure id of the new message is empty
    message.id = " ";
    const strMessage = JSON.stringify(message);

    //add to database
    this.http.post<{ title: string, message: Message }>('http://localhost:3000/messages', strMessage, { headers: headers })
      .subscribe(
        (messageInfor) => {
          this.messages.push(messageInfor.message);
        }),
      (error: any) => {
        console.log(error);
      };
  }
}
