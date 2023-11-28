import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  currentUser?: User;

  loginUser(user: User) {
    console.log('user login value: ' + user.email);

    this.currentUser = user;
  }
}

export interface User {
  email: string;
}
