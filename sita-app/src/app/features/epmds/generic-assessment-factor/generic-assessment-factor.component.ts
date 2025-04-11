import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface GenericFactor {
  criteria: string;
  weight: number;
  supervisorRating: number;
  ircRating: number;
  committeeRating: number;
}

@Component({
  selector: 'app-generic-assessment-factor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>GENERIC ASSESSMENT FACTORS - GAFs</h2>
          </div>

          <form [formGroup]="assessmentForm">
            <div class="form-section">
              <div class="employee-info">
                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Employee Name</mat-label>
                    <input matInput formControlName="employeeName" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Employee Number</mat-label>
                    <input matInput formControlName="employeeNumber" required>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Job Title</mat-label>
                    <input matInput formControlName="jobTitle" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Department</mat-label>
                    <input matInput formControlName="department" required>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Assessment Period</mat-label>
                    <input matInput formControlName="assessmentPeriod" required>
                  </mat-form-field>
                </div>
              </div>
            </div>

            <div class="table-container">
              <table class="assessment-table">
                <thead>
                  <tr>
                    <th>GENERIC ASSESSMENT FACTORS - GAFs</th>
                    <th>Weight (%)</th>
                    <th>Supervisor Rating</th>
                    <th>IRC RATING (1-5) Annual</th>
                    <th>DEPARTMENTAL MODERATING COMMITTEE RATING</th>
                  </tr>
                </thead>
                <tbody formArrayName="factors">
                  <tr *ngFor="let factor of factorsArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      {{i + 1}}.
                      <mat-form-field appearance="outline" class="criteria-input">
                        <input matInput formControlName="criteria" placeholder="Enter criteria">
                      </mat-form-field>
                    </td>
                    <td>
                      <input type="number" formControlName="weight" class="weight-input">
                    </td>
                    <td>
                      <input type="number" formControlName="supervisorRating" class="rating-input" min="1" max="5">
                    </td>
                    <td>
                      <input type="number" formControlName="ircRating" class="rating-input">
                    </td>
                    <td>
                      <input type="number" formControlName="committeeRating" class="rating-input">
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total (NOTE: Weighting of GAFs must total 100%)</td>
                    <td>100%</td>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>Score according to calculator</td>
                    <td>20%</td>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>GAFs for Elementary Employees</td>
                    <td>20%</td>
                    <td colspan="3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="signatures-section">
              <div class="signature-row">
                <div class="signature-group">
                  <span>Employee : </span>
                  <span class="signature-line">.................................</span>
                  <span>Date:</span>
                  <span class="signature-line">.................</span>
                </div>

                <div class="signature-group">
                  <span>Supervisor: </span>
                  <span class="signature-line">.........................</span>
                  <span>Date</span>
                  <span class="signature-line">................</span>
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
      background-color: #f7fafc;
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
      }
    }

    .form-section {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      mat-form-field {
        flex: 1;
      }
    }

    .table-container {
      margin: 1.5rem;
      overflow-x: auto;
    }

    .assessment-table {
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

      .criteria-input {
        width: calc(100% - 20px);
        margin-left: 10px;
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

      .weight-input, .rating-input {
        width: 80px;
      }

      tfoot td {
        font-weight: 500;
        background: var(--primary-light);
      }
    }

    .signatures-section {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .signature-row {
      display: flex;
      gap: 2rem;
      justify-content: space-between;
    }

    .signature-group {
      flex: 1;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;

      span {
        font-weight: 500;
        color: var(--text-color);
      }

      .signature-line {
        color: var(--text-light);
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .form-row {
        flex-direction: column;
      }

      .signature-row {
        flex-direction: column;
        gap: 1rem;
      }

      .table-container {
        margin: 1rem;
      }

      .assessment-table {
        th, td {
          min-width: 120px;
        }
      }
    }
  `]
})
export class GenericAssessmentFactorComponent {
  assessmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      assessmentPeriod: ['', Validators.required],
      factors: this.fb.array([
        this.createFactorGroup(),
        this.createFactorGroup(),
        this.createFactorGroup(),
        this.createFactorGroup(),
        this.createFactorGroup()
      ])
    });
  }

  get factorsArray() {
    return this.assessmentForm.get('factors') as FormArray;
  }

  createFactorGroup() {
    return this.fb.group({
      criteria: [''],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      supervisorRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      ircRating: [null],
      committeeRating: [null]
    });
  }
} 