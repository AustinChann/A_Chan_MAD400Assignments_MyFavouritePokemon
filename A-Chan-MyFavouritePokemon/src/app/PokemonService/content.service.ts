import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { Content } from '../helper-files/content-interface';
import { POKEMONARRAY } from "../helper-files/contentDb";
import { MessageServiceService } from "../Messages/message-service.service";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private messageService: MessageServiceService) { }

  getContent(): Observable<Content[]> {
    this.messageService.add("Content array loaded.");
    return of(POKEMONARRAY);
  }

  getContentItem(id: number): Observable<Content> {
    this.messageService.add(`Content item at id: ${id}`);
    return of(POKEMONARRAY[id]);
  }

}
