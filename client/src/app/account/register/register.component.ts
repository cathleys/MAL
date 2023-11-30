import { Component } from '@angular/core';
import { AccountService } from 'src/app/api/services';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/_auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(75)],
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    isFemale: [true, Validators.required],
  });

  register() {
    if (this.form.invalid) return;

    this.accountService.register({ body: this.form.value }).subscribe({
      next: () => this.login(),
      error: (error) => console.error(error),
    });
  }

  checkUser() {
    const emailValue = this.form.get('email')?.value;

    if (emailValue) {
      const user: User = { email: emailValue };

      this.accountService.getPassenger(user).subscribe({
        next: () => {
          console.log('user exists. go to login'), this.login();
        },
        error: (err) => {
          if (err.status !== 404) console.error(err);
        },
      });
    }
  }

  private login() {
    const emailValue = this.form.get('email')?.value;

    if (emailValue) this.authService.loginUser({ email: emailValue });

    this.router.navigateByUrl('/');
  }
}
