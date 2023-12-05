import { COMPILER_OPTIONS, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser) {
    router.navigate(['/register', { requestedUrl: state.url }]);
    console.log('you should register');
    return false;
  } else {
    return true;
  }
};
