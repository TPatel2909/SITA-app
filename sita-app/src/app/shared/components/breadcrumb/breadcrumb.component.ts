import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav *ngIf="showBreadcrumbs" class="breadcrumb-nav">
      <ol class="breadcrumb-list">
        <li *ngFor="let breadcrumb of breadcrumbs; let last = last" class="breadcrumb-item">
          <a [routerLink]="breadcrumb.url" class="breadcrumb-link">
            {{ breadcrumb.label }}
          </a>
          <span *ngIf="!last" class="breadcrumb-separator">/</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      position: fixed;
      top: 64px; /* Height of the header */
      left: 300px; /* Width of the sidebar */
      right: 0;
      background: white;
      padding: 0.75rem 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: left 0.3s ease;
    }

    .breadcrumb-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .breadcrumb-link {
      color: var(--primary-color, #1c5ba3);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;

      &:hover {
        color: var(--primary-dark, #134a82);
        text-decoration: underline;
      }
    }

    .breadcrumb-separator {
      color: #718096;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .breadcrumb-nav {
        left: 0;
        padding: 0.5rem 1rem;
      }

      .breadcrumb-link {
        font-size: 0.8rem;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  showBreadcrumbs = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if we're on a dashboard route
      const currentUrl = this.router.url;
      this.showBreadcrumbs = !this.isDashboardRoute(currentUrl);

      if (this.showBreadcrumbs) {
        const root = this.activatedRoute.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.buildBreadcrumbs(root, '', breadcrumbs);
        this.breadcrumbs = breadcrumbs;
      } else {
        this.breadcrumbs = [];
      }
    });
  }

  private isDashboardRoute(url: string): boolean {
    return url === '/dashboard' || 
           url === '/epmds/dashboard' || 
           url === '/epmds/dashboard/' ||
           url.startsWith('/dashboard/') ||
           url.startsWith('/epmds/dashboard/');
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string, breadcrumbs: Breadcrumb[]): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      this.buildBreadcrumbs(child, url, breadcrumbs);
    }
  }
} 