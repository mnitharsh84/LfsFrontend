import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from 'src/app/component/user-management/_providers'
import {Role} from 'src/app/component/user-management/_models'
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
        path: 'subcategory',
        loadChildren: () => import('./component/subcategory/subcategory.module').then( m => m.SubcategoryPageModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Doctor] }

  },
  {
    path: 'login',
    loadChildren: () => import('./component/user-management/login/login.module').then( m => m.LoginPageModule)
  },
    {
    path: 'logout',
    loadChildren: () => import('./component/user-management/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./component/user-management/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dar',
    loadChildren: () => import('./component/dar/dar.module').then( m => m.DarPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Doctor] }
  },
  {
    path: 'select-provider',
    loadChildren: () => import('./component/select-provider/select-provider.module').then( m => m.SelectProviderPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./component/order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'booking-confirmation',
    loadChildren: () => import('./component/booking-confirm-popup/booking-confirm-popup.module').then( m => m.BookingConfirmPopupModule)
  },
  {
        path: 'about-service',
    loadChildren: () => import('./component/about-service/about-service.module').then( m => m.AboutServicePageModule)
  },
   {
     path: 'rating',
     loadChildren: () => import('./component/rating/rating.module').then( m => m.RatingPageModule)
   },
  
   {
     path: 'send-photo',
     loadChildren: () => import('./component/send-photo/send-photo.module').then( m => m.SendPhotoPageModule)
   }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
