import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing-container">
      <div class="welcome-card">
        <h1>Welcome to SITA</h1>
        <h2 *ngIf="user">Hello, {{ user.firstName }} {{ user.lastName }}</h2>
        <p class="subtitle">Your one-stop solution for efficient management</p>
        <div class="features">
          <div class="feature-card" (click)="navigateToDashboard()">
            <i class="material-icons">dashboard</i>
            <h3>EPMDS</h3>
            <p>Access your personalized dashboard for quick insights</p>
          </div>
          <div class="feature-card">
            <i class="material-icons">settings</i>
            <h3>Settings</h3>
            <p>Customize your preferences and manage your account</p>
          </div>
          <div class="feature-card">
            <i class="material-icons">help</i>
            <h3>Support</h3>
            <p>Get help and support whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
    }

    .welcome-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 100%;
      text-align: center;
    }

    h1 {
      color: var(--primary-color, #1c5ba3);
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    h2 {
      color: #333;
      font-size: 1.8rem;
      margin-bottom: 20px;
    }

    .subtitle {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 40px;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .feature-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      transition: transform 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        background: #e9ecef;
      }

      i {
        font-size: 2.5rem;
        color: var(--primary-color, #1c5ba3);
        margin-bottom: 15px;
      }

      h3 {
        color: #333;
        margin-bottom: 10px;
      }

      p {
        color: #666;
        font-size: 0.9rem;
      }
    }
  `]
})
export class LandingComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/epmds/dashboard']);
  }
} 