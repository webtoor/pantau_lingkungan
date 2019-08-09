import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PantauSampahPlastikPage } from './pantau-sampah-plastik.page';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule}  from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  {
    path: '',
    component: PantauSampahPlastikPage
  }
];

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PantauSampahPlastikPage]
})
export class PantauSampahPlastikPageModule {}
