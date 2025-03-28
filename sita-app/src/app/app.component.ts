import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <app-side-bar [currentFeature]="currentFeature"></app-side-bar>
    <main class="main-content" [class.with-sidebar]="currentFeature">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      margin-top: 64px;
      padding: 2rem;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      transition: all 0.3s ease;

      &.with-sidebar {
        margin-left: 280px;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  currentFeature: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.url.split('/')[1];
      this.currentFeature = path ? path.toUpperCase() : '';
    });
  }
}
