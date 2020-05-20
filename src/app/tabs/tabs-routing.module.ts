import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from 'src/app/component/user-management/_providers'
import {Role} from 'src/app/component/user-management/_models'
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
        {
        path: 'home',
        children: [
          {
            path: 'admin',
            loadChildren: () =>  import('../modules/home/home.module').then(m => m.HomePageModule),
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin, Role.Doctor] }
          },
        {
            path: 'service-provider',
            loadChildren: () =>
              import('../component/track-time/track-time.module').then(m => m.TrackTimePageModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modules/chat/chat.module').then(m => m.chatPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modules/account/account.module').then(m => m.accountPageModule)
          }
        ]
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home/admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
