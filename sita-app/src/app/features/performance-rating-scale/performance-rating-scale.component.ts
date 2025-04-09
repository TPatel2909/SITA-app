import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RatingScale {
  category: string;
  percentage: string;
  description: string;
  rating?: string;
}

@Component({
  selector: 'app-performance-rating-scale',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="rating-scale-container">
          <div class="section-header">
            <h2>PERFORMANCE RATING</h2>
          </div>

          <div class="table-container">
            <table class="rating-table">
              <thead>
                <tr>
                  <th class="col-category">Assessment Category</th>
                  <th class="col-percentage">%</th>
                  <th class="col-description">Description</th>
                  <th class="col-rating">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let scale of ratingScales">
                  <td class="category">{{scale.category}}</td>
                  <td class="percentage">{{scale.percentage}}</td>
                  <td class="description">{{scale.description}}</td>
                  <td class="rating"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="signatures-section">
            <div class="signature-line">
              <span>Employee : </span>
              <span class="signature-field">.................................</span>
              <span>Date:</span>
              <span class="signature-field">.................</span>
              <span>Supervisor: </span>
              <span class="signature-field">.........................</span>
              <span>Date</span>
              <span class="signature-field">................</span>
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
      --header-height: 64px;
    }

    .page-container {
      min-height: calc(100vh - var(--header-height));
      background-color: #f7fafc;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .rating-scale-container {
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
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
    }

    .table-container {
      margin: 1.5rem;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .rating-table {
      width: 100%;
      border-collapse: collapse;
      background: white;

      th, td {
        border: 1px solid var(--border-color);
        padding: 0.75rem;
        text-align: left;
        font-size: 0.875rem;
      }

      th {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 600;
        white-space: nowrap;
      }

      .col-category {
        width: 20%;
      }

      .col-percentage {
        width: 10%;
      }

      .col-description {
        width: 60%;
      }

      .col-rating {
        width: 10%;
      }

      .category {
        font-weight: 500;
      }

      .description {
        font-size: 0.875rem;
        line-height: 1.5;
      }
    }

    .signatures-section {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .signature-line {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
      font-size: 0.875rem;

      .signature-field {
        color: var(--text-light);
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .table-container {
        margin: 1rem;
        overflow-x: auto;
      }

      .rating-table {
        th, td {
          min-width: 120px;
        }

        .col-description {
          min-width: 300px;
        }
      }

      .signature-line {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class PerformanceRatingScaleComponent {
  readonly ratingScales: RatingScale[] = [
    {
      category: 'UNACCEPTABLE PERFORMANCE',
      percentage: '69% and below',
      description: 'Performance does not meet the standard expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against almost all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      category: 'PERFORMANCE NOT FULLY EFFECTIVE',
      percentage: '70% - 99%',
      description: 'Performance meets some of the standards expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      category: 'FULLY EFFECTIVE (and slightly above expectations)',
      percentage: '100% - 114%',
      description: 'Performance fully meets the standard expected in all areas of the job. The review / assessment indicates that the jobholder has achieved as a minimum effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      category: 'PERFORMANCE SIGNIFICANTLY ABOVE EXPECTATIONS',
      percentage: '115% - 129%\n130% - 149%',
      description: 'Performance is significantly higher than the standard expected in the job. The review/assessment indicates that the jobholder has achieved better than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan and fully achieved all others throughout the performance cycle.'
    },
    {
      category: 'OUTSTANDING PERFORMANCE',
      percentage: '150% - 167%',
      description: 'Performance far exceeds the standard expected of a jobholder at this level. The review/assessment indicates that the jobholder has achieved better than fully effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan and maintained this in all areas of responsibility throughout the performance cycle.'
    }
  ];
}
