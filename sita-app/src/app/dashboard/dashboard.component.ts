import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Annual Performance Planning Dashboard</h1>
      
      <!-- Statistics Cards -->
      <div class="stats-cards">
        <div class="stat-card total">
          <div class="stat-number">120</div>
          <div class="stat-label">Total Projects</div>
          <div class="stat-meta">Stage: 10</div>
        </div>

        <div class="stat-card completed">
          <div class="stat-number">80</div>
          <div class="stat-label">Completed Projects</div>
          <div class="stat-meta">Stage: 05</div>
        </div>

        <div class="stat-card ongoing">
          <div class="stat-number">30</div>
          <div class="stat-label">Ongoing Projects</div>
          <div class="stat-meta">Stage: 03</div>
        </div>

        <div class="stat-card pending">
          <div class="stat-number">10</div>
          <div class="stat-label">Pending Projects</div>
          <div class="stat-meta">Stage: 02</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-card">
          <div class="chart-header">
            <h2>Project Completion Over Time</h2>
          </div>
          <div class="chart-content">
            <div class="placeholder-chart">Chart visualization will be added here</div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h2>Resource Allocation vs Budget</h2>
          </div>
          <div class="chart-content">
            <div class="placeholder-chart">Chart visualization will be added here</div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h2>Project Distribution by Department</h2>
          </div>
          <div class="chart-content">
            <div class="placeholder-chart">Chart visualization will be added here</div>
          </div>
        </div>
      </div>

      <!-- Project Details Table -->
      <div class="table-card">
        <div class="table-header">
          <h2>Detailed Project Data</h2>
        </div>
        <div class="table-content">
          <table class="project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Target</th>
                <th>Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project A</td>
                <td>Completed</td>
                <td>100%</td>
                <td>100%</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>Project B</td>
                <td>Ongoing</td>
                <td>75%</td>
                <td>80%</td>
                <td>-5%</td>
              </tr>
              <tr>
                <td>Project C</td>
                <td>Pending</td>
                <td>0%</td>
                <td>0%</td>
                <td>0%</td>
              </tr>
            </tbody>
          </table>
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
      --warning-color: #ffa726;
      --danger-color: #ef5350;
      --background-color: #f8f9fa;
      --card-background: #ffffff;
      --text-color: #333333;
      --text-light: #666666;
      --border-color: #e0e0e0;
    }

    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background-color: var(--background-color);
      min-height: 100vh;
    }

    .dashboard-title {
      color: var(--primary-color);
      margin-bottom: 2rem;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      background: var(--card-background);

      &:hover {
        transform: translateY(-2px);
      }

      &.total {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        color: white;
      }

      &.completed {
        background: linear-gradient(135deg, var(--accent-color), #038a4f);
        color: white;
      }

      &.ongoing {
        background: linear-gradient(135deg, var(--warning-color), #fb8c00);
        color: white;
      }

      &.pending {
        background: linear-gradient(135deg, var(--danger-color), #e53935);
        color: white;
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        opacity: 0.9;
        margin-bottom: 0.5rem;
      }

      .stat-meta {
        font-size: 0.875rem;
        opacity: 0.8;
      }
    }

    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: var(--card-background);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .chart-header {
        margin-bottom: 1rem;
        
        h2 {
          color: var(--text-color);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
      }

      .chart-content {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color);
        border-radius: 4px;
      }

      .placeholder-chart {
        color: var(--text-light);
        font-size: 0.875rem;
      }
    }

    .table-card {
      background: var(--card-background);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .table-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);

        h2 {
          color: var(--text-color);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
      }

      .table-content {
        overflow-x: auto;
      }

      .project-table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          background-color: var(--primary-light);
          color: var(--primary-color);
          font-weight: 600;
          white-space: nowrap;
        }

        tr:hover {
          background-color: var(--primary-light);
        }

        td {
          color: var(--text-color);
        }
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .charts-section {
        grid-template-columns: 1fr;
      }

      .stat-card {
        padding: 1rem;
      }

      .table-card {
        .table-header {
          padding: 1rem;
        }

        .project-table {
          th, td {
            padding: 0.75rem 1rem;
          }
        }
      }
    }
  `]
})
export class DashboardComponent {} 