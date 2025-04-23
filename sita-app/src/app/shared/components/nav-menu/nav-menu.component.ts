import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  subItems: SubItem[];
}

interface SubItem {
  label: string;
  route: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="top-nav">
      <button class="burger-menu" (click)="toggleMobileMenu()">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
      <div class="nav-items" [class.mobile-active]="isMobileMenuOpen">
        <div *ngFor="let item of menuItems" 
             class="nav-item" 
             (click)="toggleMenu(item, $event)"
             [class.active]="item === activeMenu">
          <span>{{item.label}}</span>
        </div>
      </div>
    </nav>

    <div class="sidebar" [class.active]="activeSidebar">
      <div class="sidebar-header">
        <h3>{{activeMenu?.label}}</h3>
        <button class="close-btn" (click)="closeSidebar()">×</button>
      </div>
      <div class="sidebar-content">
        <ng-container *ngIf="activeMenu">
          <a *ngFor="let subItem of activeMenu.subItems" 
             [routerLink]="subItem.route"
             class="sidebar-item"
             routerLinkActive="active"
             (click)="closeSidebar()">
            {{subItem.label}}
          </a>
        </ng-container>
      </div>
    </div>

    <div class="sidebar-overlay" 
         [class.active]="activeSidebar" 
         (click)="closeSidebar()">
    </div>
  `,
  styles: [`
    :host {
      --primary: #1c5ba3;
      --primary-light: #2470c8;
      --primary-dark: #154882;
      --secondary: #04ac64;
      --secondary-light: #05d37a;
      --secondary-dark: #038951;
      --tertiary: #040471;
      --tertiary-light: #0505a1;
      --tertiary-dark: #03035c;
    }

    .burger-menu {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-right: 1rem;
      z-index: 101;

      .burger-line {
        width: 100%;
        height: 2px;
        background-color: white;
        transition: all 0.3s ease;
      }

      &:hover .burger-line {
        background-color: var(--secondary-light);
      }
    }

    .top-nav {
      background: var(--primary);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0.5rem 1rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
    }

    .nav-items {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .nav-item {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
      color: white;
      position: relative;

      &:hover {
        background-color: var(--primary-light);
      }

      &.active {
        background-color: var(--primary-light);
        
        &:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background-color: var(--secondary);
          border-radius: 2px;
        }
      }
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: -300px;
      width: 300px;
      height: 100vh;
      background: white;
      box-shadow: 2px 0 4px rgba(0,0,0,0.1);
      transition: left 0.3s ease;
      z-index: 1000;

      &.active {
        left: 0;
      }
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: var(--primary);
      color: white;
      border-bottom: 3px solid var(--secondary);

      h3 {
        margin: 0;
        font-weight: 500;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        color: white;
        
        &:hover {
          color: var(--secondary-light);
        }
      }
    }

    .sidebar-content {
      padding: 1rem;
    }

    .sidebar-item {
      display: block;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: var(--tertiary);
      border-radius: 4px;
      transition: all 0.3s;
      margin-bottom: 0.5rem;
      border-left: 3px solid transparent;

      &:hover {
        background-color: rgba(28, 91, 163, 0.1);
        border-left-color: var(--primary);
      }

      &.active {
        background-color: rgba(28, 91, 163, 0.15);
        border-left-color: var(--secondary);
        color: var(--primary);
        font-weight: 500;
      }
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(4, 4, 113, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      z-index: 999;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }

    @media (max-width: 768px) {
      .burger-menu {
        display: flex;
      }

      .nav-items {
        position: fixed;
        top: 56px; /* Height of top-nav */
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

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .nav-item {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  `]
})
export class NavMenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'EMPDS',
      subItems: [
        { label: 'Performance Agreement', route: '/empds/performance-agreement' },
        { label: 'EPMDS Workplan (Level 1-12)', route: '/empds/workplan-1-12' },
        { label: 'SMS Workplan (Level 13-16)', route: '/empds/workplan-13-16' },
        { label: 'Personal Development Plan', route: '/empds/pdp' },
        { label: 'September Review Form', route: '/empds/september-review' },
        { label: 'Performance Assessment', route: '/empds/assessment' },
        { label: 'Elementary Occupations', route: '/empds/elementary' },
        { label: 'Performance Development Plan (EO)', route: '/empds/pdp-eo' },
        { label: 'Workplan (EO)', route: '/empds/workplan-eo' },
        { label: 'Quarterly/Annual Assessment', route: '/empds/quarterly-assessment' }
      ]
    },
    {
      label: 'IAPPMS',
      subItems: [
        { label: 'MTSF Implementation Plan', route: '/iappms/mtsf', icon: '📊', description: 'Medium Term Strategic Framework Implementation Plan' },
        { label: 'Strategic Mapping', route: '/iappms/strategic-mapping', icon: '🗺️', description: 'Strategic Mapping of Provincial Priorities' },
        { label: 'Operational Plan', route: '/iappms/operational-plan', icon: '📋', description: 'Operational Planning and Management' },
        { label: 'Strategic Plan', route: '/iappms/strategic-plan', icon: '🎯', description: 'Strategic Planning and Development' },
        { label: 'Annual Performance Plan', route: '/iappms/annual', icon: '📅', description: 'Annual Performance Planning and Review' }
      ]
    },
    {
      label: 'ESS',
      subItems: [
        { label: 'Personal Information', route: '/ess/personal-info' },
        { label: 'Leave Management', route: '/ess/leave' },
        { label: 'Time Management', route: '/ess/time' },
        { label: 'Benefits', route: '/ess/benefits' },
        { label: 'Documents', route: '/ess/documents' }
      ]
    },
    {
      label: 'Reporting',
      subItems: [
        { label: 'Performance Reports', route: '/reports/performance' },
        { label: 'Assessment Reports', route: '/reports/assessment' },
        { label: 'ESS Reports', route: '/reports/ess' },
        { label: 'Custom Reports', route: '/reports/custom' },
        { label: 'Analytics Dashboard', route: '/reports/analytics' }
      ]
    }
  ];

  activeSidebar = false;
  activeMenu: MenuItem | null = null;
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.closeSidebar();
    }
  }

  toggleMenu(menu: MenuItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeMenu = menu;
    this.activeSidebar = true;
    if (window.innerWidth <= 768) {
      this.isMobileMenuOpen = false;
    }
  }

  closeSidebar(): void {
    this.activeSidebar = false;
  }
} 