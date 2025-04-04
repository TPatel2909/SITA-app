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
      --sidebar-width: 300px;
      --sidebar-collapsed-width: 80px;
      --header-height: 64px;
      --transition-speed: 0.3s;
      --menu-item-height: 56px;
      --border-radius: 12px;
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
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
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(2px);
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
      box-shadow: var(--shadow-lg);
      transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 100;
      border-right: 1px solid rgba(0, 0, 0, 0.05);

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
            transform: scale(1.2);
          }

          &:hover {
            .item-tooltip {
              opacity: 1;
              visibility: visible;
              transform: translateX(0);
            }
          }
        }

        .item-content {
          display: none;
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
      min-height: 120px;
      position: relative;
      overflow: hidden;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%);
      }

      .header-content {
        position: relative;
        transition: opacity var(--transition-speed) ease;

        h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          background: linear-gradient(to right, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .feature-description {
          margin: 0.75rem 0 0;
          font-size: 0.875rem;
          opacity: 0.9;
          line-height: 1.5;
          max-width: 200px;
        }
      }
    }

    .collapse-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-speed) ease;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(2px);
      }

      .icon {
        font-size: 1.25rem;
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
      
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--text-light);
        border-radius: 2px;
      }

      .menu-section {
        padding: 0 0.5rem;

        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      height: var(--menu-item-height);
      padding: 0 1rem;
      color: var(--text-color);
      text-decoration: none;
      position: relative;
      transition: all var(--transition-speed) ease;
      border-radius: var(--border-radius);
      margin: 0 0.5rem;

      &:hover {
        background: var(--primary-light);
        color: var(--primary-color);
        transform: translateX(4px);

        .item-description {
          color: var(--primary-color);
        }

        .hover-indicator {
          opacity: 1;
          transform: scaleY(1);
        }

        .item-icon {
          transform: scale(1.1);
        }
      }

      &.active {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 500;
        box-shadow: var(--shadow-sm);

        .item-icon {
          color: var(--primary-color);
          transform: scale(1.1);
        }

        .hover-indicator {
          opacity: 1;
          transform: scaleY(1);
          background: var(--primary-color);
        }

        &:hover {
          transform: translateX(4px);
        }
      }
    }

    .hover-indicator {
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 4px;
      background: var(--accent-color);
      border-radius: 2px;
      opacity: 0;
      transform: scaleY(0);
      transition: all var(--transition-speed) ease;
    }

    .item-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-size: 1.5rem;
      flex-shrink: 0;
      transition: all var(--transition-speed) ease;
      border-radius: 8px;
    }

    .item-content {
      flex: 1;
      min-width: 0;
      transition: all var(--transition-speed) ease;
    }

    .item-label {
      display: block;
      font-size: 0.9375rem;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .item-description {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color var(--transition-speed) ease;
    }

    .item-tooltip {
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%) translateX(-10px);
      background: var(--primary-dark);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-speed) ease;
      pointer-events: none;
      box-shadow: var(--shadow-md);

      &:before {
        content: '';
        position: absolute;
        left: -4px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background: var(--primary-dark);
      }
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      background: rgba(0, 0, 0, 0.02);
      transition: all var(--transition-speed) ease;
      margin-top: auto;

      &.hidden {
        display: none;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      background: white;
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-speed) ease;

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      box-shadow: var(--shadow-sm);
    }

    .user-details {
      min-width: 0;
    }

    .user-name {
      display: block;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      display: block;
      font-size: 0.75rem;
      color: var(--text-light);
      margin-top: 0.125rem;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: calc(-1 * var(--sidebar-width));
        border-radius: 0 var(--border-radius) var(--border-radius) 0;

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
    // Get the first segment of the URL path
    const currentPath = url.split('/')[1] || '';
    
    // Show sidebar for core features
    this.shouldShowSidebar = this.coreFeatures.includes(currentPath.toLowerCase());
    
    // Update current feature based on the path
    if (this.shouldShowSidebar) {
      this.currentFeature = currentPath.toUpperCase();
    }
  }

  getFeatureDescription(): string {
    switch (this.currentFeature.toLowerCase()) {
      case 'epmds':
        return 'Employee Performance Management and Development System';
      case 'iappms':
        return 'Integrated Application Portfolio Management System';
      case 'ess':
        return 'Employee Self Service Portal';
      case 'reporting':
        return 'Analytics & Reporting Dashboard';
      default:
        return '';
    }
  }

  // Feature items remain the same
  private featureItems: { [key: string]: SidebarItem[] } = {
    'EPMDS': [
      { label: 'Performance Agreement', route: '/epmds/performance', icon: '📝', description: 'Create and manage performance agreements' },
      { label: 'EPMDS Workplan Level 1-12', route: '/epmds/workplan', icon: '📋', description: 'Workplan for levels 1-12' },
      { label: 'SMS Workplan Level 13-16', route: '/epmds/sms-workplan', icon: '📱', description: 'Workplan for levels 13-16' },
      { label: 'Personal Development Plan', route: '/epmds/pdp', icon: '🎓', description: 'Personal development planning' },
      { label: 'September Review Form', route: '/epmds/september-review', icon: '📅', description: 'September review assessment' },
      { label: 'Annual Performance Assessment', route: '/epmds/assessment', icon: '📊', description: 'Annual performance assessment instrument' },
      { label: 'Quarterly Performance Assessment', route: '/epmds/quarterly-assessment', icon: '📈', description: 'Probation quarterly assessment' },
      { label: 'Elementary Occupations', route: '/epmds/elementary', icon: '👥', description: 'Elementary occupations management' },
      { label: 'PDP: Elementary Occupations', route: '/epmds/pdp-elementary', icon: '📝', description: 'Performance development plan for elementary occupations' },
      { label: 'Assessment Factor 1', route: '/epmds/factor1', icon: '🎯', description: 'Job performance elementary occupation' },
      { label: 'Assessment Criteria', route: '/epmds/criteria', icon: '📋', description: 'Assessment criteria management' },
      { label: 'Assessment Factor 2', route: '/epmds/factor2', icon: '🤝', description: 'Interpersonal relations assessment' },
      { label: 'Assessment Factor 3', route: '/epmds/factor3', icon: '👥', description: 'Interpersonal relations assessment' },
      { label: 'Performance Rating Scale', route: '/epmds/rating-scale', icon: '📊', description: 'Rating scale for levels 1-12' },
      { label: 'Key Result Areas', route: '/epmds/kra', icon: '🎯', description: 'Key result areas for levels 1-12' },
      { label: 'Generic Assessment Factors', route: '/epmds/gaf', icon: '📋', description: 'Generic assessment factors for levels 1-12' },
      { label: 'Final Assessment Score', route: '/epmds/final-score', icon: '🏆', description: 'Final performance assessment score for levels 1-12' }
    ],
    'IAPPMS': [
      { label: 'Dashboard', route: '/iappms/dashboard', icon: '💻', description: 'IAPPMS Overview Dashboard' },
      { label: 'Settings', route: '/iappms/settings', icon: '⚙️', description: 'System Configuration' }
    ],
    'ESS': [
      { label: 'Personal Information', route: '/ess/personal-info', icon: '👤', description: 'View and update your profile' },
      { label: 'Leave Management', route: '/ess/leave', icon: '📅', description: 'Apply and track leave requests' },
      { label: 'Time Management', route: '/ess/time', icon: '⏰', description: 'Manage your time and attendance' },
      { label: 'Benefits', route: '/ess/benefits', icon: '💰', description: 'View your benefits information' },
      { label: 'Documents', route: '/ess/documents', icon: '📄', description: 'Access your documents' }
    ],
    'REPORTING': [
      { label: 'Performance Reports', route: '/reporting/performance', icon: '📊', description: 'Performance analytics and reports' },
      { label: 'Assessment Reports', route: '/reporting/assessment', icon: '📈', description: 'Assessment results and trends' },
      { label: 'ESS Reports', route: '/reporting/ess', icon: '📋', description: 'Employee self-service analytics' },
      { label: 'Custom Reports', route: '/reporting/custom', icon: '⚙️', description: 'Create and view custom reports' },
      { label: 'Analytics Dashboard', route: '/reporting/analytics', icon: '📊', description: 'Interactive analytics dashboard' }
    ]
  };

  getCurrentFeatureItems(): SidebarItem[] {
    return this.featureItems[this.currentFeature] || [];
  }
} 