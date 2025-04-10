import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-performance-assessment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>PERFORMANCE ASSESSMENT INSTRUMENT</h2>
            <h3>Annual Performance Assessment Instrument</h3>
          </div>

          <div class="notice-box">
            The manager must forward the completed form to the Section: People Management for filing immediately after completion.
          </div>

          <div class="confidential-banner">
            CONFIDENTIAL
          </div>

          <form [formGroup]="assessmentForm">
            <!-- Personal Information Section -->
            <section class="form-section">
              <div class="form-grid">
                <mat-form-field>
                  <mat-label>Period under review</mat-label>
                  <input matInput formControlName="periodUnderReview">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Surname and initials</mat-label>
                  <input matInput formControlName="surnameInitials">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Job title</mat-label>
                  <input matInput formControlName="jobTitle">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Remuneration level</mat-label>
                  <input matInput formControlName="remunerationLevel">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Persal no.</mat-label>
                  <input matInput formControlName="persalNo">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Component</mat-label>
                  <input matInput formControlName="component">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Date of appointment to current remuneration level</mat-label>
                  <input matInput formControlName="appointmentDate">
                </mat-form-field>
              </div>

              <!-- Demographics Section -->
              <div class="demographics-section">
                <div class="race-section">
                  <label>Race:</label>
                  <mat-radio-group formControlName="race">
                    <mat-radio-button value="african">African</mat-radio-button>
                    <mat-radio-button value="coloured">Coloured</mat-radio-button>
                    <mat-radio-button value="indian">Indian</mat-radio-button>
                    <mat-radio-button value="white">White</mat-radio-button>
                  </mat-radio-group>
                </div>

                <div class="gender-section">
                  <label>Gender:</label>
                  <mat-radio-group formControlName="gender">
                    <mat-radio-button value="male">Male</mat-radio-button>
                    <mat-radio-button value="female">Female</mat-radio-button>
                  </mat-radio-group>
                </div>

                <div class="disability-section">
                  <mat-form-field>
                    <mat-label>Disability (Specify, if applicable)</mat-label>
                    <input matInput formControlName="disability">
                  </mat-form-field>
                </div>
              </div>

              <!-- Employment Status Section -->
              <div class="employment-status">
                <p>(Tick the appropriate box)</p>
                <mat-radio-group formControlName="employmentStatus">
                  <mat-radio-button value="probation">Probation</mat-radio-button>
                  <mat-radio-button value="extended">Extended probation</mat-radio-button>
                  <mat-radio-button value="permanent">Permanent</mat-radio-button>
                  <mat-radio-button value="contract">Contract</mat-radio-button>
                </mat-radio-group>
              </div>
            </section>

            <!-- Part 1 - Comments Section -->
            <section class="form-section">
              <h3>PART 1 – COMMENTS BY RATED EMPLOYEE</h3>
              <p class="section-note">(To be completed by the Employee prior to assessment. If the space provided is insufficient, the comments can be included in an attachment)</p>

              <div class="comments-section">
                <mat-form-field class="full-width">
                  <mat-label>1. During the past year my major accomplishments as they related to my performance agreement were:</mat-label>
                  <textarea matInput rows="4" formControlName="majorAccomplishments"></textarea>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>2. During the past year I was less successful in the following areas for the reasons stated:</mat-label>
                  <textarea matInput rows="4" formControlName="lessSuccessfulAreas"></textarea>
                </mat-form-field>
              </div>

              <!-- Signatures for Part 1 -->
              <div class="signatures-grid">
                <div class="signature-block">
                  <p>Employee:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeSignature">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeDate">
                  </mat-form-field>
                </div>
                <div class="signature-block">
                  <p>Supervisor:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorSignature">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorDate">
                  </mat-form-field>
                </div>
              </div>
            </section>

            <!-- Part 2 - Performance Assessment -->
            <section class="form-section">
              <h3>PART 2 – PERFORMANCE ASSESSMENT</h3>
              
              <!-- Rating Schedule -->
              <div class="rating-schedule">
                <h4>Standard Rating Schedule for KRAs and GAFs</h4>
                <table class="rating-table">
                  <thead>
                    <tr>
                      <th>Rating</th>
                      <th>Category</th>
                      <th>%</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>UNACCEPTABLE PERFORMANCE</td>
                      <td>69% and below</td>
                      <td>Performance does not meet the standard expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>PERFORMANCE NOT FULLY EFFECTIVE</td>
                      <td>70% - 99%</td>
                      <td>Performance meets some of the standards expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan.</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>FULLY EFFECTIVE (and slightly above expectations)</td>
                      <td>100% - 114%</td>
                      <td>Performance fully meets the standard expected in all areas of the job. The review/assessment indicates that the jobholder has achieved as a minimum effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>PERFORMANCE SIGNIFICANTLY ABOVE EXPECTATIONS</td>
                      <td>115% - 129%<br>130% - 149%</td>
                      <td>Performance is significantly higher than the standard expected in the job. The review/assessment indicates that the jobholder has achieved better than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan and fully achieved all others throughout the performance cycle.</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>OUTSTANDING PERFORMANCE</td>
                      <td>150% - 167%</td>
                      <td>Performance far exceeds the standard expected of a jobholder at this level. The review/assessment indicates that the jobholder has achieved better than fully effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan and maintained this in all areas of responsibility throughout the performance cycle.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- KRAs Assessment -->
              <div class="assessment-section">
                <h4>Rating of KRAs by Supervisor and Employee:</h4>
                <table class="assessment-table">
                  <thead>
                    <tr>
                      <th>KEY RESULT AREAS</th>
                      <th>Weight (%)</th>
                      <th>Own rating (1-5)</th>
                      <th>Supervisor Rating (1-5)</th>
                      <th>IRC Rating (1-5)</th>
                      <th>Mod. Com. Rating (1-5)</th>
                    </tr>
                  </thead>
                  <tbody formArrayName="kras">
                    <tr *ngFor="let i of [1,2,3,4,5]">
                      <td>{{i}}.</td>
                      <td><input matInput type="number"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                    </tr>
                    <tr>
                      <td>Total (NOTE: Weighting of KRAs must total 100%)</td>
                      <td>100%</td>
                      <td colspan="4"></td>
                    </tr>
                    <tr>
                      <td>Score according to calculator: Employees on level 1-12:</td>
                      <td>80%</td>
                      <td colspan="4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Signatures for Part 2 -->
              <div class="signatures-grid">
                <div class="signature-block">
                  <p>Employee:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeSignaturePart2">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeDatePart2">
                  </mat-form-field>
                </div>
                <div class="signature-block">
                  <p>Supervisor:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorSignaturePart2">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorDatePart2">
                  </mat-form-field>
                </div>
              </div>

              <!-- GAFs Assessment -->
              <div class="assessment-section">
                <h4>Rating of GAFs by Supervisor and Employee:</h4>
                <table class="assessment-table">
                  <thead>
                    <tr>
                      <th>GENERIC ASSESSMENT FACTORS - GAFs</th>
                      <th>Weight (%)</th>
                      <th>Own rating (1-5)</th>
                      <th>Supervisor rating (1-5)</th>
                      <th>IRC Rating (1-5)</th>
                      <th>Mod. Com. rating (1-5)</th>
                    </tr>
                  </thead>
                  <tbody formArrayName="gafs">
                    <tr *ngFor="let i of [1,2,3,4,5]">
                      <td>{{i}}.</td>
                      <td><input matInput type="number"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                      <td><input matInput type="number" min="1" max="5"></td>
                    </tr>
                    <tr>
                      <td>Total (NOTE: Weighting of GAFs must total 100%)</td>
                      <td>100%</td>
                      <td colspan="4"></td>
                    </tr>
                    <tr>
                      <td>Score according to calculator: GAFs employees on level 1-12:</td>
                      <td>20%</td>
                      <td colspan="4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Final Score -->
              <div class="final-score-section">
                <h4>FINAL SCORE</h4>
                <table class="assessment-table">
                  <thead>
                    <tr>
                      <th>GRAND TOTAL</th>
                      <th>OWN RATING</th>
                      <th>SUPERVISOR'S RATING</th>
                      <th>MODERATING COM'S RATING</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>KRA + GAF (80% + 20%) for levels 1-12</td>
                      <td><input matInput type="number"></td>
                      <td><input matInput type="number"></td>
                      <td><input matInput type="number"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Part 3 - Development Section -->
            <section class="form-section">
              <h3>PART 3 - DEVELOPMENT, TRAINING, COACHING, GUIDANCE AND EXPOSURE NEEDED</h3>
              <p class="section-note">(To be completed by Supervisor in consultation with Employee)</p>
              <mat-form-field class="full-width">
                <textarea matInput rows="6" formControlName="developmentNeeds"></textarea>
              </mat-form-field>

              <!-- Signatures for Part 3 -->
              <div class="signatures-grid">
                <div class="signature-block">
                  <p>Employee:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeSignaturePart3">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeDatePart3">
                  </mat-form-field>
                </div>
                <div class="signature-block">
                  <p>Supervisor:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorSignaturePart3">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorDatePart3">
                  </mat-form-field>
                </div>
              </div>
            </section>

            <!-- Part 4 - Final Comments -->
            <section class="form-section">
              <h3>PART 4</h3>

              <!-- Supervisor's Recommendation -->
              <div class="subsection">
                <h4>1. Supervisor's recommendation</h4>
                <mat-form-field class="full-width">
                  <textarea matInput rows="4" formControlName="supervisorRecommendation"></textarea>
                </mat-form-field>
                <div class="signature-block">
                  <p>Signature:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorSignaturePart4">
                  </mat-form-field>
                  <p>Name:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorNamePart4">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorDatePart4">
                  </mat-form-field>
                </div>
              </div>

              <!-- Employee's Comments -->
              <div class="subsection">
                <h4>2. Employee's comments:</h4>
                <mat-form-field class="full-width">
                  <textarea matInput rows="4" formControlName="employeeComments"></textarea>
                </mat-form-field>
                <div class="signature-block">
                  <p>Signature:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeSignaturePart4">
                  </mat-form-field>
                  <p>Name:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeNamePart4">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeDatePart4">
                  </mat-form-field>
                </div>
              </div>

              <!-- Moderating Committee Comments -->
              <div class="subsection">
                <h4>3. Comments of Chairperson of Moderating Committee:</h4>
                <mat-form-field class="full-width">
                  <textarea matInput rows="4" formControlName="moderatingComments"></textarea>
                </mat-form-field>
                <div class="signature-block">
                  <p>Signature:</p>
                  <mat-form-field>
                    <input matInput formControlName="chairpersonSignature">
                  </mat-form-field>
                  <p>Name:</p>
                  <mat-form-field>
                    <input matInput formControlName="chairpersonName">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="chairpersonDate">
                  </mat-form-field>
                </div>
              </div>

              <!-- Executive Authority Decision -->
              <div class="subsection">
                <h4>4. Decision by Executing Authority or her/his delegate:</h4>
                <mat-form-field class="full-width">
                  <textarea matInput rows="4" formControlName="executiveDecision"></textarea>
                </mat-form-field>
                <div class="signature-block">
                  <p>Signature:</p>
                  <mat-form-field>
                    <input matInput formControlName="executiveSignature">
                  </mat-form-field>
                  <p>Name:</p>
                  <mat-form-field>
                    <input matInput formControlName="executiveName">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput formControlName="executiveDate">
                  </mat-form-field>
                </div>
              </div>
            </section>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-button type="button" (click)="saveDraft()">Save Draft</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!assessmentForm.valid" (click)="onSubmit()">
                Submit Assessment
              </button>
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
      text-align: center;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 0.5rem;
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0;
      }
    }

    .notice-box {
      background: var(--primary-light);
      padding: 1rem;
      margin: 1.5rem;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
    }

    .confidential-banner {
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 1rem;
      background: var(--primary-light);
      color: var(--primary-color);
      margin: 1.5rem;
      border-radius: 4px;
    }

    .form-section {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);

      h3 {
        color: var(--primary-color);
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      h4 {
        color: var(--text-color);
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .demographics-section {
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--primary-light);
      border-radius: 4px;

      .mat-radio-group {
        display: flex;
        gap: 1rem;
        margin: 0.5rem 0;
      }
    }

    .employment-status {
      margin-top: 1.5rem;

      .mat-radio-group {
        display: flex;
        gap: 1.5rem;
        margin-top: 0.5rem;
      }
    }

    .section-note {
      font-style: italic;
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .assessment-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;

      th, td {
        border: 1px solid var(--border-color);
        padding: 0.75rem;
        text-align: left;
      }

      th {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }
    }

    .rating-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;

      th, td {
        border: 1px solid var(--border-color);
        padding: 0.75rem;
        text-align: left;
        font-size: 0.9rem;
      }

      th {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 500;
      }
    }

    .signatures-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .signature-block {
      p {
        margin-bottom: 0.5rem;
      }
    }

    .form-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      border-top: 1px solid var(--border-color);
    }

    .full-width {
      width: 100%;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .form-section {
        padding: 1rem;
      }

      .signatures-grid {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;

        button {
          width: 100%;
        }
      }

      .demographics-section {
        .mat-radio-group {
          flex-direction: column;
        }
      }

      .employment-status {
        .mat-radio-group {
          flex-direction: column;
        }
      }
    }
  `]
})
export class PerformanceAssessmentComponent {
  assessmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      periodUnderReview: ['', Validators.required],
      surnameInitials: ['', Validators.required],
      jobTitle: ['', Validators.required],
      remunerationLevel: ['', Validators.required],
      persalNo: ['', Validators.required],
      component: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      race: [''],
      gender: [''],
      disability: [''],
      employmentStatus: [''],
      majorAccomplishments: [''],
      lessSuccessfulAreas: [''],
      employeeSignature: [''],
      employeeDate: [''],
      supervisorSignature: [''],
      supervisorDate: [''],
      developmentNeeds: [''],
      supervisorRecommendation: [''],
      employeeComments: [''],
      moderatingComments: [''],
      executiveDecision: [''],
      // Additional signature fields for each part
      employeeSignaturePart2: [''],
      employeeDatePart2: [''],
      supervisorSignaturePart2: [''],
      supervisorDatePart2: [''],
      employeeSignaturePart3: [''],
      employeeDatePart3: [''],
      supervisorSignaturePart3: [''],
      supervisorDatePart3: [''],
      supervisorSignaturePart4: [''],
      supervisorNamePart4: [''],
      supervisorDatePart4: [''],
      employeeSignaturePart4: [''],
      employeeNamePart4: [''],
      employeeDatePart4: [''],
      chairpersonSignature: [''],
      chairpersonName: [''],
      chairpersonDate: [''],
      executiveSignature: [''],
      executiveName: [''],
      executiveDate: ['']
    });
  }

  saveDraft(): void {
    console.log('Saving draft:', this.assessmentForm.value);
    // Implement draft saving logic
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      console.log('Submitting form:', this.assessmentForm.value);
      // Implement form submission logic
    }
  }
} 