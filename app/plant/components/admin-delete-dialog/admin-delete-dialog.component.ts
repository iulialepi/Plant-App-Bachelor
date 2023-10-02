import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-delete-dialog',
  templateUrl: './admin-delete-dialog.component.html',
  styleUrls: ['./admin-delete-dialog.component.css']
})
export class AdminDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plantName: string }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
