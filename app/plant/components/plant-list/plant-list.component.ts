import {Component, OnInit} from '@angular/core';
import {Plant} from "../../models/plant.model";
import {PlantService} from "../../services/plant.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlantAddDialogComponent} from '../plant-add-dialog/plant-add-dialog.component';
import {PlantUserService} from "../../../plant-user/services/plant-user.service";
import {UserService} from '../../../login/services/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  public plants: Plant[] = [];
  public editPlant!: Plant;
  public deletePlant!: Plant;

  constructor(private plantService: PlantService, private dialog: MatDialog,
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

  onAdd(plant: Plant) {
    const dialogRef = this.dialog.open(PlantAddDialogComponent, {
      data: {plant: plant, plantListComponent: this}
    });

    dialogRef.afterClosed().subscribe((aliasAndIsTerracotta: any) => {
      if (aliasAndIsTerracotta) {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
          this.plantUserService.addPlantToUser(currentUser?.id, plant.id,
            aliasAndIsTerracotta.alias, aliasAndIsTerracotta.isTerracotta === 'terracotta' ).subscribe(
            () => {
              this.router.navigateByUrl('/plant-user/plant-list-user');
              this.snackBar.open("Plant added successfully!", "OK", {duration: 8000});
              dialogRef.close();
            },
            (error) => {
              this.snackBar.open("Error adding plant!", "OK", {duration: 8000});
              dialogRef.close();
            }
          );
        }
      }
      dialogRef.close();
    });
  }

  // public onDeletePlant(plantId: number): void {
  //   this.plantService.deletePlant(plantId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getAllPlants();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  onClassify(): void {
    this.router.navigate(['/plant-user/image-classification']);
  }
}

