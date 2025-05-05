import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface PerformanceRating {
  rating: number;
  category: string;
  percentage: string;
  description: string;
}

@Component({
  selector: 'app-annual-performance-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>PERFORMANCE ASSESSMENT INSTRUMENT</h2>
            <h3>Annual Performance Assessment Instrument</h3>
          </div>

          <div class="confidential-notice">
            <p>The manager must forward the completed form to the Section: People Management for filing immediately after completion.</p>
            <h4>CONFIDENTIAL</h4>
          </div>

          <form [formGroup]="assessmentForm" class="assessment-form">
            <!-- Personal Information Section -->
            <div class="form-section">
              <div class="form-row">
                <label>Period under review</label>
                <input type="text" formControlName="periodUnderReview">
              </div>
              <div class="form-row">
                <label>Surname and initials</label>
                <input type="text" formControlName="surnameInitials">
              </div>
              <div class="form-row">
                <label>Job title</label>
                <input type="text" formControlName="jobTitle">
              </div>
              <div class="form-row">
                <label>Remuneration level</label>
                <input type="text" formControlName="remunerationLevel">
              </div>
              <div class="form-row">
                <label>Persal no.</label>
                <input type="text" formControlName="persalNo">
              </div>
              <div class="form-row">
                <label>Component</label>
                <input type="text" formControlName="component">
              </div>
              <div class="form-row">
                <label>Date of appointment to current remuneration level</label>
                <input type="date" formControlName="appointmentDate">
              </div>
            </div>

            <!-- Demographics Section -->
            <div class="form-section demographics">
              <div class="form-row">
                <label>Race</label>
                <div class="checkbox-group">
                  <label><input type="radio" formControlName="race" value="African"> African</label>
                  <label><input type="radio" formControlName="race" value="Coloured"> Coloured</label>
                  <label><input type="radio" formControlName="race" value="Indian"> Indian</label>
                  <label><input type="radio" formControlName="race" value="White"> White</label>
                </div>
              </div>
              <div class="form-row">
                <label>Gender</label>
                <div class="checkbox-group">
                  <label><input type="radio" formControlName="gender" value="Male"> Male</label>
                  <label><input type="radio" formControlName="gender" value="Female"> Female</label>
                </div>
              </div>
              <div class="form-row">
                <label>Disability</label>
                <input type="text" formControlName="disability" placeholder="Specify, if applicable">
              </div>
            </div>

            <!-- Employment Status Section -->
            <div class="form-section status-section">
              <p>Tick the appropriate box</p>
              <div class="checkbox-group">
                <label><input type="radio" formControlName="employmentStatus" value="Probation"> Probation</label>
                <label><input type="radio" formControlName="employmentStatus" value="Extended probation"> Extended probation</label>
                <label><input type="radio" formControlName="employmentStatus" value="Permanent"> Permanent</label>
                <label><input type="radio" formControlName="employmentStatus" value="Contract"> Contract</label>
              </div>
            </div>

            <!-- Part 1 - Comments Section -->
            <div class="form-section">
              <h3>PART 1 - COMMENTS BY RATED EMPLOYEE</h3>
              <p class="section-note">(To be completed by the Employee prior to assessment. If the space provided is insufficient, the comments can be included in an attachment)</p>
              
              <div class="form-row">
                <label>1. During the past year my major accomplishments as they related to my performance agreement were:</label>
                <textarea formControlName="majorAccomplishments" rows="4"></textarea>
              </div>
              
              <div class="form-row">
                <label>2. During the past year I was less successful in the following areas for the reasons stated:</label>
                <textarea formControlName="lessSuccessfulAreas" rows="4"></textarea>
              </div>
            </div>

            <!-- Part 2 - Performance Assessment -->
            <div class="form-section">
              <h3>PART 2 - PERFORMANCE ASSESSMENT</h3>
              
              <!-- Rating Schedule Table -->
              <div class="table-container">
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
                    <tr *ngFor="let rating of performanceRatings">
                      <td>{{rating.rating}}</td>
                      <td>{{rating.category}}</td>
                      <td>{{rating.percentage}}</td>
                      <td>{{rating.description}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- KRA Rating Table -->
              <div class="table-container">
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
                    <tr *ngFor="let kra of krasArray.controls; let i = index" [formGroupName]="i">
                      <td><input type="text" formControlName="area"></td>
                      <td><input type="number" formControlName="weight"></td>
                      <td><input type="number" formControlName="ownRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="supervisorRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="ircRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="modComRating" min="1" max="5"></td>
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

              <!-- GAF Rating Table -->
              <div class="table-container">
                <h4>Rating of GAFs by Supervisor and Employee:</h4>
                <table class="assessment-table">
                  <thead>
                    <tr>
                      <th>GENERIC ASSESSMENT FACTORS - GAFs</th>
                      <th>Weight (%)</th>
                      <th>Own rating (1-5)</th>
                      <th>Supervisor Rating (1-5)</th>
                      <th>IRC Rating (1-5)</th>
                      <th>Mod. Com. Rating (1-5)</th>
                    </tr>
                  </thead>
                  <tbody formArrayName="gafs">
                    <tr *ngFor="let gaf of gafsArray.controls; let i = index" [formGroupName]="i">
                      <td><input type="text" formControlName="factor"></td>
                      <td><input type="number" formControlName="weight"></td>
                      <td><input type="number" formControlName="ownRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="supervisorRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="ircRating" min="1" max="5"></td>
                      <td><input type="number" formControlName="modComRating" min="1" max="5"></td>
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

              <!-- Final Score Table -->
              <div class="table-container">
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
                      <td><input type="number" formControlName="finalOwnRating"></td>
                      <td><input type="number" formControlName="finalSupervisorRating"></td>
                      <td><input type="number" formControlName="finalModeratingRating"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Part 3 - Development Section -->
            <div class="form-section">
              <h3>PART 3 - DEVELOPMENT, TRAINING, COACHING, GUIDANCE AND EXPOSURE NEEDED</h3>
              <p class="section-note">(To be completed by Supervisor in consultation with Employee)</p>
              <textarea formControlName="developmentNeeds" rows="6"></textarea>
            </div>

            <!-- Part 4 - Comments and Recommendations -->
            <div class="form-section">
              <h3>PART 4</h3>
              
              <div class="form-row">
                <label>1. Supervisor's recommendation</label>
                <textarea formControlName="supervisorRecommendation" rows="4"></textarea>
                <div class="signature-row">
                  <div class="signature-field">
                    <label>Signature</label>
                    <input type="text" formControlName="supervisorSignature">
                  </div>
                  <div class="signature-field">
                    <label>Name</label>
                    <input type="text" formControlName="supervisorName">
                  </div>
                  <div class="signature-field">
                    <label>Date</label>
                    <input type="date" formControlName="supervisorDate">
                  </div>
                </div>
              </div>

              <div class="form-row">
                <label>2. Employee's comments:</label>
                <textarea formControlName="employeeComments" rows="4"></textarea>
                <div class="signature-row">
                  <div class="signature-field">
                    <label>Signature</label>
                    <input type="text" formControlName="employeeSignature">
                  </div>
                  <div class="signature-field">
                    <label>Name</label>
                    <input type="text" formControlName="employeeName">
                  </div>
                  <div class="signature-field">
                    <label>Date</label>
                    <input type="date" formControlName="employeeDate">
                  </div>
                </div>
              </div>

              <div class="form-row">
                <label>3. Comments of Chairperson of Moderating Committee:</label>
                <textarea formControlName="chairpersonComments" rows="4"></textarea>
                <div class="signature-row">
                  <div class="signature-field">
                    <label>Signature</label>
                    <input type="text" formControlName="chairpersonSignature">
                  </div>
                  <div class="signature-field">
                    <label>Name</label>
                    <input type="text" formControlName="chairpersonName">
                  </div>
                  <div class="signature-field">
                    <label>Date</label>
                    <input type="date" formControlName="chairpersonDate">
                  </div>
                </div>
              </div>

              <div class="form-row">
                <label>4. Decision by Executing Authority or her/his delegate:</label>
                <textarea formControlName="executingAuthorityDecision" rows="4"></textarea>
                <div class="signature-row">
                  <div class="signature-field">
                    <label>Signature</label>
                    <input type="text" formControlName="authoritySignature">
                  </div>
                  <div class="signature-field">
                    <label>Name</label>
                    <input type="text" formControlName="authorityName">
                  </div>
                  <div class="signature-field">
                    <label>Date</label>
                    <input type="date" formControlName="authorityDate">
                  </div>
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
      }

      h3 {
        font-size: 1.25rem;
        margin-top: 0.5rem;
      }
    }

    .confidential-notice {
      background: var(--primary-light);
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid var(--border-color);

      p {
        margin: 0;
        color: var(--text-color);
      }

      h4 {
        margin: 0.5rem 0 0;
        color: var(--primary-color);
      }
    }

    .form-section {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);

      h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }

      .section-note {
        font-style: italic;
        color: var(--text-light);
        margin-bottom: 1rem;
      }
    }

    .form-row {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
      }

      input[type="text"],
      input[type="number"],
      input[type="date"],
      textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }
      }

      textarea {
        resize: vertical;
      }
    }

    .checkbox-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
      }
    }

    .table-container {
      margin: 1.5rem 0;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      h4 {
        margin: 0 0 1rem;
        color: var(--primary-color);
      }
    }

    .rating-table,
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
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }
      }
    }

    .signature-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }

    .signature-field {
      label {
        font-size: 0.875rem;
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .signature-row {
        grid-template-columns: 1fr;
      }

      .checkbox-group {
        flex-direction: column;
      }
    }
  `]
})
export class AnnualPerformanceAssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  performanceRatings: PerformanceRating[] = [
    {
      rating: 1,
      category: 'UNACCEPTABLE PERFORMANCE',
      percentage: '69% and below',
      description: 'Performance does not meet the standard expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against almost all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      rating: 2,
      category: 'PERFORMANCE NOT FULLY EFFECTIVE',
      percentage: '70% - 99%',
      description: 'Performance meets some of the standards expected for the job. The review/assessment indicates that the jobholder has achieved less than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      rating: 3,
      category: 'FULLY EFFECTIVE (and slightly above expectations)',
      percentage: '100% - 114%',
      description: 'Performance fully meets the standard expected in all areas of the job. The review/assessment indicates that the jobholder has achieved as a minimum effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan.'
    },
    {
      rating: 4,
      category: 'PERFORMANCE SIGNIFICANTLY ABOVE EXPECTATIONS',
      percentage: '115% - 129%',
      description: 'Performance is significantly higher than the standard expected in the job. The review/assessment indicates that the jobholder has achieved better than fully effective results against more than half of the performance criteria and indicators as specified in the Performance Agreement and Workplan and fully achieved all others throughout the performance cycle.'
    },
    {
      rating: 5,
      category: 'OUTSTANDING PERFORMANCE',
      percentage: '150% - 167%',
      description: 'Performance far exceeds the standard expected of a jobholder at this level. The review/assessment indicates that the jobholder has achieved better than fully effective results against all of the performance criteria and indicators as specified in the Performance Agreement and Workplan and maintained this in all areas of responsibility throughout the performance cycle.'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      periodUnderReview: [''],
      surnameInitials: [''],
      jobTitle: [''],
      remunerationLevel: [''],
      persalNo: [''],
      component: [''],
      appointmentDate: [''],
      race: [''],
      gender: [''],
      disability: [''],
      employmentStatus: [''],
      majorAccomplishments: [''],
      lessSuccessfulAreas: [''],
      kras: this.fb.array([]),
      gafs: this.fb.array([]),
      finalOwnRating: [''],
      finalSupervisorRating: [''],
      finalModeratingRating: [''],
      developmentNeeds: [''],
      supervisorRecommendation: [''],
      supervisorSignature: [''],
      supervisorName: [''],
      supervisorDate: [''],
      employeeComments: [''],
      employeeSignature: [''],
      employeeName: [''],
      employeeDate: [''],
      chairpersonComments: [''],
      chairpersonSignature: [''],
      chairpersonName: [''],
      chairpersonDate: [''],
      executingAuthorityDecision: [''],
      authoritySignature: [''],
      authorityName: [''],
      authorityDate: ['']
    });
  }

  ngOnInit() {
    // Initialize 5 empty KRA rows
    for (let i = 0; i < 5; i++) {
      this.addKRA();
      this.addGAF();
    }
  }

  get krasArray() {
    return this.assessmentForm.get('kras') as FormArray;
  }

  get gafsArray() {
    return this.assessmentForm.get('gafs') as FormArray;
  }

  addKRA() {
    const kra = this.fb.group({
      area: [''],
      weight: [''],
      ownRating: [''],
      supervisorRating: [''],
      ircRating: [''],
      modComRating: ['']
    });
    this.krasArray.push(kra);
  }

  addGAF() {
    const gaf = this.fb.group({
      factor: [''],
      weight: [''],
      ownRating: [''],
      supervisorRating: [''],
      ircRating: [''],
      modComRating: ['']
    });
    this.gafsArray.push(gaf);
  }
} 