import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Content } from "../helper-files/content-interface";
import { ContentService} from "../PokemonService/content.service";

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.css']
})
export class ModifyContentComponent implements OnInit {
  @Output() newPokemonEvent: EventEmitter<Content> = new EventEmitter<Content>();
  newPokemon?: Content;

  constructor(private pokemonService: ContentService) { }

  ngOnInit(): void {
  }

  addPokemon(name: string, description: string, creator: string, imageUrl: string, type: string, tags: string): void {
    this.newPokemon = {
      title: name,
      description: description,
      creator: creator,
      imgURL: imageUrl,
      type: type,
      tags:tags.split(",")
    };
    this.newPokemonEvent.emit(this.newPokemon);
  }
}
