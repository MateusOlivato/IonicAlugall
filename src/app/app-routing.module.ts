import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'pag-produto',
    loadChildren: () => import('./pag-produto/pag-produto.module').then( m => m.PagProdutoPageModule)
  },
  {
    path: 'anuncios',
    loadChildren: () => import('./anuncios/anuncios.module').then( m => m.AnunciosPageModule)
  },
  {
    path: 'add-produto',
    loadChildren: () => import('./add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'alugar',
    loadChildren: () => import('./alugar/alugar.module').then( m => m.AlugarPageModule)
  },
  {
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
