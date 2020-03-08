import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredContacts: Contact[] = [];
    // for (let contact of contacts) {
    //   if (contact.name.toLowerCase().includes(term)) {
    //     filteredContacts.push(contact);
    //   }
    // }
    // if (filteredContacts.length < 1) {
    //   return contacts;
    // }
    // return filteredContacts;
    if (!term) {
      return contacts;
    }
    console.log(term);
    filteredContacts = contacts.filter((contact: any) => {
      contact.name.toLowerCase().includes(term.toLowerCase());
    });
    if (filteredContacts.length < 1) {
      return contacts;
    }
    return filteredContacts;
  }
  
}
