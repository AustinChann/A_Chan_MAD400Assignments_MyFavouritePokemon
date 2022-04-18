import { Component, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { ContentService } from "../PokemonService/content.service";
import { MessageServiceService} from "../Messages/message-service.service";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
    pokemonArray: Content[];
    titleFound?: boolean;

  constructor(private pokemonService: ContentService, private messageService: MessageServiceService) {
    this.pokemonArray = [];
  }

    ngOnInit(): void {
      this.getContentFromServer();
      //this.pokemonService.getContent().subscribe(listOfPokemon => this.pokemonArray = listOfPokemon);
    }

    checkForTitle(title: string) {
      if (this.pokemonArray.some(p => p.title === title)) {
        this.titleFound = true;
      } else {
        this.titleFound = false;
      }
      if(this.pokemonArray.filter(p => p.title === title).length) {
        this.titleFound = true;
      } else {
        this.titleFound = false;
      }
    }

    getContentFromServer(): void {
      this.pokemonService.getContent().subscribe(pokemonarray => {
        this.messageService.add(`Got the content from the server: ${pokemonarray}`);
        this.pokemonArray= pokemonarray;
      });
    }

    //id will be set by the server if newContentItem doesn't have one
    addPokemonToList(newContentItem: Content): void {
      this.pokemonService.addContent(newContentItem).subscribe(newContentFromServer => {
        this.messageService.add("Content added and came back from the server!");

        //
        this.getContentFromServer();

        // more efficient, but potentially misses other server updates to the content
        // this.pokemonsters.push(newContentFromServer);
        // this.pokemonsters = [...this.pokemonsters]; // using the spread operator
      });
    }

    updatePokemonInList(contentItem: Content): void {
      this.pokemonService.updateContent(contentItem).subscribe(() => {
        this.messageService.add("Content updated successfully.");
        this.getContentFromServer();
      });
    }
}
