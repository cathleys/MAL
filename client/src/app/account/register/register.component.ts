import { Component } from '@angular/core';
import { AccountService } from 'src/app/api/services';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    isFemale: [true],
  });

  register() {
    console.log('form values: ', this.form.value);

    this.accountService.register({ body: this.form.value }).subscribe({
      next: (_) => console.log('form successfully sent to server'),
    });
  }
}
