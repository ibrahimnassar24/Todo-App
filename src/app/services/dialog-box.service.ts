import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(title: string, url?: string) {
    const dialogRef = this.dialog.open(
      DialogComponent,
      {
        data:{ title, url, value:""}
      }
    );

    return new Promise<string>( (resolve, reject) => {
      dialogRef
      .afterClosed()
      .subscribe( res => resolve(res));
    });
  }
}
