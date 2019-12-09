import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService { 
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) { }


  sortAndSend() {
    this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (contactData) => {
          console.log("testing");
          this.contacts = contactData.contacts;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  
  // getContacts() {
  //   this.http.get('https://davidcms-project.firebaseio.com/contacts.json')
  //     .subscribe(
  //       (contacts: Contact[]) => {
  //         this.contacts = contacts;
  //         this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
  //         this.contactChangedEvent.next(this.contacts.slice());
  //       }, (error: any) => {
  //         console.log('something bad happened...');
  //       }
  //     );
  // }

  //getting the list of contacts and a single contact respectively. 
  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  // getContact(id: string): Contact {
  //   for (const contact of this.contacts) {
  //     if (contact.id === id) {
  //       return contact;
  //     }
  //   }
  //   return null;
  // }


  
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


  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.next(this.contacts.slice());
  // }

  // getMaxId(): number {
  //   let maxId = 0;
  //   let currentId = 0;

  //   for (let contact of this.contacts) {
  //     currentId = parseInt(contact.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //     return maxId;
  //   }
  // }

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

  // addContact(newContact: Contact) {
  //   if (!newContact) {
  //     return;
  //   }

  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   const contactListClone = this.contacts.slice();
  //   this.contactChangedEvent.next(contactListClone)
  // }

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

    const headers = new HttpHeaders({'Content-Type': 'application/json'});    

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


  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (!originalContact) {
  //     return;
  //   }

  //   const pos = this.contacts.indexOf(originalContact)
  //   if (pos < 0) {
  //     return;
  //   }

  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   const contactsListClone = this.contacts.slice();
  //   this.contactChangedEvent.next(contactsListClone);
  // } 
  
}
