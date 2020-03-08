import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  FBUrl = "https://cms-project-28f1e.firebaseio.com/messages.json"

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.initMessages();
  }

  initMessages() {
    this.http.get<Message[]>(this.FBUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.emit(messages.slice())
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  storeMessages() {
    let messagesList = JSON.stringify(this.messages);
    this.http.put(this.FBUrl, messagesList, {headers: new HttpHeaders({'type': 'application/json'})}).subscribe(()=> {
      this.messageChangeEvent.emit(this.messages.slice())
    })
  }

  saveMessage() {
    this.storeMessages();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  getMaxId() {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
