import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Content} from "../helper-files/content-interface";
import { ContentService} from "../PokemonService/content.service";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  id?: number;
  individualPokemon?: Content;
  constructor(private route: ActivatedRoute, private pokemonService: ContentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(!params.get('id')) {
        console.log("id not found");
      }
      this.id = Number(params.get('id') ?? "0");
      this.pokemonService.getContentItem(this.id).subscribe((singlePokemon) => {
        this.individualPokemon = singlePokemon;
      });
    });
  }

}
