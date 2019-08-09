import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PantauHutanPage } from './pantau-hutan.page';

const routes: Routes = [
  {
    path: '',
    component: PantauHutanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PantauHutanPage]
})
export class PantauHutanPageModule {}
