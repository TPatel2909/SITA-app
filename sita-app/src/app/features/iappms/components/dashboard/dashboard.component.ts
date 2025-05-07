import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iappms-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Annual Performance Planning Dashboard</h1>
      <hr class="dashboard-divider" />
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-value">120</div>
          <div class="stat-label">Total Projects</div>
          <div class="stat-sub">Projects<br><span class="stat-target">Target: 130</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-value">80</div>
          <div class="stat-label">Completed Projects</div>
          <div class="stat-sub">Projects<br><span class="stat-target">Target: 85</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-value">30</div>
          <div class="stat-label">Ongoing Projects</div>
          <div class="stat-sub">Projects<br><span class="stat-target">Target: 35</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-value">10</div>
          <div class="stat-label">Pending Projects</div>
          <div class="stat-sub">Projects<br><span class="stat-target">Target: 10</span></div>
        </div>
      </div>
      <div class="dashboard-charts">
        <div class="chart-card">
          <div class="chart-title">Project Completion Over Time</div>
          <div class="chart-placeholder">[Line Chart Placeholder]</div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Resource Allocation vs Budget</div>
          <div class="chart-placeholder">[Bar Chart Placeholder]</div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Project Distribution by Department</div>
          <div class="chart-placeholder">[Pie Chart Placeholder]</div>
        </div>
      </div>
      <div class="dashboard-table-section">
        <div class="table-title">Detailed Project Data</div>
        <table class="dashboard-table">
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
              <td>10%</td>
              <td>+10%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      background: #f4f8fb;
      padding: 32px 16px;
      max-width: 1200px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(44, 62, 80, 0.05);
    }
    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2176ae;
      margin-bottom: 0.5rem;
      text-align: left;
    }
    .dashboard-divider {
      border: none;
      border-top: 4px solid #2176ae;
      margin-bottom: 2rem;
      width: 100%;
    }
    .dashboard-stats {
      display: flex;
      gap: 24px;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .stat-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(44, 62, 80, 0.08);
      padding: 24px 32px;
      flex: 1 1 200px;
      min-width: 180px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2176ae;
      margin-bottom: 0.25rem;
    }
    .stat-label {
      font-size: 1.1rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .stat-sub {
      font-size: 0.95rem;
      color: #888;
    }
    .stat-target {
      color: #2176ae;
      font-weight: 600;
    }
    .dashboard-charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 2rem;
    }
    .chart-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(44, 62, 80, 0.08);
      padding: 20px 16px 32px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 260px;
    }
    .chart-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2176ae;
      margin-bottom: 1rem;
      text-align: center;
    }
    .chart-placeholder {
      width: 90%;
      height: 160px;
      background: repeating-linear-gradient(135deg, #e3eaf2, #e3eaf2 10px, #f4f8fb 10px, #f4f8fb 20px);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #b0b8c1;
      font-size: 1rem;
      font-style: italic;
    }
    .dashboard-table-section {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(44, 62, 80, 0.08);
      padding: 24px 16px 32px 16px;
      margin-top: 2rem;
    }
    .table-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2176ae;
      margin-bottom: 1rem;
    }
    .dashboard-table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }
    .dashboard-table th, .dashboard-table td {
      border: 1px solid #e3eaf2;
      padding: 10px 12px;
      text-align: center;
      font-size: 1rem;
    }
    .dashboard-table th {
      background: #f4f8fb;
      color: #2176ae;
      font-weight: 700;
    }
    .dashboard-table tr:nth-child(even) {
      background: #f9fbfd;
    }
    @media (max-width: 900px) {
      .dashboard-stats {
        flex-direction: column;
        gap: 16px;
      }
      .dashboard-charts {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 600px) {
      .dashboard-container {
        padding: 8px;
      }
      .dashboard-title {
        font-size: 1.2rem;
      }
      .stat-card {
        padding: 16px 8px;
      }
      .chart-card {
        padding: 12px 4px 20px 4px;
      }
      .dashboard-table-section {
        padding: 8px 2px 16px 2px;
      }
      .table-title {
        font-size: 1rem;
      }
      .dashboard-table th, .dashboard-table td {
        font-size: 0.9rem;
        padding: 6px 4px;
      }
    }
  `]
})
export class DashboardComponent {} 