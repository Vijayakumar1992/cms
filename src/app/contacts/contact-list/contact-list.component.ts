import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[];
  
  // = [
  //   new Contact("1", "R. Kent Jackson", "208-496-3771", "jacksonk@byui.edu", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", null),
  //   new Contact("2", "R. Barzee", "208-496-3768", "bareer@byui.edu", "https://web.byui.edu/Directory/Employee/barzeer.jpg", null)
  // ];


  // onSelected(contact: Contact) {
  //   this.selectedContactEvent.emit(contact);
  // }


  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }


  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact)
  }

}