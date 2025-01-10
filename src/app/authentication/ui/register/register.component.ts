import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../data-access/authentication.service';
import { RegisterUser } from '../../model/register-user';
import { Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    birthday: new FormControl(new Date()),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    termsAndConditions: new FormControl(false),
  });

  newUser: RegisterUser = {
    firstName: '',
    lastName: '',
    email: '',
    birthday: new Date(),
    password: '',
    confirmPassword: ''
  };

  errors = new Map<string, string>();

  validateForm(): void {
    // first name validation
    if (this.registerForm.value.firstName == '') {
      this.errors.set("firstName", "mustn't be empty");
    } else if (this.registerForm.value.firstName?.match(RegExp('[0-9]'))) {
      this.errors.set("firstName", "mustn't contains numbers");
    }
    else {
      this.errors.delete('firstName');
    }

    // last name validation
    if (this.registerForm.value.lastName == '') {
      this.errors.set("lastName", "mustn't be empty");
    } else if (this.registerForm.value.lastName?.match(RegExp('[0-9]'))) {
      this.errors.set("lastName", "mustn't contains numbers");
    }
    else {
      this.errors.delete('lastName');
    }

    // email validation
    if (this.registerForm.value.email == '') {
      this.errors.set("email", "mustn't be empty");
    } else if (!this.registerForm.value.email?.match(RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))) {
      this.errors.set("email", "must be valid");
    }
    else {
      this.errors.delete('email');
    }

    // birthday validation
    if (this.registerForm.value.birthday == null) {
      this.errors.set("birthday", "mustn't be empty");
    }
    else {
      this.errors.delete("birthday");
    }

    // password validation
    if (this.registerForm.value.password == '') {
      this.errors.set("password", "mustn't be empty");
    } else if (this.registerForm.value.password!.length < 8) {
      this.errors.set("password", "mustn't be minimum 8 characters length");
    } else if (this.registerForm.value.password != (this.registerForm.value.confirmPassword)) {
      this.errors.set("password", "must be the same as Confirm Password");
    } else {
      this.errors.delete('password');
    }

    // term and conditions validation
    if (this.registerForm.value.termsAndConditions == false) {
      this.errors.set("termsAndConditions", "You must agree to the terms and conditions.");
    } else {
      this.errors.delete('termsAndConditions');
    }

    if (this.errors.size == 0) {
      this.register();
    }

  }

  register(): void {
    this.newUser.firstName = this.registerForm.value.firstName ?? '';
    this.newUser.lastName = this.registerForm.value.lastName ?? '';
    this.newUser.email = this.registerForm.value.email ?? '';
    this.newUser.birthday = this.registerForm.value.birthday ?? new Date();
    this.newUser.password = this.registerForm.value.password ?? '';
    this.newUser.confirmPassword = this.registerForm.value.confirmPassword ?? '';
    
    this.authenticationService.register(this.newUser).subscribe({
      next: () => {
        this.registerForm.reset();
        this.router.navigate(['/registration-success']);
      },
      error: (error) => {
        if (error.status === 409) {
          if (error.error.errorCodes[0] === "User.DuplicateEmail") {
            this.errors.set("email", error.error.detail)
          }          
        }
        console.error("Błąd: ", error);
      }
    })
  }
}
