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
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'pantau-sampah', loadChildren: './pages/pantau-sampah/pantau-sampah.module#PantauSampahPageModule' },
  { path: 'pantau-sungai', loadChildren: './pages/pantau-sungai/pantau-sungai.module#PantauSungaiPageModule' },
  { path: 'pantau-hutan', loadChildren: './pages/pantau-hutan/pantau-hutan.module#PantauHutanPageModule' },
  { path: 'pantau-investasi', loadChildren: './pages/pantau-investasi/pantau-investasi.module#PantauInvestasiPageModule' },
  { path: 'pantau-sampah-plastik', loadChildren: './pages/pantau-sampah-plastik/pantau-sampah-plastik.module#PantauSampahPlastikPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
