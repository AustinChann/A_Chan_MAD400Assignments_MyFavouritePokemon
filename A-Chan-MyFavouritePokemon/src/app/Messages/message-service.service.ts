import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push();
  }

  clear() {
    this.messages = [];
  }
}
