import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from "@angular/router";
import {ContentListComponent} from "./content-list/content-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/content",
    pathMatch: "fill"
  },
  {
    path: "content",
    component: ContentListComponent
  },
  {
    path: "content/:id",
    component: PokemonDetailsComponent
  },
  { path: "**", component: PageNotFoundComponent }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
