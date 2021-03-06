import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {

  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {

  }

  public init() {
    this.updates.versionUpdates.subscribe(event => {
      switch (event.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version : ${event.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${event.currentVersion.hash}`);
          console.log(`New app version ready for use: ${event.latestVersion.hash}`);
          let snackBarRef = this.snackbar.open("Update Available.", "Update");
          snackBarRef.onAction().subscribe(() => {
            this.updates.activateUpdate().then(() => document.location.reload());
          });
          break;
      }
    });
  }
}


