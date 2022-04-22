import {ApplicationRef, Component} from '@angular/core';
import { Content } from "./helper-files/content-interface";
import { ContentService } from "./PokemonService/content.service";
import { MessageServiceService } from "./Messages/message-service.service";
import {LogUpdateService} from "./log-update.service";
import {SwUpdate} from "@angular/service-worker";
import {concat, first, interval} from "rxjs";

// interface Content {
//   id: Number;
//   title: String;
//   description: String;
//   creator: String;
//   imgURL?: String;
//   type?: String;
//   tags?: String[];
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'A-Chan-MyFavouritePokemon';
  pokemonArray: Content[];
  individualPokemon?: Content;

   constructor(private pokemonService: ContentService, private messageService: MessageServiceService,
               private logService: LogUpdateService, private appRef: ApplicationRef, private updates: SwUpdate) {
     this.pokemonArray = [];
   }

   ngOnInit(): void {
     this.pokemonService.getContentItem(2).subscribe(
       pokemonAtIndex => this.individualPokemon = pokemonAtIndex
     );
     this.logService.init();

     const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
     const everyHalfHour$ = interval(1 * 60 * 30 * 1000);
     const everyHalfHourOnceAppIsStable$ = concat(appIsStable$, everyHalfHour$);

     everyHalfHourOnceAppIsStable$.subscribe(() => {
       this.updates.checkForUpdate();
     });
   }

   displayPokemon(id: string): void {
     if(!parseInt(id)) {
       this.messageService.add("Please enter a number value.");
       return;
     }
     let idNumber = parseInt(id);
     this.pokemonService.getContent().subscribe(pokemonArray => {
       let pokemonInArray = pokemonArray.find(individualPokemon => individualPokemon.id === idNumber);
       if(!pokemonInArray) {
         this.messageService.add("Please enter a number value for a valid id.");
       } else {
         this.individualPokemon = pokemonInArray;
       }
     });
   }

  getContentFromServer(): void {
    this.pokemonService.getContent().subscribe(pokemonarray => {
      this.messageService.add(`Got the content from the server: ${pokemonarray}`);
      this.pokemonArray= pokemonarray;
    });
  }

  addPokemonToList(newContentItem: Content): void {
    this.pokemonService.addContent(newContentItem).subscribe(newContentFromServer => {
      this.messageService.add("Content added and came back from the server!");

      this.getContentFromServer();

      // more efficient, but potentially misses other server updates to the content
      // this.pokemonsters.push(newContentFromServer);
      // this.pokemonsters = [...this.pokemonsters]; // using the spread operator
    });
  }
}
