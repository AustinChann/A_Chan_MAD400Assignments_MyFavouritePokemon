import { Component, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { ContentService } from "../PokemonService/content.service";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
    pokemonArray: Content[];
    titleFound?: boolean;

  constructor(private pokemonService: ContentService) {
    this.pokemonArray = [];
  }

    ngOnInit(): void {
      this.pokemonService.getContent().subscribe(listOfPokemon => this.pokemonArray = listOfPokemon);
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

}
