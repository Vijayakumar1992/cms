import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = '';
  canEdit: Boolean = false;
  
  constructor(private contactService: ContactService, private messageService: MessagesService) { }

  ngOnInit() {    
    this.contactService.contactChangedEvent.subscribe(() => {
      let contact: Contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact.name;
    });    
  }
}
