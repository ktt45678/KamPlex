import { AuthenticationService } from '../../services/authentication.service';

export function AppInitializer(authService: AuthenticationService) {
  if (authService.refreshTokenValue) {
    return () => new Promise(resolve => {
      // Attempt to refresh token on app start up to auto authenticate
      authService.refreshToken().subscribe().add(resolve);
    });
  }
  // Continue if token is empty
  return () => new Promise<void>(resolve => {
    resolve();
  });
}
