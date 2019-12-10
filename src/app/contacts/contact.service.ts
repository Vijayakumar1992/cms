import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];

  constructor(private http: HttpClient) { }


  sortAndSend() {
    this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (contactData) => {
          this.contacts = contactData.contacts;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  //getting the list of contacts and a single contact respectively. 
  getContact(id: string): Contact {
    console.log("contacts", this.contacts)
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    //make sure id of the new contacts is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const strContact = JSON.stringify(contact);


    //add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts', strContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }),
      (error: any) => {
        console.log(error);
      };
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    //set the if of the new contact to the id of the old contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers })
      .subscribe(
        (response: Contact) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }),
      (error: any) => {
        console.log(error);
      };
  }
}
