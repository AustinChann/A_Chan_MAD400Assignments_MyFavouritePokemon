import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from "../Messages/message-service.service";

@Component({
  selector: 'app-messages-component',
  templateUrl: './messages-component.component.html',
  styleUrls: ['./messages-component.component.css']
})
export class MessagesComponentComponent implements OnInit {

  constructor(public messageService: MessageServiceService) { }

  ngOnInit(): void {
  }

}
