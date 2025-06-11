import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
 
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
      <!-- Burger menu for mobile -->
      <button class="burger-menu" *ngIf="isMobile && !isOpen" (click)="toggleSidebar()" aria-label="Open sidebar">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
      <div class="sidebar-wrapper" [class.collapsed]="!isOpen" [class.mobile-open]="isMobile && isOpen">
        <div class="sidebar" [class.collapsed]="!isOpen">
          <!-- Expand/Collapse Button (very top of sidebar, only when collapsed and not mobile) -->
          <button *ngIf="!isOpen && !isMobile" class="expand-button prominent" (click)="toggleSidebar()">
            <i class="material-icons">chevron_right</i>
          </button>
         
          <!-- Feature Header -->
          <div class="feature-header modern" [class.hidden]="!isOpen" (click)="toggleSidebar()">
            <h2>{{ currentFeature }}</h2>
            <p>{{ getFeatureDescription() }}</p>
          </div>
          <!-- Main Navigation -->
          <div class="sidebar-content modern">
            <div class="menu-section modern" *ngFor="let item of getCurrentFeatureItems()">
              <a class="menu-item modern" 
                 [routerLink]="item.route" 
                 routerLinkActive="active"
                 [title]="!isOpen ? item.label : ''"
                 (click)="handleItemClick()">
                <div class="item-icon modern">
                  <i class="material-icons">{{ item.icon }}</i>
                </div>
                <div class="item-content modern" [class.hidden]="!isOpen">
                  <div class="item-label modern">{{ item.label }}</div>
                  <div class="item-description modern">{{ item.description }}</div>
                </div>
              </a>
            </div>
          </div>
          <!-- User Profile -->
          <div class="user-profile modern" [class.collapsed]="!isOpen" (click)="logout()">
            <div class="user-icon modern">
              <i class="material-icons">person</i>
            </div>
            <div class="user-info modern" [class.hidden]="!isOpen">
              <span class="user-name">{{ userName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="app-content" [class.sidebar-collapsed]="!isOpen">
        <ng-content></ng-content>
      </div>
      <!-- Overlay for mobile -->
      <div class="sidebar-overlay" [class.active]="isMobile && isOpen" (click)="toggleSidebar()"></div>
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
      width: 90%; 
      position: relative;
      
    }

    .app-content {
      flex: 1;
      margin-left: var(--sidebar-width);
      min-height: 100vh;
      background-color: #f0f2f5;
      transition: margin-left var(--transition-speed) ease, width var(--transition-speed) ease;
      padding: 24px;
      padding-top: 88px;
      width: calc(100% - var(--sidebar-width));
      position: relative;
      z-index: 1;
    }
    .app-content.sidebar-collapsed {
      margin-left: var(--sidebar-collapsed-width);
      width: calc(100% - var(--sidebar-collapsed-width));
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
      position: fixed;
      top: 0;
      left: var(--sidebar-width);
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
      z-index: 3000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: left var(--transition-speed) ease, background var(--transition-speed) ease, transform var(--transition-speed) ease;
    }
    .expand-button.collapsed {
      left: var(--sidebar-collapsed-width);
    }

    .floating-expand-button {
      display: none;
    }

    .sidebar-wrapper {
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: var(--sidebar-width);
      transition: width var(--transition-speed) ease;
      background: #f6f8fb;
 
      box-shadow: 0 2px 8px rgba(44, 62, 80, 0.05);
    
      overflow: visible;
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
      padding: 16px 24px;
      background: var(--primary-color);
      border-bottom: none;
      transition: opacity var(--transition-speed) ease;

      &.hidden {
        opacity: 0;
        height: 0;
        padding: 0;
        border: none;
      }

      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 0.3px;
      }

      p {
        margin: 4px 0 0;
        font-size: 0.9rem;
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
        background: #4CAF50;
        border-radius: 2px;
      }
    }

    .menu-section {
      margin: 2px 0;

      .sidebar.collapsed & {
        margin: 0;
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
        padding: 8px;
        justify-content: center;
        margin-bottom: 2px;
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
      background: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      box-shadow: none;
      position: relative;
      z-index: 100;
      overflow: visible;
      &.collapsed {
        width: var(--sidebar-collapsed-width);
        border-radius: 16px;
      }
    }

    .expand-button.prominent {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e9f1fa;
      color: var(--primary-color);
      border: none;
      box-shadow: 0 2px 4px rgba(44, 62, 80, 0.05);
      left: 50%;
      top: 16px;
      transform: translateX(-50%);
      position: absolute;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .expand-button.prominent .material-icons {
      font-size: 24px;
    }

    .company-header.modern {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0 8px 0;
      background: transparent;
      border-bottom: none;
    }
    .company-logo.modern {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      margin-right: 0;
    }
    .company-info {
      margin-left: 0;
      transition: opacity var(--transition-speed) ease;
      &.hidden {
        opacity: 0;
        width: 0;
        padding: 0;
      }
    }
    .company-name.modern {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-left: 8px;
    }
    .feature-header.modern {
      padding: 16px 24px;
      background: var(--primary-color);
      border-bottom: none;
      transition: opacity var(--transition-speed) ease;
      &.hidden {
        opacity: 0;
        height: 0;
        padding: 0;
        border: none;
      }
      h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 0.3px;
      }
      p {
        margin: 4px 0 0;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .sidebar-content.modern {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
      background: transparent;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #4CAF50;
        border-radius: 2px;
      }
    }
    .menu-section.modern {
      margin: 2px 0;
      .sidebar.collapsed & {
        margin: 0;
      }
    }
    .menu-item.modern {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      color: #7b8ca6;
      text-decoration: none;
      border-radius: 8px;
      margin: 4px 8px;
      transition: background 0.2s, color 0.2s;
      position: relative;
      overflow: hidden;
      &:hover, &.active {
        background: #e9f1fa;
        color: var(--primary-color);
      }
      .sidebar.collapsed & {
        padding: 10px;
        height: 50px;
        justify-content: center;
        margin: 5px;
      }
    }
    .item-icon.modern {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      margin-right: 12px;
      color: #7b8ca6;
      font-size: 22px;
      transition: color 0.2s;
      .sidebar.collapsed & {
        margin: 0;
        padding: 0;
        padding-left: 12px;
      }
      .material-icons {
        font-size: 22px;
      }
    }
    .item-content.modern {
      flex: 1;
      min-width: 0;
      transition: opacity var(--transition-speed) ease;
      &.hidden {
        opacity: 0;
        width: 0;
        padding: 0;
      }
      .item-label.modern {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .item-description.modern {
        font-size: 0.85rem;
        color: #b0b8c1;
      }
    }
    .user-profile.modern {
      padding: 16px 0 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border-top: none;
      transition: all var(--transition-speed) ease;
      gap: 8px;

      &.collapsed {
        justify-content: center;
        padding: 16px 0;
      }

      .user-icon.modern {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        
        .material-icons {
          font-size: 24px;
        }
      }

      .user-info.modern {
        transition: opacity var(--transition-speed) ease;
        
        &.hidden {
          opacity: 0;
          width: 0;
          padding: 0;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-color);
        }
      }
    }

    .sidebar.collapsed .menu-section.modern {
      margin: 0;
    }
    .sidebar.collapsed .menu-item.modern {
      margin: 0;
      padding: 2px 0;
      justify-content: center;
    }
    .sidebar.collapsed .item-icon.modern {
      margin: 0;
      padding: 0;
      padding-left: 12px;
    }
    .sidebar.collapsed .menu-section.modern:first-child {
      margin-top: 48px;
    }
    .expand-button.prominent {
      top: 8px;
    }

    @media (max-width: 768px) {
      .app-layout {
        width: 100%;
        margin: 0;
      }
      .sidebar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 80vw;
        max-width: 320px;
        min-width: 220px;
        z-index: 2000;
        background: #fff;
        box-shadow: 2px 0 8px rgba(44, 62, 80, 0.12);
        transform: translateX(-100%);
        transition: transform var(--transition-speed) ease;
      }
      .sidebar-wrapper.mobile-open {
        transform: translateX(0);
      }
      .sidebar {
        border-radius: 0;
        min-width: 0;
        width: 100%;
        height: 100vh;
        box-shadow: none;
      }
      .sidebar-content.modern {
        padding: 12px 0;
      }
      .menu-item.modern {
        min-height: 48px;
        font-size: 1.1rem;
        justify-content: center;
      }
      .item-icon.modern {
        font-size: 28px;
        padding-left: 0;
      }
      .user-profile.modern {
        padding: 16px 0 16px 0;
        justify-content: center;
        .user-icon.modern {
          font-size: 28px;
        }
      }
      .burger-menu {
        display: flex;
        position: fixed;
        top: 16px;
        left: 16px;
        z-index: 2100;
        flex-direction: column;
        justify-content: space-between;
        width: 32px;
        height: 24px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      .burger-line {
        width: 100%;
        height: 4px;
        background-color: var(--primary-color);
        border-radius: 2px;
        margin: 2px 0;
        transition: background 0.2s;
      }
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1999;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--transition-speed) ease;
      }
      .sidebar-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .app-content {
        margin-left: 0 !important;
        width: 100% !important;
        padding: 16px 4px 16px 4px;
      }
      .app-content.sidebar-collapsed {
        margin-left: 0 !important;
        width: 100% !important;
      }
    }
  `]
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input() currentFeature: string = '';
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isOpen: boolean = true;
  shouldShowSidebar = true;
  isMobile = false;
  private routerSubscription?: Subscription;
  private coreFeatures = ['epmds', 'iappms', 'ess', 'reporting'];
  userName = 'Test User';
 
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
      // Set initial state for mobile
      if (this.isMobile) {
        this.isOpen = false;
      }
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
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      // If switching to mobile, close the sidebar
      if (!wasMobile && this.isMobile) {
        this.isOpen = false;
        this.sidebarToggled.emit(false);
      }
    }
  }
 
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.sidebarToggled.emit(this.isOpen);
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
      { label: 'Annual Performance Assessment Instrument', route: '/epmds/annual-performance-assessment-instrument', description: 'Annual performance review', icon: 'assessment' },
      { label: 'Probation: Quarterly Performance Assessment', route: '/epmds/quarterly-assessment', description: 'Quarterly performance review', icon: 'analytics' },
      { label: 'Elementary Occupations', route: '/epmds/elementary', description: 'Elementary occupations', icon: 'group' },
      { label: 'Performance Development Plan: Elementary Occupations', route: '/epmds/pdp-elementary', description: 'Elementary development plan', icon: 'person_add' },
      { label: 'Assessment Factor 1: Job Performance Elementary Occupation', route: '/epmds/assessment-factor-one', description: 'Job performance assessment', icon: 'list' },
      { label: 'Assessment Criteria', route: '/epmds/assessment-criteria', description: 'Performance assessment criteria', icon: 'checklist' },
      { label: 'Assessment Factor 2: Interpersonal Relations', route: '/epmds/assessment-factor-two', description: 'Interpersonal relations assessment', icon: 'people' },
      { label: 'Assessment Factor 3: Interpersonal Relations', route: '/epmds/assessment-factor-three', description: 'Interpersonal relations assessment', icon: 'people' },
      { label: 'Performance Rating Scale Level 1-12', route: '/epmds/performance-rating-scale', description: 'Rating scale for levels 1-12', icon: 'star' },
      { label: 'Key Result Areas Level 1-12', route: '/epmds/key-result-areas', description: 'Key result areas for levels 1-12', icon: 'track_changes' },
      { label: 'Generic Assessment Factors Level 1-12', route: '/epmds/generic-assessment-factor', description: 'Generic assessment factors', icon: 'format_list_bulleted' },
      { label: 'Final Performance Assessment Score Level 1-12', route: '/epmds/final-score', description: 'Final performance assessment', icon: 'calculate' }
    ],
    'IAPPMS': [
      { label: 'Dashboard', route: '/iappms/dashboard', description: 'IAPPMS Overview', icon: 'dashboard' },
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}