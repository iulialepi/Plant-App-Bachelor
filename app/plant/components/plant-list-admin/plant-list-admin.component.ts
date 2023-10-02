import { Component } from '@angular/core';
import {Plant} from "../../models/plant.model";
import {PlantService} from "../../services/plant.service";
import {MatDialog} from "@angular/material/dialog";
import {PlantUserService} from "../../../plant-user/services/plant-user.service";
import {UserService} from "../../../login/services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {PlantUser} from "../../../plant-user/model/plant-user.model";
import {
  UserPlantDeleteDialogComponent
} from "../../../plant-user/components/user-plant-delete-dialog/user-plant-delete-dialog.component";
import {EditAliasDialogComponent} from "../../../plant-user/components/edit-alias-dialog/edit-alias-dialog.component";
import {AdminDeleteDialogComponent} from "../admin-delete-dialog/admin-delete-dialog.component";


@Component({
  selector: 'app-plant-list-admin',
  templateUrl: './plant-list-admin.component.html',
  styleUrls: ['./plant-list-admin.component.css']
})
export class PlantListAdminComponent {
  public plants: Plant[] = [];
  public editPlant!: Plant;
  public deletePlant!: Plant;
  public filteredPlants: Plant[] = [];

  constructor(private plantService: PlantService,  private dialog: MatDialog,
              private plantUserService: PlantUserService, private userService: UserService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllPlants();
  }

  public getAllPlants(): void {
    this.plantService.getAllPlants().subscribe(
      (response: Plant[]) => {
        this.plants = response;
        this.filteredPlants = this.plants;
        // this.filteredPlants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPlant(key: string): void {
    console.log(key);
    const results: Plant[] = [];
    for (const plant of this.plants) {
      if (plant.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.commonName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.imageUrl.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.light.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.water.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.fertilize.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plant.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(plant);
      }
    }
    this.plants = results;
    if (results.length === 0 || !key) {
      this.getAllPlants();
    }
  }

  onSearch(text: string) {
    if (!text) {
      this.filteredPlants = this.plants;
    } else {
      this.filteredPlants = this.plants.filter(
        plant => plant.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  onDelete(plant: Plant) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent, {
      data: {plantName: plant.name}
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.plantService.deletePlant(plant.id).subscribe(
          () => {
            console.log('Plant deleted successfully');
            // Refresh your plant list or update UI as needed
            this.getAllPlants();
          },
          (error) => {
            console.error('Error deleting plant:', error);
          }
        );
      }
    });
  }

  onEditName(plant: Plant): void {
    const dialogRef = this.dialog.open(EditAliasDialogComponent, {
      width: '300px',
      data: { currentName: plant.name }
    });

    dialogRef.afterClosed().subscribe((newName: string | undefined) => {
      if (newName) {
        this.plantService.updatePlant({...plant, name: newName}).subscribe(() => {
          plant.name = newName;
        })
      }
    });
  }
}
