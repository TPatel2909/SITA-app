import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from '../../shared/components/nav-menu/nav-menu.component';

interface ProjectStats {
  total: number;
  completed: number;
  ongoing: number;
  pending: number;
  totalTarget: number;
  completedTarget: number;
  ongoingTarget: number;
  pendingTarget: number;
}

interface ProjectData {
  name: string;
  status: 'Completed' | 'Ongoing' | 'Pending';
  progress: number;
  target: number;
  variance: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavMenuComponent],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  projectStats: ProjectStats = {
    total: 120,
    completed: 80,
    ongoing: 30,
    pending: 10,
    totalTarget: 125,
    completedTarget: 85,
    ongoingTarget: 35,
    pendingTarget: 15
  };

  projectData: ProjectData[] = [
    {
      name: 'Project A',
      status: 'Completed',
      progress: 100,
      target: 100,
      variance: 0
    },
    {
      name: 'Project B',
      status: 'Ongoing',
      progress: 75,
      target: 80,
      variance: -5
    },
    {
      name: 'Project C',
      status: 'Pending',
      progress: 0,
      target: 0,
      variance: 0
    },
    {
      name: 'Project D',
      status: 'Ongoing',
      progress: 60,
      target: 50,
      variance: 10
    },
    {
      name: 'Project E',
      status: 'Completed',
      progress: 100,
      target: 95,
      variance: 5
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/login']);
      } else {
        this.currentUser = user;
      }
    });
    this.initializeCharts();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getVarianceClass(variance: number): string {
    if (variance > 0) return 'positive';
    if (variance < 0) return 'negative';
    return 'neutral';
  }

  private initializeCharts(): void {
    // Initialize charts when charting library is added
    // Example: Chart.js, ngx-charts, or other preferred library
  }
} 