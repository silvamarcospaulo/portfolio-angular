import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const decodeToken = (token: string) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const decoded = decodeToken(token);

  if (!decoded || decoded.role?.toLowerCase() !== 'admin') {
    return router.createUrlTree(['/login']);
  }

  return true;
};
