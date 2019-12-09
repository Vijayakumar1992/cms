import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})


export class MessageEditComponent implements OnInit {
  // @Output() addMessageEvent = new EventEmitter<Message>();
  // currentSender = "1";
  @ViewChild('subject', { static: false }) subjectInput: ElementRef;
  @ViewChild('msgText', { static: false }) messageInput: ElementRef;
  currentSender: string = "101";
// " dfdafsfs fd",
// "101",
// "David Aruldass",



//   );
  

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
}

onSendMessage() {
  const subject = this.subjectInput.nativeElement.value;
  const msgText = this.messageInput.nativeElement.value;
  const newMessage = new Message('1', subject, msgText, this.currentSender)
  this.messageService.addMessage(newMessage);
}

onClear() {
  this.subjectInput.nativeElement.value = '';
  this.messageInput.nativeElement.value = '';
}

}
