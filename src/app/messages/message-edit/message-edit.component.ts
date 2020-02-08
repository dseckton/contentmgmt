import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) messageInputRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "19";

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.messageInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const id = '1';
    let newMsg = new Message(id, subject, msgText, this.currentSender);
    // this.addMessageEvent.emit(newMsg);
    console.log(newMsg);
    this.messagesService.addMessage(newMsg);
  }

  onClear() {
    this.messageInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
