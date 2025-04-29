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
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
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