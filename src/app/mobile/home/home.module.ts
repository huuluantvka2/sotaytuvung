import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "topics",
        pathMatch: "full"
      },
      {
        path: "topics",
        loadChildren: () => import("./topics/topics.module").then(m => m.TopicsModule)
      },
      {
        path: "settings",
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
    ]
  },
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
