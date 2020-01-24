import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() 

  messages: Message[] = [
    new Message('1', 'Is this thing on?', 'Ignore this, just testing.', 'Daniel Eckton'),
    new Message('2', 'Yeah', "I think it's working. Great!", 'Daniel Eckton'),
    new Message('3', 'Well', 'I thought it was working...', 'Daniel Eckton')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
