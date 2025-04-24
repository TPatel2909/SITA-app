import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

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

interface RatingScale {
  rating: number;
  category: string;
  percentage: string;
  description: string;
}

@Component({
  selector: 'app-performance',
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
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="performance-container">
          <div class="section-header">
            <h2>ANNEXURE A</h2>
            <h3>PERFORMANCE AGREEMENT PROFORMA</h3>
          </div>

          <div class="notice-box">
            Following completion of this form, a copy must be forwarded to the Section: Human Resource Management (applicable component/unit).
          </div>

          <form [formGroup]="agreementForm">
            <!-- Agreement Parties Section -->
            <section class="form-section">
              <h3>ENTERED INTO BY AND BETWEEN:</h3>
              <div class="employer-section">
                <p>The Department of (ABC) herein represented by</p>
                <mat-form-field class="full-width">
                  <input matInput placeholder="Full name" formControlName="employerFullName">
                </mat-form-field>
                <p>in her/his capacity as</p>
                <mat-form-field class="full-width">
                  <input matInput placeholder="Position" formControlName="employerPosition">
                </mat-form-field>
                <p>(position) of the Department of (ABC)</p>
                <p>(herein referred to as the Employer)</p>
              </div>

              <div class="separator">and</div>

              <div class="employee-section">
                <mat-form-field class="full-width">
                  <input matInput placeholder="Full name" formControlName="employeeFullName">
                </mat-form-field>
                <p>as the</p>
                <mat-form-field class="full-width">
                  <input matInput placeholder="Position" formControlName="employeePosition">
                </mat-form-field>
                <p>(position) of the Department of Public Service and Administration</p>
                <p>(herein referred to as the Employee)</p>
              </div>
            </section>

            <!-- Agreement Terms Section -->
            <section class="form-section">
              <h3>WHEREBY IT IS AGREED AS FOLLOWS:</h3>
              
              <!-- 1. Purpose -->
              <div class="subsection">
                <h4>1. PURPOSE</h4>
                <div class="numbered-item">
                  <p>1.1 The purpose of entering into this agreement is to communicate to the Employee the performance expectations of the Employer.</p>
                </div>
                <div class="numbered-item">
                  <p>1.2 The performance agreement and accompanying work plan shall be used as the basis for assessing the suitability of the Employee for permanent employment (if on probation); and to assess whether the Employee has met the performance expectations applicable to his/her job. In the event that the Employee has significantly exceeded the performance expectations, he/she may qualify for appropriate rewards. Details are outlined in the Department's Performance Management and Development System.</p>
                </div>
                <div class="numbered-item">
                  <p>1.3 Should any non-agreement arise between the Employer and the Employee member in respect of matters regulated by this agreement, the process outlined in paragraph 8.5 of the EPMDS should be followed. If this process fails, the employee may apply the formal grievance rules of the Public Service (published in Government Notice R1012 of 25 July 2003).</p>
                </div>
              </div>

              <!-- 2. Validity -->
              <div class="subsection">
                <h4>2. VALIDITY OF THE AGREEMENT</h4>
                <div class="numbered-item">
                  <p>2.1 The agreement will be valid for the period 1 April 2..... to 31 March 2.....</p>
                </div>
                <div class="numbered-item">
                  <p>2.2 The content of the agreement may be revised at any time during the above-mentioned period to determine the applicability of the matters agreed upon, especially where changes are significant.</p>
                </div>
                <div class="numbered-item">
                  <p>2.3 If at any time during the validity of this agreement the work environment of the Department of (ABC) (whether as a result of Government or Management decisions or otherwise), to the extent that the contents of this agreement are no longer appropriate, the contents shall immediately be revised.</p>
                </div>
              </div>

              <!-- 3. Job Details -->
              <div class="subsection">
                <h4>3. JOB DETAILS</h4>
                <div class="job-details-grid">
                  <mat-form-field>
                    <mat-label>Persal number</mat-label>
                    <input matInput formControlName="persalNumber">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Component</mat-label>
                    <input matInput formControlName="component">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Unit</mat-label>
                    <input matInput formControlName="unit">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Salary level</mat-label>
                    <input matInput formControlName="salaryLevel">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Notch (MMS package)</mat-label>
                    <input matInput formControlName="notchMmsPackage">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Occupational classification</mat-label>
                    <input matInput formControlName="occupationalClassification">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Designation</mat-label>
                    <input matInput formControlName="designation">
                  </mat-form-field>
                </div>
              </div>

              <!-- 4. Job Purpose -->
              <div class="subsection">
                <h4>4. JOB PURPOSE</h4>
                <mat-form-field class="full-width">
                  <textarea matInput rows="4" placeholder="Describe the purpose of the job (overall focus) as it relates to the Vision and Mission of the Department. Capture the overall accountability that the job holder has in relation to his/her position." formControlName="jobPurpose"></textarea>
                </mat-form-field>
              </div>

              <!-- 5. Reporting Requirements -->
              <div class="subsection">
                <h4>5. REPORTING REQUIREMENTS/LINES & ASSESSMENT LINES</h4>
                <div class="numbered-item">
                  <p>5.1 The Employee member shall report to the ................... (job title in Department) as her/his supervisor on all parts of this agreement. The Employee shall:</p>
                  <ul>
                    <li>Timeously alert the supervisor of any emerging factors that could preclude the achievement of any performance agreement undertakings, including the contingency measures that she/he proposes to take to ensure the impact of such deviation from the original agreement is minimised.</li>
                    <li>Establish and maintain appropriate internal controls and reporting systems in order to meet performance expectations.</li>
                    <li>Discuss and thereafter document for the record and future use any revision of targets as necessary as well as progress made towards the achievement of performance agreement measures.</li>
                  </ul>
                </div>
                <div class="numbered-item">
                  <p>5.2 In turn the supervisor shall:</p>
                  <ul>
                    <li>Meet to provide feedback on performance and to identify areas for development at least four times a year.</li>
                    <li>Create an enabling environment to facilitate effective performance by the Employee member.</li>
                    <li>Facilitate access to skills development and capacity building opportunities.</li>
                    <li>Work collaboratively to solve problems and generate solutions to common problems within the department, that may be impacting on the performance of the Employee.</li>
                  </ul>
                </div>
              </div>

              <!-- 6. Performance Assessment Framework -->
              <div class="subsection">
                <h4>6. PERFORMANCE ASSESSMENT FRAMEWORK</h4>
                <p>Performance will be assessed according to the information contained in the WORKPLAN and the Generic Assessment Factors (GAFs) framework.</p>
                
                <div class="numbered-item">
                  <p>6.1 The KRAs and GAFs during the period of this agreement shall be as set out in the table below.</p>
                </div>

                <div class="numbered-item">
                  <p>6.2 The Employee member undertakes to focus and to actively work towards the promotion and implementation of the KRAs within the framework of the laws and regulations governing the Public Service. The specific duties/outputs required under each of the KRAs are outlined in the attached work plan. KRAs should include all special projects the Employee is involved in. The WORKPLAN should outline the Employee's specific responsibilities in such projects.</p>
                </div>

                <!-- KRAs Table -->
                <div class="table-container">
                  <table class="assessment-table">
                    <thead>
                      <tr>
                        <th>KRAs</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody formArrayName="kras">
                      <tr *ngFor="let kra of krasArray.controls; let i = index" [formGroupName]="i">
                        <td>
                          <mat-form-field class="full-width">
                            <input matInput formControlName="description">
                          </mat-form-field>
                        </td>
                        <td>
                          <mat-form-field>
                            <input matInput type="number" formControlName="weight">
                          </mat-form-field>
                        </td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>100%</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="table-note">NOTE: WEIGHTING OF KRAs MUST TOTAL 100%</div>
                </div>

                <div class="numbered-item">
                  <p>6.3 The Employee's assessment will be based on her/his performance in relation to the duties/outputs outlined in the attached WORKPLAN as well as the GAFs marked here-under. At least five GAFs, inclusive of any that may become prescribed from time to time, should be selected from the list that are deemed to be critical for the Employee's specific job.</p>
                </div>

                <!-- GAFs Table -->
                <div class="table-container">
                  <table class="assessment-table">
                    <thead>
                      <tr>
                        <th>GAFs</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody formArrayName="gafs">
                      <tr *ngFor="let gaf of gafsArray.controls; let i = index" [formGroupName]="i">
                        <td>
                          <mat-form-field class="full-width">
                            <input matInput formControlName="description">
                          </mat-form-field>
                        </td>
                        <td>
                          <mat-form-field>
                            <input matInput type="number" formControlName="weight">
                          </mat-form-field>
                        </td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>100%</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="table-note">NOTE: WEIGHTING OF GAFs MUST TOTAL 100%</div>
                </div>
              </div>

              <!-- 7. Conditions of Performance -->
              <div class="subsection">
                <h4>7. CONDITIONS OF PERFORMANCE</h4>
                <p>The Employer shall provide the Employee with the necessary resources and leadership to perform in terms of this agreement. Resource requirements should be outlined in the WORKPLANS of components and individual Employees.</p>
              </div>

              <!-- 8. Performance Assessment -->
              <div class="subsection">
                <h4>8. PERFORMANCE ASSESSMENT</h4>
                <p>The assessment of an Employee shall be based on her/his performance in relation to the KRAs and GAFs and performance indicators, as set out in this PERFORMANCE AGREEMENT and attached WORKPLAN.</p>
                <p>The performance of the employee in respect of all individual KRAs and all individual GAFs will be assessed using a 5 point rating scale, i.e.:</p>
                <div class="rating-scale">
                  <p>5= OUTSTANDING PERFORMANCE</p>
                  <p>4= PERFORMANCE SIGNIFICANTLY ABOVE EXPECTATIONS</p>
                  <p>3= FULLY EFFECTIVE</p>
                  <p>2= PERFORMANCE NOT FULLY EFFECTIVE</p>
                  <p>1= UNACCEPTABLE PERFORMANCE</p>
                </div>
                <p>The total KRAs and the total GAFs scores are combined to produce an overall performance percentage score with percentage ranges that coincide with the above 5 point assessment scale.</p>
                <p class="important-note">Employees: KRAs shall contribute 80% and GAF's 20% of the final assessment; and</p>
              </div>

              <!-- 9. Feedback -->
              <div class="subsection">
                <h4>9. FEEDBACK</h4>
                <p>Performance feedback shall be in writing on the September Review Form and Annual Review Form, based on the supervisor's assessment of the employee's performance in relation to the KRAs and GAFs and standards outlined in this performance agreement and taking into account the Employee's self-assessment.</p>
              </div>

              <!-- 10. Developmental Requirements -->
              <div class="subsection">
                <h4>10. DEVELOPMENTAL REQUIREMENTS</h4>
                <div class="numbered-item">
                  <p>10.1 The Employer and Employee agree that the following are the Employee's key development needs in relation to his/her current job and envisaged career path in the Public Service. Please forward the completed FORM PDP to the Skills Development Facilitator (as it would be a requirement for the approval of training).</p>
                  <div class="development-areas">
                    <p>*ONLY ITEMISE DEVELOPMENT AREAS BELOW</p>
                    <mat-form-field class="full-width" *ngFor="let i of [1,2,3]">
                      <input matInput [formControlName]="'developmentArea' + i">
                    </mat-form-field>
                  </div>
                </div>
                <div class="numbered-item">
                  <p>10.2 In so far as the above training needs coincide with the Employer's requirements and taking into account financial realities, the Employer undertakes to expose the Employee to development in these areas. The developmental needs of the Employee shall be reviewed as part of the September Review and the annual assessment of performance. Details of courses, conferences, etc. to be attended shall as far as possible be included in the Employee's PDP.</p>
                </div>
              </div>

              <!-- 11. Timetable -->
              <div class="subsection">
                <h4>11. TIMETABLE AND RECORDS OF REVIEW DISCUSSIONS AND ANNUAL ASSESSMENT</h4>
                <div class="numbered-item">
                  <p>11.1 Half-yearly Review: week of October</p>
                </div>
                <div class="numbered-item">
                  <p>11.2 Annual Review: during April of every year.</p>
                </div>
              </div>

              <!-- 12. Poor Performance -->
              <div class="subsection">
                <h4>12. MANAGEMENT OF POOR PERFORMANCE OUTCOMES</h4>
                <p>Manager and employee will identify and develop interventions together, to address poor and non performance at feedback sessions, or any time during the performance cycle.</p>
              </div>

              <!-- 13. Dispute Resolution -->
              <div class="subsection">
                <h4>13. DISPUTE RESOLUTION</h4>
                <div class="numbered-item">
                  <p>13.1 Any dispute about the nature of the employee's PA, whether it relates to key responsibilities, priorities, methods of assessment and/or salary increment in this agreement, shall be mediated by: _________________________ (next person in hierarchy).</p>
                </div>
                <div class="numbered-item">
                  <p>13.2 If this mediation fails, the normal grievance rules will apply.</p>
                </div>
              </div>

              <!-- 14. Amendment -->
              <div class="subsection">
                <h4>14. AMENDMENT OF AGREEMENT</h4>
                <p>Amendments to the agreement shall be in writing and can only be effected after discussion and agreement by both parties.</p>
              </div>

              <!-- 15. Signatures -->
              <div class="subsection">
                <h4>15. SIGNATURES OF PARTIES TO THE AGREEMENT</h4>
                <p>The contents of this document have been discussed and agreed with the Employee concerned.</p>
                
                <div class="signatures-grid">
                  <div class="signature-block">
                    <p>Name of Employee:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="employeeSignatureName">
                    </mat-form-field>
                    
                    <p>Signature:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="employeeSignature">
                    </mat-form-field>
                    
                    <p>Date:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="employeeSignatureDate">
                    </mat-form-field>
                  </div>

                  <div class="signature-block">
                    <p>Name of supervisor:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="supervisorSignatureName">
                    </mat-form-field>
                    
                    <p>Signature:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="supervisorSignature">
                    </mat-form-field>
                    
                    <p>Date:</p>
                    <mat-form-field class="full-width">
                      <input matInput formControlName="supervisorSignatureDate">
                    </mat-form-field>
                  </div>
                </div>
              </div>
            </section>

            <!-- Form Actions -->
            <div class="form-actions">
              <button style="background-color: #04a9e8 ;" mat-button type="button" (click)="saveDraft()">Save Draft</button>
              <button style="background-color: #04ac64;" mat-raised-button color="primary" type="submit" [disabled]="!agreementForm.valid" (click)="onSubmit()">
                Submit Agreement
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
      z-index: 900;
      max-width: 100%;
      background-color: rgb(195, 199, 207);
      padding: 2rem;
      width: 100%;
    }

    .content-wrapper {
      max-width: 1200px;
      z-index: 900;
      margin: 0 auto;
    }

    .performance-container {
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

      h2, h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }

      h3 {
        margin-top: 0.5rem;
        font-size: 1rem;
      }
    }

    .notice-box {
      background: #04ac64;
      color: white;
      padding: 1rem;
      margin: 1.5rem;
      border-radius: 4px;
    }

    .section {
      margin: 1.5rem;
      padding: 2rem;
      border-bottom: 1px solid var(--border-color);

      .section-title {
        color: var(--primary-color);
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-light);
      }

      p, .numbered-item p {
        margin-bottom: 1rem;
        line-height: 1.5;
        text-align: justify;
        padding: 0 0.5rem;
      }

      ul {
        padding-left: 2rem;
        margin-bottom: 1rem;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
      }
    }

    .form-group {
      margin-bottom: 1.5rem;
      padding: 0 0.5rem;

      label {
        display: block;
        color: var(--text-color);
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      input, textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }

        &::placeholder {
          color: var(--text-light);
        }
      }

      textarea {
        min-height: 100px;
        resize: vertical;
      }
    }

    .subsection {
      margin-bottom: 2rem;
      padding: 0 0.5rem;

      h4 {
        color: var(--primary-color);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    }

    .job-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .signatures-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .signature-block {
      p {
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
    }

    .table-container {
      margin-top: 1rem;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

        &::placeholder {
          color: var(--text-light);
        }
      }
    }

    .table-note {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .rating-scale {
      background: var(--primary-light);
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;

      p {
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
    }

    .form-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      border-top: 1px solid var(--border-color);
      margin-top: 2rem;
    }

    .form-section {
      margin-left: 1rem;
      padding-left: 1rem;
  }

    .btn-action, .btn-save, .btn-submit {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 120px;
      text-align: center;

      &:hover {
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .btn-action {
      background: var(--primary-color);
      color: white;

      &:hover {
        background: var(--primary-dark);
      }
    }

    .btn-save {
      background: #04a9e8;
      color: white;

      &:hover {
        background: darken(#04a9e8, 10%);
      }
    }

    .btn-submit {
      background: #04ac64;
      color: white;

      &:hover {
        background: darken(#04ac64, 10%);
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .section {
        padding: 1rem;
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
      employerFullName: ['', Validators.required],
      employerPosition: ['', Validators.required],
      employeeFullName: ['', Validators.required],
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
      gafs: this.fb.array([]),
      developmentArea1: [''],
      developmentArea2: [''],
      developmentArea3: [''],
      employeeSignatureName: ['', Validators.required],
      employeeSignature: ['', Validators.required],
      employeeSignatureDate: ['', Validators.required],
      supervisorSignatureName: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorSignatureDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeKRAs();
    this.initializeGAFs();
  }

  private initializeKRAs(): void {
    for (let i = 0; i < 5; i++) {
      this.krasArray.push(this.createKRAFormGroup());
    }
  }

  private initializeGAFs(): void {
    for (let i = 0; i < 5; i++) {
      this.gafsArray.push(this.createGAFFormGroup());
    }
  }

  private createKRAFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  private createGAFFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get krasArray() {
    return this.agreementForm.get('kras') as FormArray;
  }

  get gafsArray() {
    return this.agreementForm.get('gafs') as FormArray;
  }

  saveDraft(): void {
    console.log('Saving draft:', this.agreementForm.value);
    // Implement draft saving logic
  }

  onSubmit(): void {
    if (this.agreementForm.valid) {
      console.log('Submitting form:', this.agreementForm.value);
      // Implement form submission logic
    }
  }
} 