import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact-model';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact('2', 'R. Barzee', 'bareer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];
  

    constructor() {
      // @Output() selectedContactEvent = new EventEmitter<contact>();
    }
  


  // onSelected(contact: Contact) {
  //   this.selectedContactEvent.emit(contact);
  // }


  ngOnInit() {
  }

}
