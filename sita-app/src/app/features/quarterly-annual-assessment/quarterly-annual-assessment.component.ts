import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quarterly-annual-assessment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>EPMDS</h2>
            <h3>PROBATION: QUARTERLY PERFORMANCE ASSESSMENT</h3>
          </div>

          <div class="notice-box">
            Employees on probation must be assessed on a quarterly basis using this form as the point of departure.
            <br>
            The manager must forward the completed form to the Section: People Management immediately after completion.
          </div>

          <div class="confidential-banner">
            CONFIDENTIAL
          </div>

          <form [formGroup]="assessmentForm">
            <!-- Basic Information Section -->
            <section class="form-section">
              <div class="info-grid">
                <div class="quarter-selector">
                  <label>Quarter:</label>
                  <div class="quarter-boxes">
                    <div *ngFor="let q of [1,2,3,4]" class="quarter-box">
                      <span>{{q}}</span>
                      <mat-radio-button [value]="q" formControlName="quarter"></mat-radio-button>
                    </div>
                  </div>
                </div>
                
                <mat-form-field class="full-width">
                  <mat-label>Name:</mat-label>
                  <input matInput formControlName="name">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>Rank:</mat-label>
                  <input matInput formControlName="rank">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>Component:</mat-label>
                  <input matInput formControlName="component">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>Date of appointment:</mat-label>
                  <input matInput [matDatepicker]="appointmentPicker" formControlName="dateOfAppointment">
                  <mat-datepicker-toggle matSuffix [for]="appointmentPicker"></mat-datepicker-toggle>
                  <mat-datepicker #appointmentPicker></mat-datepicker>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>Period of assessment:</mat-label>
                  <input matInput formControlName="periodOfAssessment">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>Persal No.:</mat-label>
                  <input matInput formControlName="persalNo">
                </mat-form-field>
              </div>
            </section>

            <!-- Part 1: Comments by Employee -->
            <section class="form-section">
              <h3>PART 1:</h3>
              <h4>COMMENTS BY EMPLOYEE</h4>
              <p class="section-note">(To be completed by Employee, prior to assessment. If the space provided is insufficient, the comments can be included in an attachment)</p>

              <div class="comments-section">
                <mat-form-field class="full-width">
                  <mat-label>1. During the past quarter my major accomplishments as they related to my job description/Performance Agreement were:</mat-label>
                  <textarea matInput rows="5" formControlName="majorAccomplishments"></textarea>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-label>2. During the past quarter I was less successful in the following areas for the reasons stated:</mat-label>
                  <textarea matInput rows="5" formControlName="lessSuccessfulAreas"></textarea>
                </mat-form-field>
              </div>

              <div class="signatures-grid">
                <div class="signature-block">
                  <p>Employee:</p>
                  <mat-form-field>
                    <input matInput formControlName="employeeSignature">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput [matDatepicker]="empDatePicker" formControlName="employeeDate">
                    <mat-datepicker-toggle matSuffix [for]="empDatePicker"></mat-datepicker-toggle>
                    <mat-datepicker #empDatePicker></mat-datepicker>
                  </mat-form-field>
                </div>
                <div class="signature-block">
                  <p>Supervisor:</p>
                  <mat-form-field>
                    <input matInput formControlName="supervisorSignature">
                  </mat-form-field>
                  <p>Date:</p>
                  <mat-form-field>
                    <input matInput [matDatepicker]="supDatePicker" formControlName="supervisorDate">
                    <mat-datepicker-toggle matSuffix [for]="supDatePicker"></mat-datepicker-toggle>
                    <mat-datepicker #supDatePicker></mat-datepicker>
                  </mat-form-field>
                </div>
              </div>
            </section>

            <!-- Part 2: Quarterly Performance Assessment -->
            <section class="form-section">
              <h3>QUARTERLY PERFORMANCE ASSESSMENT</h3>
              
              <div class="assessment-subsection">
                <h4>2.1 Supervisor's assessment of Key Result Areas (KRA's):</h4>
                <p class="reference-note">(Use the Performance Assessment Instrument in Annexure F)</p>
              </div>

              <div class="assessment-subsection">
                <h4>2.2 Supervisor's assessment of Generic Assessment Factors (GAFs):</h4>
                <p class="reference-note">(Use the Performance Assessment Instrument in Annexure F)</p>
              </div>

              <!-- Final Score Section -->
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
                      <td>KRA + GAF (80% + 20% for levels 1-12)</td>
                      <td><input matInput formControlName="ownRating"></td>
                      <td><input matInput formControlName="supervisorRating"></td>
                      <td>
                        <input matInput formControlName="moderatingRating">
                        <span class="note">If applicable</span>
                      </td>
                    </tr>
                    <tr>
                      <td>FINAL SCORE</td>
                      <td><input matInput formControlName="finalScoreOwn"></td>
                      <td><input matInput formControlName="finalScoreSupervisor"></td>
                      <td>
                        <input matInput formControlName="finalScoreModerating">
                        <span class="note">If applicable</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Part 3: Supervisor Section -->
            <section class="form-section">
              <h3>PART 3:</h3>
              <h4>TO BE COMPLETED BY THE SUPERVISOR</h4>

              <div class="supervisor-section">
                <mat-form-field class="full-width">
                  <mat-label>3.1 Employee to receive training for the following reasons:</mat-label>
                  <textarea matInput rows="4" formControlName="trainingReasons"></textarea>
                </mat-form-field>

                <div class="placement-section">
                  <h4>3.2 Is the Employee correctly placed,</h4>
                  <mat-radio-group formControlName="isCorrectlyPlaced">
                    <mat-radio-button value="yes">YES</mat-radio-button>
                    <mat-radio-button value="no">NO</mat-radio-button>
                  </mat-radio-group>
                </div>

                <div class="suitability-section">
                  <h4>3.3 Upon expiry of his/her probationary period do you anticipate that he/she will be suitable for a permanent appointment?</h4>
                  <mat-radio-group formControlName="suitableForPermanent">
                    <mat-radio-button value="yes">YES</mat-radio-button>
                    <mat-radio-button value="no">NO</mat-radio-button>
                  </mat-radio-group>
                  <p class="warning-note" *ngIf="assessmentForm.get('suitableForPermanent')?.value === 'no'">
                    If the employee is not correctly placed, please consult the Manager: People Management and Development.
                  </p>
                </div>

                <div class="recommendation-section">
                  <h4>3.4 Supervisor's recommendation/s at the end of the probationary period:</h4>
                  <p class="note">(Please complete either 3.4.1 or 3.4.2)</p>

                  <div class="recommendation-options">
                    <mat-radio-group formControlName="recommendationType">
                      <div class="option">
                        <mat-radio-button value="confirm">3.4.1</mat-radio-button>
                        <div class="confirmation-text" *ngIf="assessmentForm.get('recommendationType')?.value === 'confirm'">
                          I recommend the confirmation of
                          <mat-form-field class="inline-field">
                            <input matInput formControlName="confirmationName">
                          </mat-form-field>'s probation, in view of the employee's diligence and because his/her conduct has been uniformly satisfactory.
                        </div>
                      </div>

                      <div class="option">
                        <mat-radio-button value="extend">3.4.2</mat-radio-button>
                        <div class="extension-text" *ngIf="assessmentForm.get('recommendationType')?.value === 'extend'">
                          I recommend that
                          <mat-form-field class="inline-field">
                            <input matInput formControlName="extensionName">
                          </mat-form-field>'s probation be extended for a period of
                          <mat-select formControlName="extensionPeriod">
                            <mat-option value="three">three</mat-option>
                            <mat-option value="six">six</mat-option>
                            <mat-option value="nine">nine</mat-option>
                            <mat-option value="twelve">twelve</mat-option>
                          </mat-select>
                          months for the following reasons:
                          <mat-form-field class="full-width">
                            <textarea matInput rows="3" formControlName="extensionReasons"></textarea>
                          </mat-form-field>
                        </div>
                      </div>
                    </mat-radio-group>
                  </div>
                </div>

                <!-- Employee Comments Section -->
                <div class="employee-comments-section">
                  <h4>4. Employee's comments:</h4>
                  <mat-form-field class="full-width">
                    <textarea matInput rows="4" formControlName="employeeComments"></textarea>
                  </mat-form-field>
                  
                  <div class="signature-block">
                    <div class="signature-line">
                      <span>Signature:</span>
                      <mat-form-field>
                        <input matInput formControlName="employeeCommentsSignature">
                      </mat-form-field>
                    </div>
                    <div class="signature-line">
                      <span>Name:</span>
                      <mat-form-field>
                        <input matInput formControlName="employeeCommentsName">
                      </mat-form-field>
                    </div>
                    <div class="signature-line">
                      <span>Date:</span>
                      <mat-form-field>
                        <input matInput [matDatepicker]="commentDatePicker" formControlName="employeeCommentsDate">
                        <mat-datepicker-toggle matSuffix [for]="commentDatePicker"></mat-datepicker-toggle>
                        <mat-datepicker #commentDatePicker></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
                </div>

                <!-- Final Approval Section -->
                <div class="approval-section">
                  <h4>5. Recommendation/s in 3.4 approved in accordance with delegated authority.</h4>
                  <div class="signature-block">
                    <div class="signature-line">
                      <span>Signature:</span>
                      <mat-form-field>
                        <input matInput formControlName="approvalSignature">
                      </mat-form-field>
                    </div>
                    <div class="signature-line">
                      <span>Name:</span>
                      <mat-form-field>
                        <input matInput formControlName="approvalName">
                      </mat-form-field>
                    </div>
                    <div class="signature-line">
                      <span>Date:</span>
                      <mat-form-field>
                        <input matInput [matDatepicker]="approvalDatePicker" formControlName="approvalDate">
                        <mat-datepicker-toggle matSuffix [for]="approvalDatePicker"></mat-datepicker-toggle>
                        <mat-datepicker #approvalDatePicker></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
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
      font-style: italic;
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
        margin-bottom: 0.5rem;
      }

      h4 {
        color: var(--text-color);
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .quarter-selector {
      margin-bottom: 1rem;

      .quarter-boxes {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
      }

      .quarter-box {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .section-note {
      font-style: italic;
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .comments-section {
      margin-top: 1rem;

      .mat-form-field {
        margin-bottom: 1rem;
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

      .note {
        font-size: 0.9rem;
        color: var(--text-light);
        font-style: italic;
      }
    }

    .supervisor-section {
      .placement-section,
      .suitability-section {
        margin: 1.5rem 0;

        .mat-radio-group {
          display: flex;
          gap: 2rem;
          margin-top: 0.5rem;
        }
      }

      .warning-note {
        color: #e53e3e;
        font-style: italic;
        margin-top: 0.5rem;
      }
    }

    .recommendation-options {
      margin-top: 1rem;

      .option {
        margin-bottom: 1rem;
      }

      .inline-field {
        width: 200px;
        margin: 0 0.5rem;
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

      .quarter-selector {
        .quarter-boxes {
          flex-wrap: wrap;
        }
      }

      .supervisor-section {
        .mat-radio-group {
          flex-direction: column;
        }
      }
    }

    .btn-action {
      &:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
      }
      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class QuarterlyAnnualAssessmentComponent {
  assessmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      quarter: ['', Validators.required],
      name: ['', Validators.required],
      rank: ['', Validators.required],
      component: ['', Validators.required],
      dateOfAppointment: ['', Validators.required],
      periodOfAssessment: ['', Validators.required],
      persalNo: ['', Validators.required],
      
      // Part 1
      majorAccomplishments: ['', Validators.required],
      lessSuccessfulAreas: ['', Validators.required],
      employeeSignature: [''],
      employeeDate: [''],
      supervisorSignature: [''],
      supervisorDate: [''],

      // Part 2
      ownRating: [''],
      supervisorRating: [''],
      moderatingRating: [''],
      finalScoreOwn: [''],
      finalScoreSupervisor: [''],
      finalScoreModerating: [''],

      // Part 3
      trainingReasons: [''],
      isCorrectlyPlaced: ['', Validators.required],
      suitableForPermanent: ['', Validators.required],
      recommendationType: [''],
      confirmationName: [''],
      extensionName: [''],
      extensionPeriod: [''],
      extensionReasons: [''],
      
      // Employee Comments
      employeeComments: [''],
      employeeCommentsSignature: [''],
      employeeCommentsName: [''],
      employeeCommentsDate: [''],
      
      // Approval
      approvalSignature: [''],
      approvalName: [''],
      approvalDate: ['']
    });
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      console.log(this.assessmentForm.value);
      // Implement form submission logic
    }
  }

  saveDraft() {
    console.log('Saving draft:', this.assessmentForm.value);
    // Implement draft saving logic
  }
} 