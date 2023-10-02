import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantRoutingModule } from './plant-routing.module';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import {MenuBarComponent} from "../menu-bar/menu-bar.component";
import {MatCardModule} from "@angular/material/card";
import { PlantAddDialogComponent } from './components/plant-add-dialog/plant-add-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { PlantListAdminComponent } from './components/plant-list-admin/plant-list-admin.component';
import {MatRadioModule} from "@angular/material/radio";
import { AdminDeleteDialogComponent } from './components/admin-delete-dialog/admin-delete-dialog.component';
import { AdminEditDialogComponent } from './components/admin-edit-dialog/admin-edit-dialog.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    declarations: [
        PlantListComponent,
        MenuBarComponent,
        PlantAddDialogComponent,
        PlantListAdminComponent,
        AdminDeleteDialogComponent,
        AdminEditDialogComponent,
    ],
    exports: [
        PlantListComponent,
        MenuBarComponent
    ],
  imports: [
    CommonModule,
    PlantRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class PlantModule { }
