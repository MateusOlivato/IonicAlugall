import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagProdutoPage } from './pag-produto.page';

const routes: Routes = [
  {
    path: '',
    component: PagProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagProdutoPageRoutingModule {}
