import { Component, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NavBarComponent,
    SideBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private routerSubscription: Subscription | undefined;
  isAuthenticated = false;
  currentFeature = '';
  isAuthPage = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Subscribe to authentication state changes
      this.authService.currentUser$.subscribe(user => {
        this.isAuthenticated = !!user;
        if (!this.isAuthenticated && !this.isAuthPage) {
          this.router.navigate(['/login']);
        } else if (this.isAuthenticated && this.isAuthPage) {
          // If authenticated and on auth page, redirect to dashboard
          this.router.navigate(['/dashboard']);
        }
      });

      // Subscribe to router events to update current feature and check for auth pages
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const path = event.url.split('/')[1];
        this.currentFeature = path ? path.toUpperCase() : '';
        
        // Check if current route is an auth page
        this.isAuthPage = this.checkIfAuthPage(event.url);

        // Ensure any overlays are cleaned up on navigation
        this.cleanupOverlays();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.cleanupOverlays();
  }

  private cleanupOverlays(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      const overlays = document.querySelectorAll('.sidebar-overlay');
      overlays.forEach(overlay => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      });
    }
  }

  private checkIfAuthPage(url: string): boolean {
    // Check if the current route is login, signup, or forgot-password
    return url.includes('/login') || 
           url.includes('/auth/login') || 
           url.includes('/auth/signup') || 
           url.includes('/auth/forgot-password');
  }
}
