import { Component } from '@angular/core';
import { Content } from "./helper-files/content-interface";
import { ContentService } from "./PokemonService/content.service";
import { MessageServiceService } from "./Messages/message-service.service";

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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A-Chan-MyFavouritePokemon';
  individualPokemon?: Content;

   constructor(private pokemonService: ContentService, private messageService: MessageServiceService) {
   }

   ngOnInit(): void {
     this.pokemonService.getContentItem(2).subscribe(
       pokemonAtIndex => this.individualPokemon = pokemonAtIndex
     );
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
}
