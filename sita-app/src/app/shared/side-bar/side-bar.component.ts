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
    <div *ngIf="shouldShowSidebar" class="sidebar-wrapper">
      <div class="sidebar-overlay" 
           [class.active]="!isCollapsed" 
           (click)="isCollapsed = true">
      </div>
      
      <div class="sidebar" [class.collapsed]="isCollapsed">
        <div class="sidebar-header">
          <div class="header-content">
            <h2>{{ currentFeature }}</h2>
            <p class="feature-description">{{ getFeatureDescription() }}</p>
          </div>
          <button class="collapse-btn" (click)="isCollapsed = !isCollapsed">
            <span class="icon">{{ isCollapsed ? '→' : '←' }}</span>
          </button>
        </div>

        <div class="sidebar-content">
          <div class="menu-section">
            <div class="menu-items">
              <ng-container *ngFor="let item of getCurrentFeatureItems()">
                <a [routerLink]="item.route" 
                   routerLinkActive="active"
                   class="menu-item"
                   [title]="item.description">
                  <div class="item-icon">
                    <i [class]="item.icon">{{ item.icon }}</i>
                  </div>
                  <div class="item-content" [class.hidden]="isCollapsed">
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-description">{{ item.description }}</span>
                  </div>
                  <div class="hover-indicator"></div>
                </a>
              </ng-container>
            </div>
          </div>
        </div>

        <div class="sidebar-footer" [class.hidden]="isCollapsed">
          <div class="user-info">
            <div class="user-avatar">👤</div>
            <div class="user-details">
              <span class="user-name">John Doe</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
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
      --text-color: #2d3748;
      --text-light: #718096;
      --bg-color: #ffffff;
      --sidebar-width: 280px;
      --sidebar-collapsed-width: 80px;
      --header-height: 64px;
      --transition-speed: 0.3s;
    }

    .sidebar-wrapper {
      position: fixed;
      top: var(--header-height);
      left: 0;
      bottom: 0;
      z-index: 100;
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-speed) ease;
      z-index: 90;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }

    .sidebar {
      width: var(--sidebar-width);
      height: 100%;
      background: var(--bg-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 100;

      &.collapsed {
        width: var(--sidebar-collapsed-width);

        .header-content {
          opacity: 0;
        }

        .menu-item {
          padding: 0.75rem;
          justify-content: center;

          .item-icon {
            margin-right: 0;
          }
        }
      }
    }

    .sidebar-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      min-height: 100px;

      .header-content {
        transition: opacity var(--transition-speed) ease;

        h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .feature-description {
          margin: 0.5rem 0 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }
      }
    }

    .collapse-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-speed) ease;
      backdrop-filter: blur(4px);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(2px);
      }

      .icon {
        font-size: 1rem;
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--text-light);
        border-radius: 3px;
      }
    }

    .menu-section {
      .menu-items {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 0.875rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      position: relative;
      transition: all var(--transition-speed) ease;

      &:hover {
        background: var(--primary-light);
        color: var(--primary-color);

        .item-description {
          color: var(--primary-color);
        }

        .hover-indicator {
          opacity: 1;
          transform: scaleY(1);
        }
      }

      &.active {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 500;

        .item-icon {
          color: var(--primary-color);
        }

        .hover-indicator {
          opacity: 1;
          transform: scaleY(1);
          background: var(--primary-color);
        }
      }
    }

    .hover-indicator {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--accent-color);
      border-radius: 0 2px 2px 0;
      opacity: 0;
      transform: scaleY(0);
      transition: all var(--transition-speed) ease;
    }

    .item-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-size: 1.25rem;
      flex-shrink: 0;
      transition: all var(--transition-speed) ease;
    }

    .item-content {
      flex: 1;
      min-width: 0;
      transition: all var(--transition-speed) ease;

      &.hidden {
        display: none;
      }
    }

    .item-label {
      display: block;
      font-size: 0.9375rem;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-description {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0.02);
      transition: all var(--transition-speed) ease;

      &.hidden {
        display: none;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .user-details {
      min-width: 0;
    }

    .user-name {
      display: block;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light);
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: calc(-1 * var(--sidebar-width));

        &.collapsed {
          left: calc(-1 * var(--sidebar-collapsed-width));
        }
      }

      .sidebar-overlay.active + .sidebar {
        left: 0;

        &.collapsed {
          left: 0;
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
    this.shouldShowSidebar = false;
  }

  ngOnInit(): void {
    this.updateSidebarVisibility(this.router.url);
    
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSidebarVisibility(event.url);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateSidebarVisibility(url: string): void {
    const currentPath = url.split('/')[1] || '';
    if (currentPath === '' || currentPath === 'dashboard') {
      this.shouldShowSidebar = false;
      return;
    }
    this.shouldShowSidebar = this.coreFeatures.includes(currentPath.toLowerCase());
  }

  getFeatureDescription(): string {
    switch (this.currentFeature) {
      case 'EPMDS':
        return 'Employee Performance Management';
      case 'IAPPMS':
        return 'Application Portfolio Management';
      case 'ESS':
        return 'Employee Self Service';
      case 'Reporting':
        return 'Analytics & Reports';
      default:
        return '';
    }
  }

  // Feature items remain the same
  private featureItems: { [key: string]: SidebarItem[] } = {
    'EPMDS': [
      { label: 'Performance Agreement', route: '/performance', icon: '📝', description: 'Create and manage performance agreements' },
      { label: 'EPMDS Workplan', route: '/epmds/workplan', icon: '📋', description: 'Level 1-12 workplan management' },
      { label: 'SMS Workplan', route: '/epmds/sms-workplan', icon: '📱', description: 'Level 13-16 workplan management' },
      { label: 'Personal Development', route: '/personal-development-plan', icon: 'school', description: 'View and update your development plans' },
      { label: 'September Review', route: '/september-review', icon: '📅', description: 'Complete September performance review' },
      { label: 'Performance Assessment', route: '/performance-assessment', icon: '📊', description: 'Quarterly/Annual Performance Assessment' },
      { label: 'Elementary Occupations', route: '/epmds/elementary', icon: '👥', description: 'Elementary occupations management' },
      { label: 'Performance Development', route: '/epmds/development', icon: '📈', description: 'Performance development planning' },
      { label: 'WorkPlan Elementary', route: '/epmds/workplan-elementary', icon: '📋', description: 'Elementary occupations workplan' },
      { label: 'Quarterly/Annual Assessment', route: '/quarterly-annual-assessment', icon: 'assessment', description: 'Elementary Occupations Assessment Instrument' }
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

  getCurrentFeatureItems(): SidebarItem[] {
    return this.featureItems[this.currentFeature] || [];
  }
} 