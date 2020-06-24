import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlugarPage } from './alugar.page';

const routes: Routes = [
  {
    path: '',
    component: AlugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlugarPageRoutingModule {}
