import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent, dialogData } from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-btn',
  imports: [
    MatButtonModule
  ],
  templateUrl: './edit-btn.component.html',
  styleUrl: './edit-btn.component.scss'
})
export class EditBtnComponent {
  @Input() data!: dialogData;
  @Input() action!: (arg: string) => void;

  constructor(
    private matDialog: MatDialog
  ) { }

  onOpen() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: this.data
    });

    dialogRef
      .afterClosed()
      .subscribe(this.action);
  }
}
