import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Content } from "../helper-files/content-interface";
import { ContentService} from "../PokemonService/content.service";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {MessageServiceService} from "../Messages/message-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogData {
  content: Content;
  tags: string;
  id: string;
}
@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.scss']
})
export class ModifyContentComponent implements OnInit {
  @Output() newPokemonEvent: EventEmitter<Content> = new EventEmitter<Content>();
  @Input() newPokemon: Content = { title: '', description: '', creator: ''}
  temptags: string = "";
  tempid: string = "";
  @Output() updatePokemonEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private pokemonService: ContentService, private messageService: MessageServiceService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyContentComponent, {
      width: '400px',
      data: this.newPokemon,
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      console.log('The dialog was closed.');
      if(result) {
        this.newPokemon = result.content;
        this.tempid = result.id;
        this.temptags = result.tags;
        this.modifyOrAddItemToParent();
      }
    })
  }

  modifyOrAddItemToParent():void {
    if(this.tempid !== "") {
      this.newPokemon.tags = this.temptags ? this.temptags.split(",") : [];
      this.newPokemon.id = parseInt(this.tempid);
      this.pokemonService.updateContent(this.newPokemon).subscribe(() => {
        this.updatePokemonEvent.emit();
        this.messageService.add("Content successfully updated, id" + this.newPokemon.id + ", title: " +
        this.newPokemon.title);
        this.newPokemon = { title: '', description: '', creator: '', imgURL: "", type: "", tags: []};
        this.tempid = "";
        this.temptags = "";
      });
    } else {
      this.newPokemon.tags = this.temptags ? this.temptags.split(",") : [];
      this.pokemonService.addContent(this.newPokemon).subscribe(newContentFromServer => {
        this.newPokemonEvent.emit(newContentFromServer);
        this.newPokemon = { title: '', description: '', creator: '', imgURL: "", type: "", tags: []};
        this.temptags = "";
      });
    }
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

@Component({
  selector: 'modify-content-dialog',
  templateUrl: 'modify-content.component.html'
})
export class ModifyContentDialogComponent {
  temptags: string = "";
  tempid: string = "";

  constructor(
    public dialogRef: MatDialogRef<ModifyContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTheDialogIsReceiving: Content,
  ) {
    this.tempid = String(dataTheDialogIsReceiving.id) ?? "";
    this.temptags = (dataTheDialogIsReceiving.tags ?? []).join();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendDataBack():void {
    this.dialogRef.close( {
      content: this.dataTheDialogIsReceiving,
      tags: this.temptags,
      id: this.tempid
    });
  }
}
