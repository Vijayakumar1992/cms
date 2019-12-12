import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
  // @Output() addMessageEvent = new EventEmitter<Message>();
  // currentSender: Contact;
  @ViewChild('subject', { static: false }) subjectInput: ElementRef;
  @ViewChild('msgText', { static: false }) messageInput: ElementRef;
  currentSender = { "_id": "5de828a231189734f8faaa16", "id": "250", "name": "David Aruldass", "email": "aru18002@byui.edu", "phone": "801-897-5432", "imageUrl": "https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/10645067_876038099075293_2947159966866304297_n.jpg?_nc_cat=107&_nc_ohc=35pCj8jB67YAQk1-pgzUWlMkUekK2wrClaoRMRCh7TRUW80IJi_11JLag&_nc_ht=scontent-sea1-1.xx&oh=1936c80debf1aa7c0a10d7e469e168e6&oe=5E7E48F4", "group": [] }

  constructor(private messageService: MessagesService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.messageInput.nativeElement.value;
    const newMessage = new Message('', '', subject, msgText, this.currentSender)
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }

}
