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
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="top-nav">
      <div class="nav-items">
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

    .top-nav {
      background: var(--primary);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0.5rem 1rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
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
      .nav-items {
        justify-content: flex-start;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        
        &::-webkit-scrollbar {
          display: none;
        }
      }

      .nav-item {
        padding: 0.5rem 1rem;
        white-space: nowrap;
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
        { label: 'Dashboard', route: '/iappms/dashboard' },
        { label: 'Settings', route: '/iappms/settings' }
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

  toggleMenu(menu: MenuItem, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeMenu = menu;
    this.activeSidebar = true;
  }

  closeSidebar(): void {
    this.activeSidebar = false;
  }
} 