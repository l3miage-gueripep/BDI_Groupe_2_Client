import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { canActivateUser } from './services/permissions.service';
import { UserComponent } from './authentication/user/user.component';


const routes: Routes = [{ path: 'register', component: RegisterComponent,}, {path: 'user', component: UserComponent, canActivate: [canActivateUser]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
