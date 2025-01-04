import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../data-access/authentication.service';
import { LoginUser } from '../../model/login-user';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  constructor(public formBuilder: FormBuilder){}

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // });

  loginUser: LoginUser = {
    email: '',
    password: ''
  };

  errors = new Map<string, string>();

  validateForm(): void {
    // email validation
    if (this.loginForm.value.email == '') {
      this.errors.set("email", "Email mustn't be empty");
    } else if (!this.loginForm.value.email?.match(RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))) {
      this.errors.set("email", "Email must be valid");
    }
    else {
      this.errors.delete('email');
    }

    // password validation
    if (this.loginForm.value.password == '') {
      this.errors.set("password", "Password mustn't be empty");
    } else {
      this.errors.delete('password');
    }

    // backend returns errors
    if (this.errors.has('main')) {
      this.errors.delete('main');
    }

    if (this.errors.size == 0) {
      this.login();
    }
  }

  login(): void {
    this.loginUser.email = this.loginForm.value.email ?? '';
    this.loginUser.password = this.loginForm.value.password ?? '';

    this.authenticationService.login(this.loginUser).subscribe({
      next: (response) => {
        console.log("Odpowiedz: ", response);
        localStorage.setItem('token', response.token);

        const user: User = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          birthday: response.birthday
        };
        localStorage.setItem('user', JSON.stringify(user));     

        this.loginForm.reset();
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error.status === 409) {
          if (error.error.errorCodes[0] === "User.IncorrectData") {
            this.errors.set("main", error.error.detail);
          }
        }
        console.error("Błąd: ", error);
      }
    });
    
  }
}
