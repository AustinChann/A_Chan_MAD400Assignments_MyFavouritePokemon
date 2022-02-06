import { Component } from '@angular/core';

interface Content {
  id: Number;
  title: String;
  description: String;
  creator: String;
  imgURL?: String;
  type?: String;
  tags?: String[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A-Chan-MyFavouritePokemon';

   constructor() {

     let honchkrow: Content;
     honchkrow = {
       id: 0,
       title: "Bird",
       description: "Crow pokemon",
       creator: "Game Freak",
       imgURL: "",
       type: "Flying/Dark",
       tags: ["Dark", "Flying", "Physical"]
     };

     this.displayContent(honchkrow);
   }

    displayContent(pokemon: Content): void {
     console.log("Testing console log", pokemon.description);
   }

}
