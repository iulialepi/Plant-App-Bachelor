import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../../login/services/user.service'; // Import UserService

@Component({
  selector: 'app-plant-add-dialog',
  templateUrl: './plant-add-dialog.component.html'
})
export class PlantAddDialogComponent {
  alias = '';
  isTerracotta = 'terracotta';

  constructor(
    private dialogRef: MatDialogRef<PlantAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  onOkClick(): void {
    const obj = {alias: this.alias, isTerracotta: this.isTerracotta};
    this.dialogRef.close(obj);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
