import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlugarPageRoutingModule } from './alugar-routing.module';

import { AlugarPage } from './alugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlugarPageRoutingModule
  ],
  declarations: [AlugarPage]
})
export class AlugarPageModule {}
