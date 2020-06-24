import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagProdutoPageRoutingModule } from './pag-produto-routing.module';

import { PagProdutoPage } from './pag-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagProdutoPageRoutingModule
  ],
  declarations: [PagProdutoPage]
})
export class PagProdutoPageModule {}
