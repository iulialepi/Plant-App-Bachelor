import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../login/services/user.service";
import {PlantUserService} from "../../../plant-user/services/plant-user.service";

@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-edit-dialog.component.html',
  styleUrls: ['./admin-edit-dialog.component.css']
})
export class AdminEditDialogComponent {
  alias = '';

  constructor(
    private dialogRef: MatDialogRef<AdminEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private plantUserService: PlantUserService
  ) {}

  onOkClick(): void {
    this.dialogRef.close(this.alias);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
