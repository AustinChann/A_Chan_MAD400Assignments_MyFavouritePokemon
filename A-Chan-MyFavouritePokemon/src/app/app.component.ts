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
   }

}
