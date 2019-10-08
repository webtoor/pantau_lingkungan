import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate : [AuthGuardService]
  },
  /* { path: 'pantau-sampah', loadChildren: './pages/pantau-sampah/pantau-sampah.module#PantauSampahPageModule', canActivate : [AuthGuardService] },
  { path: 'pantau-sungai', loadChildren: './pages/pantau-sungai/pantau-sungai.module#PantauSungaiPageModule', canActivate : [AuthGuardService] },
  { path: 'pantau-hutan', loadChildren: './pages/pantau-hutan/pantau-hutan.module#PantauHutanPageModule', canActivate : [AuthGuardService] },
  { path: 'pantau-investasi', loadChildren: './pages/pantau-investasi/pantau-investasi.module#PantauInvestasiPageModule', canActivate : [AuthGuardService] },
  { path: 'pantau-sampah-plastik', loadChildren: './pages/pantau-sampah-plastik/pantau-sampah-plastik.module#PantauSampahPlastikPageModule', canActivate : [AuthGuardService] }, */
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'loader', loadChildren: './pages/loader/loader.module#LoaderPageModule', canActivate : [AuthGuardService] },
  { path: 'akun', loadChildren: './pages/akun/akun.module#AkunPageModule', canActivate : [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
