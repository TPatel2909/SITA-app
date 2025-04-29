import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title
);

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

interface PerformanceData {
  rating: string;
  count: number;
  color: string;
}

interface PayProgressionData {
  status: string;
  percentage: number;
  color: string;
}

interface BonusData {
  range: string;
  count: number;
}

interface DevelopmentActivity {
  activity: string;
  score: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class DashboardComponent implements OnInit, AfterViewInit {
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
      name: 'Performance Agreement',
      status: 'Completed',
      progress: 100,
      target: 100,
      variance: 0
    },
    {
      name: 'Workplan Development',
      status: 'Ongoing',
      progress: 75,
      target: 80,
      variance: -5
    },
    {
      name: 'September Review',
      status: 'Pending',
      progress: 0,
      target: 0,
      variance: 0
    },
    {
      name: 'Annual Assessment',
      status: 'Ongoing',
      progress: 60,
      target: 50,
      variance: 10
    },
    {
      name: 'Personal Development Plan',
      status: 'Completed',
      progress: 100,
      target: 95,
      variance: 5
    }
  ];

  performanceData: PerformanceData[] = [
    { rating: 'Below Expectations', count: 5, color: '#FF4444' },
    { rating: 'Meets Some', count: 15, color: '#FFBB33' },
    { rating: 'Fully Achieved', count: 45, color: '#00C851' },
    { rating: 'Exceeds', count: 20, color: '#33B5E5' },
    { rating: 'Outstanding', count: 10, color: '#AA66CC' }
  ];

  payProgressionData: PayProgressionData[] = [
    { status: 'Eligible', percentage: 70, color: '#00C851' },
    { status: 'Not Eligible', percentage: 30, color: '#FF4444' }
  ];

  bonusDistribution: BonusData[] = [
    { range: '0-5%', count: 20 },
    { range: '6-10%', count: 40 },
    { range: '11-15%', count: 30 },
    { range: '16-20%', count: 10 }
  ];

  budgetUtilization = {
    utilized: 65,
    remaining: 25,
    processing: 10
  };

  employeeSuggestions = {
    implemented: 25,
    underReview: 45,
    notImplemented: 15
  };

  developmentActivities: DevelopmentActivity[] = [
    { activity: 'Training', score: 4.2 },
    { activity: 'Mentoring', score: 3.8 },
    { activity: 'Coaching', score: 4.5 },
    { activity: 'Workshops', score: 3.9 },
    { activity: 'Self-Study', score: 4.1 }
  ];

  probationaryPerformance = {
    months: [1, 2, 3, 4],
    scores: [3.2, 3.5, 3.8, 4.1]
  };

  moderationRatings = {
    categories: ['Significantly Lower', 'Somewhat Lower', 'Fully Aligned', 'Somewhat Higher', 'Significantly Higher'],
    preModeration: [5, 15, 45, 25, 10],
    postModeration: [8, 20, 40, 22, 10]
  };

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
  }

  ngAfterViewInit(): void {
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
    this.createPerformanceChart();
    this.createPayProgressionChart();
    this.createBonusDistributionChart();
    this.createBudgetUtilizationChart();
    this.createEmployeeSuggestionsChart();
    this.createDevelopmentActivitiesChart();
    this.createProbationaryPerformanceChart();
    this.createModerationRatingsChart();
  }

  private createPerformanceChart(): void {
    new Chart('performanceChart', {
      type: 'bar',
      data: {
        labels: this.performanceData.map(d => d.rating),
        datasets: [{
          data: this.performanceData.map(d => d.count),
          backgroundColor: this.performanceData.map(d => d.color),
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Performance Ratings Distribution'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Employees'
            }
          }
        }
      }
    });
  }

  private createPayProgressionChart(): void {
    new Chart('payProgressionChart', {
      type: 'pie',
      data: {
        labels: this.payProgressionData.map(d => d.status),
        datasets: [{
          data: this.payProgressionData.map(d => d.percentage),
          backgroundColor: this.payProgressionData.map(d => d.color)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Pay Progression Status'
          }
        }
      }
    });
  }

  private createBonusDistributionChart(): void {
    new Chart('bonusChart', {
      type: 'bar',
      data: {
        labels: this.bonusDistribution.map(d => d.range),
        datasets: [{
          data: this.bonusDistribution.map(d => d.count),
          backgroundColor: '#3F51B5',
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Bonus Distribution'
          }
        }
      }
    });
  }

  private createBudgetUtilizationChart(): void {
    new Chart('budgetChart', {
      type: 'doughnut',
      data: {
        labels: ['Utilized', 'Remaining', 'Processing'],
        datasets: [{
          data: [
            this.budgetUtilization.utilized,
            this.budgetUtilization.remaining,
            this.budgetUtilization.processing
          ],
          backgroundColor: ['#00C851', '#FFBB33', '#33B5E5']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Incentive Budget Utilization'
          }
        }
      }
    });
  }

  private createEmployeeSuggestionsChart(): void {
    new Chart('suggestionsChart', {
      type: 'bar',
      data: {
        labels: ['Implemented', 'Under Review', 'Not Implemented'],
        datasets: [{
          data: [
            this.employeeSuggestions.implemented,
            this.employeeSuggestions.underReview,
            this.employeeSuggestions.notImplemented
          ],
          backgroundColor: ['#00C851', '#FFBB33', '#FF4444'],
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Employee Suggestions Status'
          }
        }
      }
    });
  }

  private createDevelopmentActivitiesChart(): void {
    new Chart('developmentChart', {
      type: 'radar',
      data: {
        labels: this.developmentActivities.map(d => d.activity),
        datasets: [{
          data: this.developmentActivities.map(d => d.score),
          backgroundColor: 'rgba(51, 181, 229, 0.2)',
          borderColor: '#33B5E5',
          pointBackgroundColor: '#33B5E5'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Development Activities'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }

  private createProbationaryPerformanceChart(): void {
    new Chart('probationaryChart', {
      type: 'line',
      data: {
        labels: this.probationaryPerformance.months.map(m => `Month ${m}`),
        datasets: [{
          data: this.probationaryPerformance.scores,
          borderColor: '#00C851',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Probationary Employees Performance'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }

  private createModerationRatingsChart(): void {
    new Chart('moderationChart', {
      type: 'bar',
      data: {
        labels: this.moderationRatings.categories,
        datasets: [
          {
            label: 'Pre-Moderation',
            data: this.moderationRatings.preModeration,
            backgroundColor: '#33B5E5'
          },
          {
            label: 'Post-Moderation',
            data: this.moderationRatings.postModeration,
            backgroundColor: '#FF4444'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Pre vs Post Moderation Ratings'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Employees'
            }
          }
        }
      }
    });
  }
} 