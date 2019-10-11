import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'email', 'This is a test mesasge ', 'David'),
    new Message('1', 'email', 'This is a test mesasge ', 'Daniel'),
    new Message('1', 'email', 'This is a test mesasge ', 'Tim')
  ]

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
