import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Content} from "../helper-files/content-interface";

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {
@Output() addPokemonEvent = new EventEmitter<Content>();

newPokemon?: Content;
pokemonAdded?: boolean;

  constructor() {
    let addPokemonPromise = new Promise((success, fail) => {
      this.pokemonAdded = true;
      if(this.pokemonAdded) {
        success( `${ this.newPokemon?.title } successfully added to the list!`);
      } else {
        this.pokemonAdded = false;
        fail("Pokemon was not added.")
      }
    });

    addPokemonPromise.then(
      resolve => console.log(resolve), error => console.log(error)
    );
  }

  ngOnInit(): void {
  }

  addPokemon(id: string, title: string, description: string, creator: string, imgURL?: string,
             type?: string, tags?: string): void {
    this.newPokemon = {
      id: parseInt(id),
      title: title,
      description: description,
      creator: creator,
      imgURL: imgURL,
      type: type,
      tags: tags?.split(",")
    };
    this.addPokemonEvent.emit(this.newPokemon);
  }
}
