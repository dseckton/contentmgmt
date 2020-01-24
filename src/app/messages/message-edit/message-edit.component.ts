import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) messageInputRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Daniel Eckton";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.messageInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const msgId = '1';
    const newMsg = new Message(msgId, subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMsg);
    console.log(newMsg);
  }

  onClear() {
    this.messageInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
