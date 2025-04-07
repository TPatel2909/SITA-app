import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface PerformanceAgreement {
  employerDetails: {
    fullName: string;
    position: string;
    department: string;
  };
  employeeDetails: {
    fullName: string;
    position: string;
  };
  jobDetails: {
    persalNumber: string;
    component: string;
    unit: string;
    salaryLevel: string;
    notchMmsPackage: string;
    occupationalClassification: string;
    designation: string;
  };
  kras: Array<{ description: string; weight: number }>;
  gafs: Array<{ description: string; weight: number }>;
  developmentAreas: string[];
}

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="performance-container">
      <div class="form-header">
        <h1>ANNEXURE A</h1>
        <h2>PERFORMANCE AGREEMENT PROFORMA</h2>
        
        <div class="notice-box">
          <p>Following completion of this form, a copy must be forwarded to the Section: 
          Human Resource Management (applicable component/unit).</p>
        </div>
      </div>

      <form [formGroup]="agreementForm" class="agreement-form">
        <!-- Agreement Parties -->
        <section class="form-section">
          <h3>ENTERED INTO BY AND BETWEEN:</h3>
          <div formGroupName="employerDetails" class="party-details">
            <div class="form-group">
              <label>The Department of</label>
              <input type="text" formControlName="department" placeholder="(ABC)">
              <label>herein represented by</label>
              <input type="text" formControlName="fullName" placeholder="Full name">
              <label>in her/his capacity as</label>
              <input type="text" formControlName="position" placeholder="Position">
              <p class="reference-text">(herein referred to as the Employer)</p>
            </div>
          </div>

          <div class="separator">and</div>

          <div formGroupName="employeeDetails" class="party-details">
            <div class="form-group">
              <input type="text" formControlName="fullName" placeholder="Full name">
              <label>as the</label>
              <input type="text" formControlName="position" placeholder="Position">
              <p class="reference-text">of the Department of Public Service and Administration (herein referred to as the Employee)</p>
            </div>
          </div>
        </section>

        <!-- Job Details -->
        <section class="form-section">
          <h3>JOB DETAILS</h3>
          <div formGroupName="jobDetails" class="job-details-grid">
            <div class="form-group">
              <label>Persal number</label>
              <input type="text" formControlName="persalNumber">
            </div>
            <div class="form-group">
              <label>Component</label>
              <input type="text" formControlName="component">
            </div>
            <div class="form-group">
              <label>Unit</label>
              <input type="text" formControlName="unit">
            </div>
            <div class="form-group">
              <label>Salary level</label>
              <input type="text" formControlName="salaryLevel">
            </div>
            <div class="form-group">
              <label>Notch (MMS package)</label>
              <input type="text" formControlName="notchMmsPackage">
            </div>
            <div class="form-group">
              <label>Occupational classification</label>
              <input type="text" formControlName="occupationalClassification">
            </div>
            <div class="form-group">
              <label>Designation</label>
              <input type="text" formControlName="designation">
            </div>
          </div>
        </section>

        <!-- Job Purpose -->
        <section class="form-section">
          <h3>JOB PURPOSE</h3>
          <div class="form-group">
            <textarea formControlName="jobPurpose" rows="4" 
                    placeholder="Describe the purpose of the job (overall focus) as it relates to the Vision and Mission of the Department. Capture the overall accountability that the job holder has in relation to his/her position."></textarea>
          </div>
        </section>

        <!-- KRAs -->
        <section class="form-section">
          <h3>KEY RESULT AREAS (KRAs)</h3>
          <div class="table-responsive">
            <table class="assessment-table">
              <thead>
                <tr>
                  <th>KRAs</th>
                  <th>Weight</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody formArrayName="kras">
                <tr *ngFor="let kra of krasArray.controls; let i = index" [formGroupName]="i">
                  <td><input type="text" formControlName="description"></td>
                  <td><input type="number" formControlName="weight" min="0" max="100"></td>
                  <td>
                    <button type="button" (click)="removeKRA(i)" class="btn-remove">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{{ calculateTotalWeight('kras') }}%</td>
                  <td>
                    <button type="button" (click)="addKRA()" class="btn-add">
                      Add KRA
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div *ngIf="calculateTotalWeight('kras') !== 100" class="weight-warning">
              Total weight must equal 100%
            </div>
          </div>
        </section>

        <!-- GAFs -->
        <section class="form-section">
          <h3>GENERIC ASSESSMENT FACTORS (GAFs)</h3>
          <div class="table-responsive">
            <table class="assessment-table">
              <thead>
                <tr>
                  <th>GAFs</th>
                  <th>Weight</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody formArrayName="gafs">
                <tr *ngFor="let gaf of gafsArray.controls; let i = index" [formGroupName]="i">
                  <td><input type="text" formControlName="description"></td>
                  <td><input type="number" formControlName="weight" min="0" max="100"></td>
                  <td>
                    <button type="button" (click)="removeGAF(i)" class="btn-remove">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{{ calculateTotalWeight('gafs') }}%</td>
                  <td>
                    <button type="button" (click)="addGAF()" class="btn-add">
                      Add GAF
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div *ngIf="calculateTotalWeight('gafs') !== 100" class="weight-warning">
              Total weight must equal 100%
            </div>
          </div>
        </section>

        <!-- Development Areas -->
        <section class="form-section">
          <h3>DEVELOPMENTAL REQUIREMENTS</h3>
          <div class="form-group">
            <p class="instruction-text">*ONLY ITEMISE DEVELOPMENT AREAS BELOW</p>
            <div formArrayName="developmentAreas">
              <div *ngFor="let area of developmentAreasArray.controls; let i = index" class="development-area">
                <input type="text" [formControlName]="i">
                <button type="button" (click)="removeDevelopmentArea(i)" class="btn-remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <button type="button" (click)="addDevelopmentArea()" class="btn-add">
              Add Development Area
            </button>
          </div>
        </section>

        <!-- Signatures -->
        <section class="form-section signatures">
          <h3>SIGNATURES OF PARTIES TO THE AGREEMENT</h3>
          <div class="signature-grid">
            <div class="signature-block">
              <p>Name of Employee:</p>
              <div class="signature-line"></div>
              <p>Signature:</p>
              <div class="signature-line"></div>
              <p>Date:</p>
              <div class="signature-line"></div>
            </div>
            <div class="signature-block">
              <p>Name of Supervisor:</p>
              <div class="signature-line"></div>
              <p>Signature:</p>
              <div class="signature-line"></div>
              <p>Date:</p>
              <div class="signature-line"></div>
            </div>
          </div>
        </section>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="saveDraft()">
            Save Draft
          </button>
          <button type="submit" class="btn-primary" (click)="submitForm()" [disabled]="!isFormValid()">
            Submit Agreement
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .performance-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .form-header {
      text-align: center;
      margin-bottom: 2rem;

      h1, h2 {
        color: #2c3e50;
        margin: 0;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      h2 {
        font-size: 1.5rem;
        color: #34495e;
      }
    }

    .notice-box {
      background: #f8f9fa;
      border-left: 4px solid #3498db;
      padding: 1rem;
      margin: 1rem 0;
      font-style: italic;
    }

    .form-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 6px;

      h3 {
        color: #2c3e50;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #3498db;
      }
    }

    .party-details {
      margin-bottom: 1.5rem;
    }

    .separator {
      text-align: center;
      margin: 1rem 0;
      font-weight: bold;
      color: #2c3e50;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-weight: 500;
      }

      input, textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #dce4ec;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
      }

      textarea {
        resize: vertical;
        min-height: 100px;
      }
    }

    .job-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .table-responsive {
      overflow-x: auto;
      margin: 1rem 0;
    }

    .assessment-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;

      th, td {
        padding: 1rem;
        border: 1px solid #dce4ec;
        text-align: left;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #2c3e50;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #dce4ec;
        border-radius: 4px;
      }
    }

    .weight-warning {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .development-area {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      align-items: center;
    }

    .signature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .signature-block {
      p {
        margin: 0.5rem 0;
        color: #2c3e50;
      }

      .signature-line {
        height: 1px;
        background: #bdc3c7;
        margin: 1rem 0;
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary, .btn-add, .btn-remove {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3498db;
      color: white;

      &:hover {
        background: #2980b9;
      }

      &:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
      }
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;

      &:hover {
        background: #7f8c8d;
      }
    }

    .btn-add {
      background: #2ecc71;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;

      &:hover {
        background: #27ae60;
      }
    }

    .btn-remove {
      background: #e74c3c;
      color: white;
      padding: 0.5rem;
      font-size: 0.875rem;

      &:hover {
        background: #c0392b;
      }
    }

    .reference-text {
      color: #7f8c8d;
      font-style: italic;
      margin: 0.5rem 0;
    }

    .instruction-text {
      color: #2c3e50;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .performance-container {
        padding: 1rem;
        margin: 1rem;
      }

      .signature-grid {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class PerformanceComponent implements OnInit {
  agreementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.agreementForm = this.fb.group({
      employerDetails: this.fb.group({
        department: ['', Validators.required],
        fullName: ['', Validators.required],
        position: ['', Validators.required]
      }),
      employeeDetails: this.fb.group({
        fullName: ['', Validators.required],
        position: ['', Validators.required]
      }),
      jobDetails: this.fb.group({
        persalNumber: ['', Validators.required],
        component: ['', Validators.required],
        unit: ['', Validators.required],
        salaryLevel: ['', Validators.required],
        notchMmsPackage: ['', Validators.required],
        occupationalClassification: ['', Validators.required],
        designation: ['', Validators.required]
      }),
      jobPurpose: ['', Validators.required],
      kras: this.fb.array([]),
      gafs: this.fb.array([]),
      developmentAreas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addKRA();
    this.addGAF();
    this.addDevelopmentArea();
  }

  // Getters for form arrays
  get krasArray() {
    return this.agreementForm.get('kras') as FormArray;
  }

  get gafsArray() {
    return this.agreementForm.get('gafs') as FormArray;
  }

  get developmentAreasArray() {
    return this.agreementForm.get('developmentAreas') as FormArray;
  }

  // KRA methods
  addKRA() {
    const kra = this.fb.group({
      description: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.krasArray.push(kra);
  }

  removeKRA(index: number) {
    this.krasArray.removeAt(index);
  }

  // GAF methods
  addGAF() {
    const gaf = this.fb.group({
      description: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.gafsArray.push(gaf);
  }

  removeGAF(index: number) {
    this.gafsArray.removeAt(index);
  }

  // Development Area methods
  addDevelopmentArea() {
    this.developmentAreasArray.push(this.fb.control('', Validators.required));
  }

  removeDevelopmentArea(index: number) {
    this.developmentAreasArray.removeAt(index);
  }

  // Utility methods
  calculateTotalWeight(arrayName: 'kras' | 'gafs'): number {
    return this[`${arrayName}Array`].controls
      .reduce((sum, control) => sum + (control.get('weight')?.value || 0), 0);
  }

  isFormValid(): boolean {
    return this.agreementForm.valid && 
           this.calculateTotalWeight('kras') === 100 &&
           this.calculateTotalWeight('gafs') === 100;
  }

  saveDraft() {
    console.log('Saving draft:', this.agreementForm.value);
    // Implement draft saving logic
  }

  submitForm() {
    if (this.isFormValid()) {
      console.log('Submitting form:', this.agreementForm.value);
      // Implement form submission logic
    }
  }
} 