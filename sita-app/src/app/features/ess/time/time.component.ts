import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface TimeEntry {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  project: string;
  task: string;
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="time-container">
          <div class="section-header">
            <h2>Time Management</h2>
          </div>

          <div class="time-content">
            <!-- Time Summary Section -->
            <div class="summary-section">
              <div class="summary-grid">
                <div class="summary-card">
                  <div class="summary-title">Today's Hours</div>
                  <div class="summary-value">8.5</div>
                  <div class="summary-subtitle">hours logged</div>
                </div>
                <div class="summary-card">
                  <div class="summary-title">This Week</div>
                  <div class="summary-value">32.5</div>
                  <div class="summary-subtitle">of 40 hours</div>
                </div>
                <div class="summary-card">
                  <div class="summary-title">This Month</div>
                  <div class="summary-value">145</div>
                  <div class="summary-subtitle">of 160 hours</div>
                </div>
              </div>
            </div>

            <!-- Time Entries Section -->
            <div class="entries-section">
              <div class="entries-header">
                <h3>Time Entries</h3>
                <div class="header-actions">
                  <button class="btn-secondary">
                    <i class="material-icons">calendar_today</i>
                    Week View
                  </button>
                  <button class="btn-primary">
                    <i class="material-icons">add</i>
                    New Entry
                  </button>
                </div>
              </div>

              <div class="entries-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Project</th>
                      <th>Task</th>
                      <th>Hours</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let entry of timeEntries">
                      <td>{{ entry.date | date }}</td>
                      <td>{{ entry.startTime }} - {{ entry.endTime }}</td>
                      <td>{{ entry.project }}</td>
                      <td>{{ entry.task }}</td>
                      <td>{{ entry.hours }}</td>
                      <td>
                        <span [class]="'status-badge ' + entry.status">
                          {{ entry.status }}
                        </span>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <button class="btn-icon" title="Edit" *ngIf="entry.status === 'pending'">
                            <i class="material-icons">edit</i>
                          </button>
                          <button class="btn-icon delete" title="Delete" *ngIf="entry.status === 'pending'">
                            <i class="material-icons">delete</i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
      --text-color: #2d3748;
      --text-light: #718096;
      --bg-color: #ffffff;
      --border-color: #e2e8f0;
    }

    .page-container {
      padding: 2rem;
      background-color: #f7fafc;
      min-height: calc(100vh - 64px);
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .time-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .section-header {
      background: var(--primary-color);
      color: white;
      padding: 1.5rem;
      border-bottom: 3px solid var(--accent-color);

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
    }

    .time-content {
      padding: 2rem;
    }

    .summary-section {
      margin-bottom: 2rem;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .summary-card {
      background: var(--primary-light);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }

    .summary-title {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .summary-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-color);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .summary-subtitle {
      color: var(--text-light);
      font-size: 0.875rem;
    }

    .entries-section {
      h3 {
        color: var(--text-color);
        font-size: 1.1rem;
        margin: 0;
      }
    }

    .entries-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .entries-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          background: var(--bg-color);
          color: var(--text-color);
          font-weight: 600;
          white-space: nowrap;
        }

        td {
          color: var(--text-color);
        }
      }
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      text-transform: capitalize;

      &.pending {
        background-color: #fff3cd;
        color: #856404;
      }

      &.approved {
        background-color: #d4edda;
        color: #155724;
      }

      &.rejected {
        background-color: #f8d7da;
        color: #721c24;
      }
    }

    .btn-primary, .btn-secondary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      i {
        font-size: 1.25rem;
      }
    }

    .btn-primary {
      background-color: var(--accent-color);
      color: white;

      &:hover {
        background-color: #039d5a;
      }
    }

    .btn-secondary {
      background-color: var(--primary-light);
      color: var(--primary-color);

      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: var(--text-light);
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-color);
      }

      &.delete:hover {
        color: #dc3545;
      }

      i {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .time-content {
        padding: 1rem;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }

      .entries-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .header-actions {
        width: 100%;
        justify-content: space-between;
      }

      .entries-table {
        th, td {
          padding: 0.75rem;
        }
      }
    }
  `]
})
export class TimeComponent {
  timeEntries: TimeEntry[] = [
    {
      id: 1,
      date: new Date('2024-03-20'),
      startTime: '09:00',
      endTime: '17:30',
      project: 'SITA App Development',
      task: 'Frontend Implementation',
      hours: 8.5,
      status: 'pending'
    },
    {
      id: 2,
      date: new Date('2024-03-19'),
      startTime: '09:00',
      endTime: '17:00',
      project: 'SITA App Development',
      task: 'API Integration',
      hours: 8,
      status: 'approved'
    },
    {
      id: 3,
      date: new Date('2024-03-18'),
      startTime: '09:30',
      endTime: '18:00',
      project: 'SITA App Development',
      task: 'Bug Fixes',
      hours: 8.5,
      status: 'rejected'
    }
  ];
} 