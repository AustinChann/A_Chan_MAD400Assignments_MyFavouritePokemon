import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { ContentListComponent } from './content-list/content-list.component';
import { PokemonTypePipe } from './pokemon-type.pipe';
import { HoverEffectDirective } from './hover-effect.directive';
import { MessagesComponentComponent } from './messages-component/messages-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentCardComponent,
    ContentListComponent,
    PokemonTypePipe,
    HoverEffectDirective,
    MessagesComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
