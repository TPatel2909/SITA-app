import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { filter } from 'rxjs/operators';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentFeature: string = '';
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      // Only run this code in the browser
      const path = this.router.url.split('/')[1];
      this.currentFeature = path ? path.toUpperCase() : '';
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.url.split('/')[1];
      this.currentFeature = path ? path.toUpperCase() : '';
    });
  }
}
