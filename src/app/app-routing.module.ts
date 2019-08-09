import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'pantau-sampah', loadChildren: './pantau-sampah/pantau-sampah.module#PantauSampahPageModule' },
  { path: 'pantau-sungai', loadChildren: './pantau-sungai/pantau-sungai.module#PantauSungaiPageModule' },
  { path: 'pantau-hutan', loadChildren: './pantau-hutan/pantau-hutan.module#PantauHutanPageModule' },
  { path: 'pantau-investasi', loadChildren: './pantau-investasi/pantau-investasi.module#PantauInvestasiPageModule' },
  { path: 'pantau-sampah-plastik', loadChildren: './pantau-sampah-plastik/pantau-sampah-plastik.module#PantauSampahPlastikPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
