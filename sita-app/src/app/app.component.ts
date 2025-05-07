import { Component, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PrintButtonComponent } from './shared/printbutton/print-button.component';
import { SaveButtonComponent } from './shared/savebutton/save-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NavBarComponent,
    SideBarComponent,
    BreadcrumbComponent,
    PrintButtonComponent,
    SaveButtonComponent
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
  currentUrl = '';
  isSidebarOpen = true;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Subscribe to authentication state changes
      this.authService.currentUser$.subscribe(user => {
        this.isAuthenticated = !!user;
        if (!this.isAuthenticated && !this.isAuthPage) {
          this.router.navigate(['/login']);
        } else if (this.isAuthenticated && this.isAuthPage) {
          // If authenticated and on auth page, redirect to dashboard
          this.router.navigate(['/epmds/dashboard']);
          this.currentUrl = '/epmds/dashboard';
        }
      });

      // Subscribe to router events to update current feature and check for auth pages
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        const path = event.url.split('/')[1];
        this.currentFeature = path ? path.toUpperCase() : '';
        this.currentUrl = event.url;
        
        // Check if current route is an auth page
        this.isAuthPage = this.checkIfAuthPage(event.url);

        // Ensure any overlays are cleaned up on navigation
        this.cleanupOverlays();
      });

      // Initialize currentUrl with the current route
      this.currentUrl = this.router.url;
    }
  }

  isDashboardPage(): boolean {
    const dashboardPaths = [
      '/dashboard',
      '/epmds/dashboard',
      '/epmds/dashboard/',
      '/epmds',
      '/epmds/',
      '/epmds/overview',
      '/epmds/overview/',
      '/iappms/dashboard',
      '/ess/dashboard',
      '/reporting/dashboard'
    ];
    
    return dashboardPaths.includes(this.currentUrl) ||
           this.currentUrl.startsWith('/dashboard/') ||
           this.currentUrl.startsWith('/epmds/dashboard/') ||
           this.currentUrl.startsWith('/epmds/overview/') ||
           this.currentUrl.startsWith('/iappms/dashboard') ||
           this.currentUrl.startsWith('/ess/dashboard') ||
           this.currentUrl.startsWith('/reporting/dashboard');
  }

  isLandingPage(): boolean {
    return this.currentUrl === '/landing' || 
           this.currentUrl === '/landing/' ||
           this.router.url === '/landing' ||
           this.router.url === '/landing/';
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

  onSaveClicked() {
    // This method will be overridden by child components that need to handle form saving
    console.log('Save button clicked');
  }

  // Add a handler to update sidebar state
  onSidebarToggled(isOpen: boolean | Event) {
    if (typeof isOpen === 'boolean') {
      this.isSidebarOpen = isOpen;
    }
  }
}
