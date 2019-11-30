import { Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {
  contacts: Contact[] = [];
  contactSelectEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContacts() {
    this.http.get('https://davidcms-project.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.contactChangedEvent.next(this.contacts.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    let currentId = 0;

    for (let contact of this.contacts) {
      currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactListClone)
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }

  ngOnInit() { }

  storeContact() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('http://localhost:3000/contacts', this.contacts, { headers: header })
      .subscribe(
        (contacts: Contact[]) => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }
}
