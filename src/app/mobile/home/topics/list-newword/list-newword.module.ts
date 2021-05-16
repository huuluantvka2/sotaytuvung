import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNewwordComponent } from './list-newword.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: ListNewwordComponent
  },
  {
    path: "add",
    component: AddComponent
  },
  {
    path: "detail",
    component: DetailComponent
  }
]

@NgModule({
  declarations: [ListNewwordComponent, AddComponent, DetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ListNewwordModule { }
