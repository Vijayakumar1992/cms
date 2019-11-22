import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  // transform(contacts: Contact[], term: string[]): any {
  //   let filteredArray: Contact[] = [];


  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.name.toLowerCase().includes(term)) {
        filteredArray.push(contact);
      }
    }

    if (filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;

    // if (term && term.length > 0) {
    //   contact = contacts.filter(
    //     contact.name.toLowerCase().includes(term.toLowerCase())
    //   );
    // }
    // return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}
