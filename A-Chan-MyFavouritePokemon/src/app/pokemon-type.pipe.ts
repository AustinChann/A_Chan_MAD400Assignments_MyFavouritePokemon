import { Pipe, PipeTransform } from '@angular/core';
import {Content} from "./helper-files/content-interface";

@Pipe({
  name: 'pokemonType'
})
export class PokemonTypePipe implements PipeTransform {

  transform(pokemonList: Content[], type?: string): Content[] {
    return pokemonList.filter(pokemon => {
      console.log("Pokemon name: ", pokemon.title, " type is set to ", pokemon.type);
      return type ? pokemon.type === type : (!pokemon.type || pokemon.type === '');
    });
  }

}
