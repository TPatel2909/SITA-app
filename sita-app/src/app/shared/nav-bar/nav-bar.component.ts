import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="logo.jpg" alt="SITA Logo" class="logo">
        <span class="brand-text">SITA App</span>
      </div>
      <div class="navbar-menu">
        <a *ngFor="let item of menuItems" 
           [routerLink]="item.route"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}">
          {{ item.label }}
        </a>
      </div>
      <div class="navbar-end">
        <button class="user-menu">
          <span class="user-icon">👤</span>
          <span class="user-name">John Doe</span>
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
      background: var(--gradient-primary);
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
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .navbar-menu {
      display: flex;
      gap: 1.5rem;

      a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        &.active {
          color: #ffffff;
          background: var(--gradient-accent);
          box-shadow: 0 2px 4px rgba(4, 172, 100, 0.2);
          transform: translateY(-1px);

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: #ffffff;
            opacity: 0.8;
          }
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
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        color: #ffffff;
        font-weight: 500;
        border-radius: 4px;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .user-icon {
          font-size: 1.2rem;
        }

        .user-name {
          color: #ffffff;
        }
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 0 1rem;
      }

      .navbar-menu {
        display: none;
      }

      .user-menu {
        .user-name {
          display: none;
        }
      }
    }
  `]
})
export class NavBarComponent {
  menuItems = [
    { label: 'EPMDS', route: '/epmds' },
    { label: 'IAPPMS', route: '/iappms' },
    { label: 'ESS', route: '/ess' },
    { label: 'Reporting', route: '/reporting' }
  ];
} 