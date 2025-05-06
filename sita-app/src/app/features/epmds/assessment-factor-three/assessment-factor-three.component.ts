import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface AssessmentCriteria {
  id: number;
  criteria: string;
  ratings: {
    rating: number;
    description: string;
  }[];
}

@Component({
  selector: 'app-assessment-factor-three',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>ASSESSMENT FACTOR 3: CLIENT SERVICES</h2>
          </div>

          <div class="description-section">
            <p>The ability to render client services in a manner that ensures quality and promotes client satisfaction.</p>
          </div>

          <form [formGroup]="assessmentForm" class="assessment-form">
            <!-- Assessment Criteria Tables -->
            <div class="table-container">
              <!-- Dealing with Complaints and Enquiries -->
              <table class="assessment-table">
                <thead>
                  <tr>
                    <th colspan="6">ASSESSMENT CRITERIA 9: DEALING WITH COMPLAINTS AND ENQUIRIES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">1</div>
                        <div class="rating-description">Unwilling to respond to client complaints and enquiries.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">2</div>
                        <div class="rating-description">Needs prompting to address client complaints or to report enquiries.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">3</div>
                        <div class="rating-description">Will always address and/or report client complaints or enquiries. Is concerned about response time to clients.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">4</div>
                        <div class="rating-description">Demonstrates high responsiveness to client needs at all levels. Is prepared in many instances to assist clients with extra service delivery in times of need. Will only report complex issues for the supervisor to deal with.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">5</div>
                        <div class="rating-description">Excellent ability to address client complaints promptly and timeously. Demonstrates exceptional client services. Will occasionally report complex issues for the supervisor to deal with.</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="rating-input">
                        <label>Select Rating:</label>
                        <select formControlName="complaintsRating">
                          <option value="">Select...</option>
                          <option *ngFor="let i of [1,2,3,4,5]" [value]="i">{{i}}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Courtesy to Clients -->
              <table class="assessment-table">
                <thead>
                  <tr>
                    <th colspan="6">ASSESSMENT CRITERIA 10: COURTESY TO CLIENTS (INTERNAL AND EXTERNAL)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">1</div>
                        <div class="rating-description">Fails to treat clients courteously.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">2</div>
                        <div class="rating-description">Does not always treat clients courteously.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">3</div>
                        <div class="rating-description">Treats all clients courteously.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">4</div>
                        <div class="rating-description">Consistently treats all clients courteously and will in many cases exceed expectations.</div>
                      </div>
                    </td>
                    <td>
                      <div class="rating-cell">
                        <div class="rating-number">5</div>
                        <div class="rating-description">Performance in treating clients is exceptional, which ultimately promotes client satisfaction.</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="rating-input">
                        <label>Select Rating:</label>
                        <select formControlName="courtesyRating">
                          <option value="">Select...</option>
                          <option *ngFor="let i of [1,2,3,4,5]" [value]="i">{{i}}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Signature Section -->
            <div class="signature-section">
              <div class="signature-row">
                <div class="signature-field">
                  <label>Employee:</label>
                  <input type="text" formControlName="employeeSignature">
                </div>
                <div class="signature-field">
                  <label>Date:</label>
                  <input type="date" formControlName="employeeDate">
                </div>
                <div class="signature-field">
                  <label>Supervisor:</label>
                  <input type="text" formControlName="supervisorSignature">
                </div>
                <div class="signature-field">
                  <label>Date:</label>
                  <input type="date" formControlName="supervisorDate">
                </div>
              </div>
            </div>
          </form>
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
      background-color: #f5f5f5;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .assessment-container {
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
        text-align: center;
      }
    }

    .description-section {
      padding: 1rem;
      background: var(--primary-light);
      border-bottom: 1px solid var(--border-color);

      p {
        margin: 0;
        color: var(--text-color);
        font-style: italic;
      }
    }

    .assessment-form {
      padding: 1.5rem;
    }

    .table-container {
      margin-bottom: 2rem;
    }

    .assessment-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
      background: white;

      th {
        background: var(--primary-light);
        color: var(--primary-color);
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        border: 1px solid var(--border-color);
      }

      td {
        border: 1px solid var(--border-color);
        padding: 1rem;
        vertical-align: top;
      }
    }

    .rating-cell {
      .rating-number {
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }

      .rating-description {
        font-size: 0.875rem;
        color: var(--text-color);
      }
    }

    .rating-input {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;

      label {
        font-weight: 500;
        color: var(--text-color);
      }

      select {
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: white;
        min-width: 100px;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }
      }
    }

    .signature-section {
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }

    .signature-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .signature-field {
      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .signature-row {
        grid-template-columns: 1fr;
      }

      .rating-cell {
        .rating-description {
          font-size: 0.75rem;
        }
      }
    }
  `]
})
export class AssessmentFactorThreeComponent implements OnInit {
  assessmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      complaintsRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      courtesyRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Any initialization logic can go here
  }
} 