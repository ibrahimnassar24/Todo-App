import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import {
  ReactiveFormsModule,
  FormControl
} from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface dialogData {
  title: string;
  value: string | null | undefined;
}

@Component({
  selector: 'app-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  dialogRef = inject(MatDialogRef<DialogComponent>);
  data = inject<dialogData>(MAT_DIALOG_DATA);
value = new FormControl(this.data.value);

  onClose() {
    this.dialogRef.close()
  }

  onConfirm() {
    this.dialogRef.close(this.value.value);
  }
}
