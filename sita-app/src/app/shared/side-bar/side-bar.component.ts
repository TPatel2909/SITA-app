import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="shouldShowSidebar" class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <h2>{{ currentFeature }}</h2>
        <button class="collapse-btn" (click)="isCollapsed = !isCollapsed">
          {{ isCollapsed ? '→' : '←' }}
        </button>
      </div>
      <div class="sidebar-content">
        <ng-container *ngFor="let item of getCurrentFeatureItems()">
          <a [routerLink]="item.route" class="sidebar-item" [title]="item.description">
            <i [class]="item.icon"></i>
            <span class="item-text">{{ item.label }}</span>
          </a>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #1c5ba3;
      --primary-dark: #134a82;
      --primary-light: rgba(28, 91, 163, 0.1);
      --accent-color: #04ac64;
      --accent-light: rgba(4, 172, 100, 0.1);
      --text-color: #040471;
      --text-light: rgba(4, 4, 113, 0.8);
      --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      --gradient-accent: linear-gradient(135deg, var(--accent-color), #038a4f);
    }

    .sidebar {
      background-color: #ffffff;
      border-right: 1px solid var(--primary-light);
      width: 280px;
      height: calc(100vh - 64px);
      position: fixed;
      top: 64px;
      left: 0;
      transition: all 0.3s ease;
      overflow-y: auto;
      box-shadow: 2px 0 8px rgba(28, 91, 163, 0.1);

      &.collapsed {
        width: 64px;
      }
    }

    .sidebar-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--gradient-primary);
      color: #ffffff;

      h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .collapse-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        cursor: pointer;
        color: #ffffff;
        font-size: 1.2rem;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
      }
    }

    .sidebar-content {
      padding: 0.5rem;
    }

    .feature-items {
      .sidebar-item {
        margin-bottom: 0.5rem;

        a {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          color: var(--text-color);
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.3s ease;
          border: 1px solid transparent;

          &:hover {
            background: var(--primary-light);
            color: var(--primary-color);
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(28, 91, 163, 0.1);
          }

          &.active {
            background: var(--gradient-accent);
            color: #ffffff;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(4, 172, 100, 0.2);

            .item-icon {
              color: #ffffff;
            }

            .item-description {
              color: rgba(255, 255, 255, 0.8);
            }
          }

          .item-icon {
            font-size: 1.2rem;
            min-width: 24px;
            text-align: center;
            color: var(--primary-color);
            transition: all 0.3s ease;
          }

          .item-content {
            margin-left: 0.75rem;
            flex: 1;
            overflow: hidden;
            transition: all 0.3s ease;

            &.collapsed {
              display: none;
            }

            .item-label {
              display: block;
              font-weight: 500;
              margin-bottom: 0.25rem;
            }

            .item-description {
              display: block;
              font-size: 0.8rem;
              color: var(--text-light);
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        z-index: 1000;

        &.collapsed {
          transform: translateX(0);
        }
      }
    }
  `]
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input() currentFeature: string = '';
  isCollapsed = false;
  shouldShowSidebar = false;
  private routerSubscription?: Subscription;
  private coreFeatures = ['epmds', 'iappms', 'ess', 'reporting'];

  constructor(private router: Router) {
    // Set initial visibility to false
    this.shouldShowSidebar = false;
  }

  ngOnInit(): void {
    // Initial route check
    this.updateSidebarVisibility();
    
    // Subscribe to route changes
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSidebarVisibility();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateSidebarVisibility(): void {
    const currentPath = this.router.url.split('/')[1] || '';
    // Explicitly hide on root/dashboard route
    if (currentPath === '' || currentPath === 'dashboard') {
      this.shouldShowSidebar = false;
      return;
    }
    this.shouldShowSidebar = this.coreFeatures.includes(currentPath.toLowerCase());
  }

  // Feature-specific items based on project requirements
  private featureItems: { [key: string]: SidebarItem[] } = {
    'EPMDS': [
      { label: 'Performance Agreement', route: '/epmds/performance-agreement', icon: '📝', description: 'Create and manage performance agreements' },
      { label: 'EPMDS Workplan', route: '/epmds/workplan', icon: '📋', description: 'Level 1-12 workplan management' },
      { label: 'SMS Workplan', route: '/epmds/sms-workplan', icon: '📱', description: 'Level 13-16 workplan management' },
      { label: 'Personal Development Plan', route: '/epmds/personal-development', icon: '🎯', description: 'Individual development planning' },
      { label: 'September Review Form', route: '/epmds/september-review', icon: '📅', description: 'Annual review documentation' },
      { label: 'Performance Assessment', route: '/epmds/assessment', icon: '📊', description: 'Performance assessment instruments' },
      { label: 'Elementary Occupations', route: '/epmds/elementary', icon: '👥', description: 'Elementary occupations management' },
      { label: 'Performance Development', route: '/epmds/development', icon: '📈', description: 'Performance development planning' },
      { label: 'WorkPlan Elementary', route: '/epmds/workplan-elementary', icon: '📋', description: 'Elementary occupations workplan' },
      { label: 'Quarterly/Annual Assessment', route: '/epmds/quarterly-assessment', icon: '📊', description: 'Quarterly and annual performance assessment' }
    ],
    'IAPPMS': [
      { label: 'Application Portfolio', route: '/iappms/portfolio', icon: '💻', description: 'Manage application portfolio' },
      { label: 'Development Status', route: '/iappms/development', icon: '⚙️', description: 'Track development progress' },
      { label: 'Quality Assurance', route: '/iappms/qa', icon: '✅', description: 'QA and testing status' }
    ],
    'ESS': [
      { label: 'My Profile', route: '/ess/profile', icon: '👤', description: 'View and update your profile' },
      { label: 'Leave Management', route: '/ess/leave', icon: '📅', description: 'Apply and track leave requests' },
      { label: 'Payroll', route: '/ess/payroll', icon: '💰', description: 'View salary and deductions' },
      { label: 'Documents', route: '/ess/documents', icon: '📄', description: 'Access your documents' }
    ],
    'Reporting': [
      { label: 'Project Reports', route: '/reporting/projects', icon: '📊', description: 'Project performance reports' },
      { label: 'Application Reports', route: '/reporting/applications', icon: '📈', description: 'Application status reports' },
      { label: 'Resource Reports', route: '/reporting/resources', icon: '👥', description: 'Resource utilization reports' },
      { label: 'Custom Reports', route: '/reporting/custom', icon: '⚙️', description: 'Create custom reports' }
    ]
  };

  get currentItems(): SidebarItem[] {
    return this.featureItems[this.currentFeature] || [];
  }

  getCurrentFeatureItems(): SidebarItem[] {
    return this.featureItems[this.currentFeature] || [];
  }
} 