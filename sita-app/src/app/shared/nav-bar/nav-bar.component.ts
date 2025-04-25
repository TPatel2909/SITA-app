import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  route: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <button class="burger-menu" (click)="toggleMenu()">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
      <div class="navbar-brand">
        <img src="C:\Users\TPatel\Sita5\SITA-app\sita-app\public\logo.jpg" alt="SITA Logo" class="logo">
        <span class="brand-text">SITA App</span>
      </div>
      <div class="navbar-menu" [class.active]="isMenuOpen">
        <div class="menu-item" *ngFor="let item of menuItems">
          <a [routerLink]="item.route"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: true}"
             (mouseenter)="showSubmenu(item)"
             (mouseleave)="hideSubmenu()">
            {{ item.label }}
          </a>
          <div class="submenu" *ngIf="item.subItems && activeMenuItem === item">
            <a *ngFor="let subItem of item.subItems"
               [routerLink]="subItem.route"
               routerLinkActive="active"
               class="submenu-item">
              <span class="icon" *ngIf="subItem.icon">{{ subItem.icon }}</span>
              <div class="submenu-content">
                <span class="label">{{ subItem.label }}</span>
                <span class="description" *ngIf="subItem.description">{{ subItem.description }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <button class="user-menu" (click)="logout()">
          <span class="user-icon">👤</span>
          <span class="user-name">Logout</span>
        </button>
      </div>
    </nav>
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

    .navbar {
      background: #ffffff;
      height: 64px;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(28, 91, 163, 0.2);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
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

      .burger-line {
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        transition: all 0.3s ease;
      }

      &:hover .burger-line {
        background-color: var(--accent-color);
      }
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .logo {
        height: 40px;
        width: auto;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .brand-text {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--primary-color);
      }
    }

    .navbar-menu {
      display: flex;
      gap: 1.5rem;
      position: relative;

      .menu-item {
        position: relative;

        a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: block;

          &:hover, &.active {
            color: var(--accent-color);
            background-color: var(--accent-light);
          }
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          z-index: 1000;
          padding: 0.5rem;
          display: none;

          .submenu-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            color: var(--text-color);
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.3s ease;

            &:hover {
              background-color: var(--accent-light);
              color: var(--accent-color);
            }

            .icon {
              margin-right: 0.75rem;
              font-size: 1.2rem;
            }

            .submenu-content {
              display: flex;
              flex-direction: column;

              .description {
                font-size: 0.8rem;
                color: var(--text-light);
                margin-top: 0.25rem;
              }
            }
          }
        }

        &:hover .submenu {
          display: block;
        }
      }
    }

    .navbar-end {
      .user-menu {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 1rem;
        border: none;
        background: var(--primary-light);
        cursor: pointer;
        color: var(--primary-color);
        font-weight: 500;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          background: var(--accent-light);
          color: var(--accent-color);
        }

        .user-icon {
          font-size: 1.2rem;
        }
      }
    }

    @media (max-width: 768px) {
      .burger-menu {
        display: flex;
      }

      .navbar-menu {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        &.active {
          display: flex;
        }

        .menu-item {
          width: 100%;

          a {
            width: 100%;
          }

          .submenu {
            position: static;
            box-shadow: none;
            padding: 0;
            margin-left: 1rem;
          }
        }
      }

      .user-menu .user-name {
        display: none;
      }
    }
  `]
})
export class NavBarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'EPMDS',
      route: '/epmds',
      subItems: [
        { label: 'Performance Agreement', route: '/epmds/performance' },
        { label: 'EPMDS Workplan (Level 1-12)', route: '/epmds/workplan' },
        { label: 'SMS Workplan (Level 13-16)', route: '/epmds/sms-workplan' },
        { label: 'Personal Development Plan', route: '/epmds/pdp' },
        { label: 'September Review Form', route: '/epmds/september-review' },
        { label: 'Performance Assessment', route: '/epmds/assessment' },
        { label: 'Elementary Occupations', route: '/epmds/elementary' },
        { label: 'Performance Development Plan (EO)', route: '/epmds/pdp-elementary' },
        { label: 'Assessment Factor 1', route: '/epmds/factor1' },
        { label: 'Assessment Criteria', route: '/epmds/criteria' },
        { label: 'Assessment Factor 2', route: '/epmds/factor2' },
        { label: 'Assessment Factor 3', route: '/epmds/factor3' },
        { label: 'Key Result Areas', route: '/epmds/kra' },
        { label: 'Generic Assessment Factors', route: '/epmds/gaf' },
        { label: 'Final Score', route: '/epmds/final-score' },
        { label: 'Quarterly/Annual Assessment', route: '/epmds/quarterly-assessment' }
      ]
    },
    {
      label: 'IAPPMS',
      route: '/iappms',
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
      route: '/ess',
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
      route: '/reporting',
      subItems: [
        { label: 'Performance Reports', route: '/reporting/performance' },
        { label: 'Assessment Reports', route: '/reporting/assessment' },
        { label: 'ESS Reports', route: '/reporting/ess' },
        { label: 'Custom Reports', route: '/reporting/custom' },
        { label: 'Analytics Dashboard', route: '/reporting/analytics' }
      ]
    }
  ];

  isMenuOpen = false;
  activeMenuItem: MenuItem | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showSubmenu(item: MenuItem) {
    this.activeMenuItem = item;
  }

  hideSubmenu() {
    this.activeMenuItem = null;
  }

  logout() {
    // TODO: Implement logout functionality
  }
} 