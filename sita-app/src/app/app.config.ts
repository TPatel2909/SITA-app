import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

const corsInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Add CORS headers if needed
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([corsInterceptor])
    )
  ]
};
