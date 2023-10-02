import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlantListComponent} from "./components/plant-list/plant-list.component";
import {PlantListAdminComponent} from "./components/plant-list-admin/plant-list-admin.component";
import {ImageClassificationComponent} from "../plant-user/components/image-classification/image-classification.component";

const routes: Routes = [
  {path:"plant-list-all", component: PlantListComponent},
  {path:"plant-list-admin", component: PlantListAdminComponent},
  {path:"image-classification", component: ImageClassificationComponent}
];
//can mai adaug componente vin aici in plant-routing si scriu ca in asta de mai sus

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantRoutingModule { }
