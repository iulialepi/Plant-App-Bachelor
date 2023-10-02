import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'plants', loadChildren: ()=>import("../app/plant/plant.module").then(m=>m.PlantModule) },
  { path: 'login', loadChildren: ()=>import("../app/login/login.module").then(m=>m.LoginModule) },
  { path: 'plant-user', loadChildren: ()=>import("../app/plant-user/plant-user.module").then(m=>m.PlantUserModule) },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login/login'  //redirect towards a not found page, not the login. Create component not found
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
