import { Routes } from '@angular/router';
import { AdminComponent } from '../app/login-module/admin/admin.component';
import { HeaderModuleComponent } from './header-module/header-module.component';
import { UserModuleComponent } from '../app/login-module/admin/user-component-module/user-module.component';
import { LoginComponent } from '../app/login-module/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
      //path: 'login', component: AdminComponent,
        path: 'login', component: LoginComponent
    },
    {
    path: 'userprofile', component: HeaderModuleComponent, canActivate:[AuthGuard]
    },
    {
    path: '', redirectTo: '/login', pathMatch: 'full'
}
];
