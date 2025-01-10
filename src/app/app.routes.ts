import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/ui/register/register.component';
import { RegistrationSuccessComponent } from './authentication/ui/registration-success/registration-success.component';
import { LoginComponent } from './authentication/ui/login/login.component';
import { AppComponent } from './app.component';
import { NoteComponent } from './notes/ui/note/note.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { StartComponent } from './ui/start/start.component';
import { MenuComponent } from './ui/menu/menu.component';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'registration-success',
    component: RegistrationSuccessComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'note',
        component: NoteComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
