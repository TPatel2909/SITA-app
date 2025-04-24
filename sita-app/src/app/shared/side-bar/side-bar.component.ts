import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
 
interface SidebarItem {
  label: string;
  route: string;
  description?: string;
  icon: string;
}
 
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="app-layout">
      <div class="sidebar-wrapper" [class.collapsed]="!isOpen">
        <div class="sidebar" [class.collapsed]="!isOpen">
          <!-- Expand/Collapse Button -->
          <button class="expand-button" (click)="toggleSidebar()">
            <i class="material-icons">{{ isOpen ? 'chevron_left' : 'chevron_right' }}</i>
          </button>

          <!-- Floating Expand Button (shown only when collapsed) -->
          <button class="floating-expand-button" *ngIf="!isOpen" (click)="toggleSidebar()">
            <i class="material-icons">chevron_right</i>
          </button>

          <!-- Company Header -->
          <div class="company-header">
            <img src="assets/logo.jpg" alt="SITA Logo" class="company-logo">
            <div class="company-info" [class.hidden]="!isOpen">
              <div class="company-name">SITA App</div>
            </div>
          </div>

          <!-- Feature Header -->
          <div class="feature-header" [class.hidden]="!isOpen" (click)="toggleSidebar()">
            <h2>{{ currentFeature }}</h2>
            <p>{{ getFeatureDescription() }}</p>
          </div>

          <!-- Main Navigation -->
          <div class="sidebar-content">
            <div class="menu-section" *ngFor="let item of getCurrentFeatureItems()">
              <a class="menu-item" 
                 [routerLink]="item.route" 
                 routerLinkActive="active"
                 (click)="handleItemClick()">
                <div class="item-icon">
                  <i class="material-icons">{{ item.icon }}</i>
                </div>
                <div class="item-content" [class.hidden]="!isOpen">
                  <div class="item-label">{{ item.label }}</div>
                  <div class="item-description">{{ item.description }}</div>
                </div>
              </a>
            </div>
          </div>

          <!-- User Profile -->
          <div class="user-profile" [class.collapsed]="!isOpen">
            <div class="user-avatar">JT</div>
            <div class="user-info" [class.hidden]="!isOpen">
              <span class="user-name">John Doe</span>
              <span class="user-email">john.doe&#64;sita.co.za</span>
            </div>
          </div>
        </div>
      </div>
      <div class="app-content">
        <ng-content></ng-content>
      </div>
      <!-- Move overlay outside of sidebar -->
      <div class="sidebar-overlay" [class.active]="!isOpen && isMobile" (click)="toggleSidebar()"></div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #1c5ba3;
      --primary-dark: #134a82;
      --primary-light: rgba(28, 91, 163, 0.08);
      --primary-lighter: rgba(28, 91, 163, 0.04);
      --text-color: #2d3748;
      --text-light: #718096;
      --bg-color: #ffffff;
      --bg-secondary: #f8fafc;
      --sidebar-width: 300px;
      --sidebar-collapsed-width: 72px;
      --transition-speed: 0.3s;
      --border-radius: 8px;
      --active-bg: linear-gradient(to right, var(--primary-light), var(--primary-lighter));
      --hover-bg: var(--bg-secondary);

      display: block;
      height: 100%;
    }

    .app-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
      position: relative;
      
    }

    .app-content {
      flex: 1;
      margin-left: var(--sidebar-width);
      min-height: 100vh;
      background-color: #f0f2f5;
      transition: margin-left var(--transition-speed) ease;
      padding: 24px;
      padding-top: 88px;
      width: calc(100% - var(--sidebar-width)) or calc(100% - var(--sidebar-collapsed-width));
      position: relative;
      z-index: 1;

      .sidebar-wrapper.collapsed ~ & {
        margin-left: var(--sidebar-collapsed-width);
        width: calc(100% - var(--sidebar-collapsed-width));
      }
    }

    .material-icons {
      font-size: 20px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
    }


    .expand-button {
      position: absolute;
      top: 20px;
      right: -16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary-color);
      border: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all var(--transition-speed) ease;

      &:hover {
        background: var(--primary-dark);
        transform: scale(1.1);
      }

      .material-icons {
        font-size: 20px;
      }
    }

    .floating-expand-button {
      position: fixed;
      top: 20px;
      left: var(--sidebar-collapsed-width);
      width: 32px;
      height: 32px;
      background: var(--primary-color);
      border: none;
      border-radius: 0 4px 4px 0;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1001;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      transition: all var(--transition-speed) ease;
      transform: translateX(-100%);

      &:hover {
        background: var(--primary-dark);
        transform: translateX(-100%) scale(1.1);
      }

      .material-icons {
        font-size: 20px;
      }
    }

    .sidebar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: var(--sidebar-width);
      transition: width var(--transition-speed) ease;

      &.collapsed {
        width: var(--sidebar-collapsed-width);
      }
    }

    .company-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-color);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      .company-logo {
        width: 32px;
        height: 32px;
        border-radius: 8px;
      }

      .company-info {
        transition: opacity var(--transition-speed) ease;

        &.hidden {
          opacity: 0;
          width: 0;
          padding: 0;
        }
      }
    }

    .feature-header {
      padding: 16px;
      background: var(--primary-color);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      transition: opacity var(--transition-speed) ease;

      &.hidden {
        opacity: 0;
        height: 0;
        padding: 0;
        border: none;
      }

      h2 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 0.3px;
      }

      p {
        margin: 4px 0 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      background: var(--bg-color);

      .sidebar.collapsed & {
        padding: 10px;
      }

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
    }

    .menu-section {
      margin: 2px 0;

      .sidebar.collapsed & {
        margin: 2px 0;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px;
      color: var(--text-color);
      text-decoration: none;
      transition: all var(--transition-speed) ease;
      position: relative;
      overflow: hidden;
      margin-bottom: 4px;

      .sidebar.collapsed & {
        padding: 10px;
        justify-content: center;
      }

      &:hover {
        background: var(--hover-bg);
      }

      &.active {
        background: var(--active-bg);
        color: var(--primary-color);
      }

      .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        margin-right: 12px;
        color: var(--text-light);
        transition: color var(--transition-speed) ease;

        .sidebar.collapsed & {
          margin-right: 0;
        }

        .material-icons {
          font-size: 20px;
        }
      }

      .item-content {
        flex: 1;
        min-width: 0;
        transition: opacity var(--transition-speed) ease;

        &.hidden {
          opacity: 0;
          width: 0;
          padding: 0;
        }

        .item-label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .item-description {
          font-size: 12px;
          color: var(--text-light);
        }
      }
    }

    .user-profile {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-secondary);
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      transition: all var(--transition-speed) ease;

      &.collapsed {
        justify-content: center;
        padding: 16px 0;
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--primary-light);
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
      }

      .user-info {
        transition: opacity var(--transition-speed) ease;

        &.hidden {
          opacity: 0;
          width: 0;
          padding: 0;
        }
      }
    }

    .hidden {
      opacity: 0;
      visibility: hidden;
    }

    .burger-menu {
      display: flex;
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1001;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all var(--transition-speed) ease;

      .burger-line {
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        transition: all var(--transition-speed) ease;
        margin: 2px 0;
      }

      &:hover .burger-line {
        background-color: var(--primary-dark);
      }

      &.active {
        .burger-line:first-child {
          transform: translateY(8px) rotate(45deg);
        }
        .burger-line:nth-child(2) {
          opacity: 0;
        }
        .burger-line:last-child {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }

    .sidebar-overlay {
      position: relative;
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
      width: 100%;
      height: 100%;
      background: var(--bg-color);
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
      transition: all var(--transition-speed) ease;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 100;

      &.collapsed {
        width: var(--sidebar-collapsed-width);
      }
    }

    @media (max-width: 768px) {
      .burger-menu {
        display: flex;
      }

      .nav-items {
        position: fixed;
        top: 56px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 56px);
        background: var(--primary);
        flex-direction: column;
        padding: 1rem;
        transition: left 0.3s ease;
        
        &.mobile-active {
          left: 0;
        }
      }

      .nav-item {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        
        &:last-child {
          border-bottom: none;
        }
      }

      .main-content,
      .app-content {
        margin-left: 0;
        width: 100%;
        z-index: 100;
        
        &.with-sidebar {
          margin-left: 0;
        }
      }
    }
  `]
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input() currentFeature: string = '';
  isOpen: boolean = true;
  shouldShowSidebar = true;
  isMobile = false;
  private routerSubscription?: Subscription;
  private coreFeatures = ['epmds', 'iappms', 'ess', 'reporting'];
 
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
    }
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
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', () => this.checkMobile());
    }
  }
 
  private checkMobile() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
 
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(): void {
    this.isOpen = false;
  }
 
  handleItemClick() {
    if (this.isMobile) {
      this.closeSidebar();
    }
  }
 
  private updateSidebarVisibility(url: string): void {
    const currentPath = url.split('/')[1] || '';
    this.shouldShowSidebar = this.coreFeatures.includes(currentPath.toLowerCase());
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
 
  getCurrentFeatureItems(): SidebarItem[] {
    return this.featureItems[this.currentFeature] || [];
  }
 
  private featureItems: { [key: string]: SidebarItem[] } = {
    'EPMDS': [
      { label: 'Dashboard', route: '/epmds/dashboard', description: 'EPMDS Overview', icon: 'dashboard' },
      { label: 'Performance Agreement', route: '/epmds/performance', description: 'Create and manage agreements', icon: 'assignment' },
      { label: 'EPMDS Workplan Level 1-12', route: '/epmds/workplan', description: 'Workplan for levels 1-12', icon: 'work' },
      { label: 'SMS Workplan Level 13-16', route: '/epmds/sms-workplan', description: 'Workplan for levels 13-16', icon: 'work' },
      { label: 'Personal Development Plan', route: '/epmds/pdp', description: 'Personal development planning', icon: 'person' },
      { label: 'September Review Form', route: '/epmds/september-review', description: 'September review assessment', icon: 'assessment' },
      { label: 'Annual Performance Assessment Instrument', route: '/epmds/annual-assessment', description: 'Annual performance review', icon: 'assessment' },
      { label: 'Probation: Quarterly Performance Assessment', route: '/epmds/quarterly-assessment', description: 'Quarterly performance review', icon: 'analytics' },
      { label: 'Elementary Occupations', route: '/epmds/elementary', description: 'Elementary occupations', icon: 'group' },
      { label: 'Performance Development Plan: Elementary Occupations', route: '/epmds/pdp-elementary', description: 'Elementary development plan', icon: 'person_add' },
      { label: 'Assessment Factor 1: Job Performance Elementary Occupation', route: '/epmds/factor1', description: 'Job performance assessment', icon: 'list' },
      { label: 'Assessment Criteria', route: '/epmds/criteria', description: 'Performance assessment criteria', icon: 'checklist' },
      { label: 'Assessment Factor 2: Interpersonal Relations', route: '/epmds/factor2', description: 'Interpersonal relations assessment', icon: 'people' },
      { label: 'Assessment Factor 3: Interpersonal Relations', route: '/epmds/factor3', description: 'Interpersonal relations assessment', icon: 'people' },
      { label: 'Performance Rating Scale Level 1-12', route: '/epmds/rating-scale', description: 'Rating scale for levels 1-12', icon: 'star' },
      { label: 'Key Result Areas Level 1-12', route: '/epmds/kra', description: 'Key result areas for levels 1-12', icon: 'track_changes' },
      { label: 'Generic Assessment Factors Level 1-12', route: '/epmds/generic-factors', description: 'Generic assessment factors', icon: 'format_list_bulleted' },
      { label: 'Final Performance Assessment Score Level 1-12', route: '/epmds/final-score', description: 'Final performance assessment', icon: 'calculate' }
    ],
    'IAPPMS': [
      { label: 'MTSF Implementation', route: '/iappms/mtsf', description: 'Medium Term Strategic Frame...', icon: 'timeline' },
      { label: 'Strategic Mapping', route: '/iappms/strategic-mapping', description: 'Strategic Mapping of P...', icon: 'map' },
      { label: 'Operational Plan', route: '/iappms/operational-plan', description: 'Operational Planning and M...', icon: 'business' },
      { label: 'Strategic Plan', route: '/iappms/strategic-plan', description: 'Strategic Planning and Dev...', icon: 'trending_up' },
      { label: 'Annual Performance', route: '/iappms/annual', description: 'Annual Performance Plan...', icon: 'event_note' }
    ],
    'ESS': [
      { label: 'Personal Information', route: '/ess/personal-info', description: 'View and update profile', icon: 'person' },
      { label: 'Leave Management', route: '/ess/leave', description: 'Leave requests and tracking', icon: 'event' },
      { label: 'Time Management', route: '/ess/time', description: 'Time and attendance', icon: 'schedule' },
      { label: 'Benefits', route: '/ess/benefits', description: 'Benefits information', icon: 'card_membership' },
      { label: 'Documents', route: '/ess/documents', description: 'Access documents', icon: 'folder' }
    ],
    'REPORTING': [
      { label: 'Performance Reports', route: '/reporting/performance', description: 'Performance analytics', icon: 'bar_chart' },
      { label: 'Assessment Reports', route: '/reporting/assessment', description: 'Assessment results', icon: 'assessment' },
      { label: 'ESS Reports', route: '/reporting/ess', description: 'ESS analytics', icon: 'group' },
      { label: 'Custom Reports', route: '/reporting/custom', description: 'Custom report builder', icon: 'description' },
      { label: 'Analytics Dashboard', route: '/reporting/analytics', description: 'Interactive dashboard', icon: 'dashboard' }
    ]
  };
}