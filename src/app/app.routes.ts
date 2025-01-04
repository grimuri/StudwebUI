import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/ui/register/register.component';
import { RegistrationSuccessComponent } from './authentication/ui/registration-success/registration-success.component';
import { LoginComponent } from './authentication/ui/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'registration-success',
        component: RegistrationSuccessComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
