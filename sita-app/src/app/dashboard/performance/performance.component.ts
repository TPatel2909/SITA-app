import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface JobDetails {
  persalNumber: string;
  component: string;
  unit: string;
  salaryLevel: string;
  notchMmsPackage: string;
  occupationalClassification: string;
  designation: string;
}

interface KRA {
  description: string;
  weight: number;
}

interface GAF {
  description: string;
  weight: number;
}

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="performance-container">
      <h1>ANNEXURE A</h1>
      <h2>PERFORMANCE AGREEMENT PROFORMA</h2>

      <div class="notice-box">
        <p>Following completion of this form, a copy must be forwarded to the Section: Human Resource Management (applicable component/unit).</p>
      </div>

      <form [formGroup]="performanceForm">
        <!-- Agreement Parties Section -->
        <section class="form-section">
          <h3>ENTERED INTO BY AND BETWEEN:</h3>
          <div class="form-group">
            <label>The Department of (ABC) herein represented by</label>
            <input type="text" formControlName="employerName" placeholder="Full name">
            <label>in her/his capacity as</label>
            <input type="text" formControlName="employerPosition" placeholder="Position">
            <p>(herein referred to as the Employer)</p>
          </div>

          <div class="form-group">
            <label>and</label>
            <input type="text" formControlName="employeeName" placeholder="Full name">
            <label>as the</label>
            <input type="text" formControlName="employeePosition" placeholder="Position">
            <p>of the Department of Public Service and Administration (herein referred to as the Employee)</p>
          </div>
        </section>

        <!-- Job Details Section -->
        <section class="form-section">
          <h3>JOB DETAILS</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Persal number:</label>
              <input type="text" formControlName="persalNumber">
            </div>
            <div class="form-group">
              <label>Component:</label>
              <input type="text" formControlName="component">
            </div>
            <div class="form-group">
              <label>Unit:</label>
              <input type="text" formControlName="unit">
            </div>
            <div class="form-group">
              <label>Salary level:</label>
              <input type="text" formControlName="salaryLevel">
            </div>
            <div class="form-group">
              <label>Notch (MMS package):</label>
              <input type="text" formControlName="notchMmsPackage">
            </div>
            <div class="form-group">
              <label>Occupational classification:</label>
              <input type="text" formControlName="occupationalClassification">
            </div>
            <div class="form-group">
              <label>Designation:</label>
              <input type="text" formControlName="designation">
            </div>
          </div>
        </section>

        <!-- Job Purpose Section -->
        <section class="form-section">
          <h3>JOB PURPOSE</h3>
          <div class="form-group">
            <textarea formControlName="jobPurpose" rows="4" 
                      placeholder="Describe the purpose of the job (overall focus) as it relates to the Vision and Mission of the Department. Capture the overall accountability that the job holder has in relation to his/her position."></textarea>
          </div>
        </section>

        <!-- KRAs Section -->
        <section class="form-section">
          <h3>KEY RESULT AREAS (KRAs)</h3>
          <div class="table-container">
            <table class="kra-table">
              <thead>
                <tr>
                  <th>KRAs</th>
                  <th>Weight</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody formArrayName="kras">
                <tr *ngFor="let kra of krasFormArray.controls; let i = index" [formGroupName]="i">
                  <td><input type="text" formControlName="description"></td>
                  <td><input type="number" formControlName="weight" min="0" max="100"></td>
                  <td>
                    <button type="button" (click)="removeKRA(i)" class="remove-btn">Remove</button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{{ getTotalKRAWeight() }}%</td>
                  <td>
                    <button type="button" (click)="addKRA()" class="add-btn">Add KRA</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <!-- GAFs Section -->
        <section class="form-section">
          <h3>GENERIC ASSESSMENT FACTORS (GAFs)</h3>
          <div class="table-container">
            <table class="gaf-table">
              <thead>
                <tr>
                  <th>GAFs</th>
                  <th>Weight</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody formArrayName="gafs">
                <tr *ngFor="let gaf of gafsFormArray.controls; let i = index" [formGroupName]="i">
                  <td><input type="text" formControlName="description"></td>
                  <td><input type="number" formControlName="weight" min="0" max="100"></td>
                  <td>
                    <button type="button" (click)="removeGAF(i)" class="remove-btn">Remove</button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{{ getTotalGAFWeight() }}%</td>
                  <td>
                    <button type="button" (click)="addGAF()" class="add-btn">Add GAF</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <!-- Signature Section -->
        <section class="form-section signatures">
          <div class="signature-row">
            <div class="signature-block">
              <p>Employee:</p>
              <div class="signature-line"></div>
              <p>Date:</p>
              <div class="date-line"></div>
            </div>
            <div class="signature-block">
              <p>Supervisor:</p>
              <div class="signature-line"></div>
              <p>Date:</p>
              <div class="date-line"></div>
            </div>
          </div>
        </section>

        <div class="form-actions">
          <button type="submit" (click)="onSubmit()" [disabled]="!performanceForm.valid">Submit Agreement</button>
          <button type="button" (click)="onSaveDraft()">Save Draft</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .performance-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1, h2 {
      text-align: center;
      color: #1c5ba3;
    }

    .notice-box {
      background: #f8f9fa;
      padding: 1rem;
      border-left: 4px solid #1c5ba3;
      margin: 1rem 0;
    }

    .form-section {
      margin: 2rem 0;
      padding: 1rem;
      border: 1px solid #dee2e6;
      border-radius: 4px;

      h3 {
        color: #1c5ba3;
        margin-bottom: 1rem;
      }
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #495057;
      }

      input, textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #1c5ba3;
          box-shadow: 0 0 0 2px rgba(28, 91, 163, 0.25);
        }
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .table-container {
      overflow-x: auto;
      margin: 1rem 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;

      th, td {
        padding: 0.75rem;
        border: 1px solid #dee2e6;
        text-align: left;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
      }
    }

    .signatures {
      margin-top: 2rem;
    }

    .signature-row {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
    }

    .signature-block {
      flex: 1;

      .signature-line {
        height: 1px;
        background: #000;
        margin: 1rem 0;
      }

      .date-line {
        height: 1px;
        background: #000;
        margin: 0.5rem 0;
      }
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;

      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;

        &[type="submit"] {
          background: #1c5ba3;
          color: white;

          &:hover {
            background: #134a82;
          }

          &:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        }

        &[type="button"] {
          background: #e9ecef;
          color: #495057;

          &:hover {
            background: #dee2e6;
          }
        }
      }
    }

    .add-btn, .remove-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }

    .add-btn {
      background: #28a745;
      color: white;

      &:hover {
        background: #218838;
      }
    }

    .remove-btn {
      background: #dc3545;
      color: white;

      &:hover {
        background: #c82333;
      }
    }

    .invalid-weight {
      color: #dc3545;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    @media (max-width: 768px) {
      .performance-container {
        padding: 1rem;
      }

      .signature-row {
        flex-direction: column;
      }
    }
  `]
})
export class PerformanceComponent implements OnInit {
  performanceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.performanceForm = this.fb.group({
      employerName: ['', Validators.required],
      employerPosition: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeePosition: ['', Validators.required],
      persalNumber: ['', Validators.required],
      component: ['', Validators.required],
      unit: ['', Validators.required],
      salaryLevel: ['', Validators.required],
      notchMmsPackage: ['', Validators.required],
      occupationalClassification: ['', Validators.required],
      designation: ['', Validators.required],
      jobPurpose: ['', Validators.required],
      kras: this.fb.array([]),
      gafs: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Initialize with empty KRA and GAF
    this.addKRA();
    this.addGAF();
  }

  // KRAs methods
  get krasFormArray() {
    return this.performanceForm.get('kras') as FormArray;
  }

  createKRA(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  addKRA() {
    this.krasFormArray.push(this.createKRA());
  }

  removeKRA(index: number) {
    this.krasFormArray.removeAt(index);
  }

  getTotalKRAWeight(): number {
    return this.krasFormArray.controls
      .reduce((total, control) => total + (control.get('weight')?.value || 0), 0);
  }

  // GAFs methods
  get gafsFormArray() {
    return this.performanceForm.get('gafs') as FormArray;
  }

  createGAF(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  addGAF() {
    this.gafsFormArray.push(this.createGAF());
  }

  removeGAF(index: number) {
    this.gafsFormArray.removeAt(index);
  }

  getTotalGAFWeight(): number {
    return this.gafsFormArray.controls
      .reduce((total, control) => total + (control.get('weight')?.value || 0), 0);
  }

  onSubmit() {
    if (this.performanceForm.valid) {
      const kraWeight = this.getTotalKRAWeight();
      const gafWeight = this.getTotalGAFWeight();

      if (kraWeight !== 100) {
        alert('Total KRA weight must equal 100%');
        return;
      }

      if (gafWeight !== 100) {
        alert('Total GAF weight must equal 100%');
        return;
      }

      console.log(this.performanceForm.value);
      // Handle form submission
    }
  }

  onSaveDraft() {
    console.log('Saving draft:', this.performanceForm.value);
    // Handle saving draft
  }
} 