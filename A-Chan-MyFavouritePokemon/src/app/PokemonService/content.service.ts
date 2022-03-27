import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { Content } from '../helper-files/content-interface';
import { POKEMONARRAY } from "../helper-files/contentDb";
import { MessageServiceService } from "../Messages/message-service.service";
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getContent(): Observable<Content[]> {
    console.log("Getting content from the server");
    return this.http.get<Content[]>("api/content");
  }

  addContent(newContentItem: Content): Observable<Content> {
    console.log("Adding new pokemon: ", newContentItem);
    return this.http.post<Content>("api/content", newContentItem, this.httpOptions);
  }

  // getContentItem(id: number): Observable<Content> {
  //   this.messageService.add(`Content item at id: ${id}`);
  //   return of(POKEMONARRAY[id]);
  // }

  updateContent(contentItem: Content): Observable<any> {
    return this.http.put("api/content", contentItem, this.httpOptions);
  }
}
