import { Component, OnInit, MissingTranslationStrategy } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    // this.messages = this.messagesService.getMessages();
    this.messagesService.messageChangeEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      });
  }

  onAddMessage(message) {
    this.messages.push(message);
  }

}
