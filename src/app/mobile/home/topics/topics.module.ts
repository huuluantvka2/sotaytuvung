import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './topics.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: "",
    component: TopicsComponent
  },
  {
    path: "list",
    loadChildren: () => import('./list-newword/list-newword.module').then(m => m.ListNewwordModule)
  }
]

@NgModule({
  declarations: [TopicsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ]
})
export class TopicsModule { }
