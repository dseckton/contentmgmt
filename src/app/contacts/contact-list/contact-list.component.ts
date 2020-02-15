import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    // new Contact("1", "Bro. Jackson", "jacksonk@byui.edu", "208-496-3771", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", null),
    // new Contact("2", "Bro. Barzee", "barzeer@byui.edu", "208-496-3768", "https://web.byui.edu/Directory/Employee/barzeer.jpg", null),
    // new Contact("1", "Bro. Thayne", "thayneti@byui.edu", "208-496-", "https://web.byui.edu/Directory/Employee/thayneti.jpg", null)
  ];


  constructor(private contactService: ContactService) { }

  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts)=>{this.contacts = contacts})
  }

}
