import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

interface LeaveRequest {
  id: number;
  type: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
}

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="leave-container">
          <div class="section-header">
            <h2>Leave Management</h2>
          </div>

          <div class="leave-content">
            <!-- Leave Balance Section -->
            <div class="balance-section">
              <h3>Leave Balance</h3>
              <div class="balance-grid">
                <div *ngFor="let balance of leaveBalances" class="balance-card">
                  <div class="balance-type">{{ balance.type }}</div>
                  <div class="balance-details">
                    <div class="balance-item">
                      <span>Total</span>
                      <strong>{{ balance.total }} days</strong>
                    </div>
                    <div class="balance-item">
                      <span>Used</span>
                      <strong>{{ balance.used }} days</strong>
                    </div>
                    <div class="balance-item">
                      <span>Remaining</span>
                      <strong>{{ balance.remaining }} days</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Leave Requests Section -->
            <div class="requests-section">
              <div class="requests-header">
                <h3>Leave Requests</h3>
                <button class="btn-primary">New Request</button>
              </div>

              <div class="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Days</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let request of leaveRequests">
                      <td>{{ request.type }}</td>
                      <td>{{ request.startDate | date }}</td>
                      <td>{{ request.endDate | date }}</td>
                      <td>{{ request.days }}</td>
                      <td>
                        <span [class]="'status-badge ' + request.status">
                          {{ request.status }}
                        </span>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <button class="btn-icon" title="View">
                            <i class="material-icons">visibility</i>
                          </button>
                          <button class="btn-icon" title="Edit" *ngIf="request.status === 'pending'">
                            <i class="material-icons">edit</i>
                          </button>
                          <button class="btn-icon delete" title="Cancel" *ngIf="request.status === 'pending'">
                            <i class="material-icons">close</i>
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

    .leave-container {
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

    .leave-content {
      padding: 2rem;
    }

    .balance-section {
      margin-bottom: 2rem;

      h3 {
        color: var(--text-color);
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
    }

    .balance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .balance-card {
      background: var(--primary-light);
      border-radius: 8px;
      padding: 1.5rem;
    }

    .balance-type {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .balance-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .balance-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      span {
        font-size: 0.875rem;
        color: var(--text-light);
      }

      strong {
        color: var(--text-color);
      }
    }

    .requests-section {
      h3 {
        color: var(--text-color);
        font-size: 1.1rem;
      }
    }

    .requests-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .requests-table {
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

    .btn-primary {
      background-color: var(--accent-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #039d5a;
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

      .leave-content {
        padding: 1rem;
      }

      .balance-grid {
        grid-template-columns: 1fr;
      }

      .balance-details {
        grid-template-columns: repeat(3, 1fr);
      }

      .requests-table {
        th, td {
          padding: 0.75rem;
        }
      }
    }
  `]
})
export class LeaveComponent {
  leaveBalances: LeaveBalance[] = [
    { type: 'Annual Leave', total: 25, used: 10, remaining: 15 },
    { type: 'Sick Leave', total: 30, used: 5, remaining: 25 },
    { type: 'Family Responsibility', total: 5, used: 2, remaining: 3 }
  ];

  leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-04-19'),
      status: 'pending',
      days: 5
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: new Date('2024-03-10'),
      endDate: new Date('2024-03-11'),
      status: 'approved',
      days: 2
    },
    {
      id: 3,
      type: 'Family Responsibility',
      startDate: new Date('2024-02-20'),
      endDate: new Date('2024-02-20'),
      status: 'rejected',
      days: 1
    }
  ];
} 