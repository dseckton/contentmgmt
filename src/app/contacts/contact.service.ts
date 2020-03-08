import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  FBUrl: string = "https://cms-project-28f1e.firebaseio.com/contacts.json"

  constructor(private http: HttpClient) {
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

  getContacts(): any {
    // return this.contacts.slice();
    this.http.get<Contact[]>(this.FBUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log(contacts);
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(contacts.slice())
      }, (error: any) => {
        console.log(`Crap ${error}`);
      }
    )
  }

  addContact(newContact: Contact) {
    if (!newContact || newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if ((!originalContact || originalContact === null) || (!newContact || newContact === null)) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
