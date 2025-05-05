import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface KeyResultArea {
  title: string;
  weight: number;
  supervisorRating: number;
  ircRating: number;
  committeeRating: number;
}

@Component({
  selector: 'app-key-result-areas',
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
        <div class="kra-container">
          <div class="section-header">
            <h2>KEY RESULT AREAS</h2>
          </div>

          <form [formGroup]="kraForm">
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
              <table class="kra-table">
                <thead>
                  <tr>
                    <th>KEY RESULT AREAS</th>
                    <th>Weight (%)</th>
                    <th>Supervisor Rating (1-5)</th>
                    <th>IRC RATING</th>
                    <th>DEPARTMENTAL MODERATING COMMITTEE RATING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="5" class="category-header">JOB PERFORMANCE</td>
                  </tr>
                  <tr formGroupName="resourceUtilization">
                    <td>1. RESOURCE UTILIZATION</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="plansAndPrioritizes">
                    <td>2. PLANS AND PRIORITISES WORK</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="supervision">
                    <td>3. SUPERVISION</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="dedication">
                    <td>4. DEDICATION AND PRIDE IN WORK PERFORMANCE</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="responsibility">
                    <td>5. ACCEPTANCE OF ADDED RESPONSIBILITY</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="problemSolving">
                    <td>6. PROBLEM SOLVING</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr>
                    <td colspan="5" class="category-header">INTERPERSONAL RELATIONS</td>
                  </tr>
                  <tr formGroupName="acceptance">
                    <td>7. ACCEPTANCE BY/OF OTHERS (SENIORS, JUNIORS, PEERS & OTHERS)</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="conflict">
                    <td>8. DEALING WITH CONFLICT</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr>
                    <td colspan="5" class="category-header">CLIENT SERVICES</td>
                  </tr>
                  <tr formGroupName="complaints">
                    <td>9. DEALING WITH COMPLAINTS AND ENQUIRIES</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                  <tr formGroupName="courtesy">
                    <td>10. COURTESY TO CLIENTS (INTERNAL AND EXTERNAL)</td>
                    <td><input matInput type="number" formControlName="weight"></td>
                    <td><input matInput type="number" formControlName="supervisorRating" min="1" max="5"></td>
                    <td><input matInput type="number" formControlName="ircRating"></td>
                    <td><input matInput type="number" formControlName="committeeRating"></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total (NOTE: weighting of KRAs must total 100%)</td>
                    <td>{{totalWeight}}%</td>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>Score according to calculator:</td>
                    <td>80%</td>
                    <td colspan="3"></td>
                  </tr>
                  <tr>
                    <td>KRA's for Elementary Employees</td>
                    <td>80%</td>
                    <td colspan="3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="signatures-section">
              <div class="signature-row">
                <div class="signature-group">
                  <span>Employee Signature:</span>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="employeeSignature">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Date</mat-label>
                    <input matInput formControlName="employeeDate" type="date">
                  </mat-form-field>
                </div>

                <div class="signature-group">
                  <span>Supervisor Signature:</span>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="supervisorSignature">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Date</mat-label>
                    <input matInput formControlName="supervisorDate" type="date">
                  </mat-form-field>
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
  z-index: 900;
  max-width: 100%;
  background-color: #f5f5f5;
  padding-left: 0.25rem;
  padding-right: 2rem;
  padding-top: 1rem;
  width: 100%;
}

.content-wrapper {
  max-width: 1000px;
  z-index: 900;
  margin: 0 auto;
}

    .kra-container {
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

    .kra-table {
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

      .category-header {
        background: var(--primary-light);
        font-weight: 600;
        color: var(--primary-color);
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
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-weight: 500;
        color: var(--text-color);
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

      .kra-table {
        th, td {
          min-width: 120px;
        }
      }
    }
  `]
})
export class KeyResultAreasComponent {
  kraForm: FormGroup;
  totalWeight: number = 0;

  constructor(private fb: FormBuilder) {
    this.kraForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      assessmentPeriod: ['', Validators.required],
      resourceUtilization: this.createKRAGroup(),
      plansAndPrioritizes: this.createKRAGroup(),
      supervision: this.createKRAGroup(),
      dedication: this.createKRAGroup(),
      responsibility: this.createKRAGroup(),
      problemSolving: this.createKRAGroup(),
      acceptance: this.createKRAGroup(),
      conflict: this.createKRAGroup(),
      complaints: this.createKRAGroup(),
      courtesy: this.createKRAGroup(),
      employeeSignature: [''],
      employeeDate: [''],
      supervisorSignature: [''],
      supervisorDate: ['']
    });

    // Subscribe to weight changes
    Object.keys(this.kraForm.controls).forEach(key => {
      if (key !== 'employeeName' && key !== 'employeeNumber' && key !== 'jobTitle' && 
          key !== 'department' && key !== 'assessmentPeriod' && key !== 'employeeSignature' && 
          key !== 'employeeDate' && key !== 'supervisorSignature' && key !== 'supervisorDate') {
        this.kraForm.get(key)?.get('weight')?.valueChanges.subscribe(() => {
          this.calculateTotalWeight();
        });
      }
    });
  }

  createKRAGroup() {
    return this.fb.group({
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      supervisorRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      ircRating: [null],
      committeeRating: [null]
    });
  }

  calculateTotalWeight() {
    let total = 0;
    Object.keys(this.kraForm.controls).forEach(key => {
      if (key !== 'employeeName' && key !== 'employeeNumber' && key !== 'jobTitle' && 
          key !== 'department' && key !== 'assessmentPeriod' && key !== 'employeeSignature' && 
          key !== 'employeeDate' && key !== 'supervisorSignature' && key !== 'supervisorDate') {
        const weight = Number(this.kraForm.get(key)?.get('weight')?.value) || 0;
        total += weight;
      }
    });
    this.totalWeight = total;
  }

  onSubmit() {
    if (this.kraForm.valid && this.totalWeight === 100) {
      console.log(this.kraForm.value);
      // Handle form submission
    }
  }
} 