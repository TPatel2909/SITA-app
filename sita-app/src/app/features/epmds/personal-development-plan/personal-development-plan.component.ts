import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-personal-development-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="pdp-container">
          <div class="section-header">
            <h2>PERSONAL DEVELOPMENT PLAN (PDP)</h2>
          </div>

          <form [formGroup]="pdpForm">
            <div class="form-section">
              <div class="form-row">
                <label>DEPARTMENT:</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="department">
                </mat-form-field>
              </div>

              <div class="form-row">
                <label>JOB TITLE:</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="jobTitle">
                </mat-form-field>
              </div>

              <div class="form-row">
                <label>INCUMBENT:</label>
                <mat-form-field appearance="outline">
                  <input matInput formControlName="incumbent">
                </mat-form-field>
              </div>

              <div class="purpose-section">
                <label>PURPOSE:</label>
                <p>To enable the manager and the employee to identify skills development requirements and as a result agree on the steps taken to address those developmental gaps</p>
              </div>
            </div>

            <div class="table-section">
              <table class="development-table">
                <thead>
                  <tr>
                    <th colspan="2">AREA IDENTIFIED FOR DEVELOPMENT</th>
                    <th>OBJECTIVE OF DEVELOPMENT</th>
                    <th>TYPE OF INTERVENTION<br>(SHORT COURSE, BURSARY)</th>
                    <th>QUARTER TARGETED</th>
                  </tr>
                  <tr>
                    <th>GENERIC TRAINING REQUIRED</th>
                    <th>WORK RELATED TRAINING REQUIRED</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody formArrayName="developmentAreas">
                  <tr *ngFor="let area of developmentAreasArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="genericTraining" [placeholder]="i === 0 ? 'e.g. Computer Training' : ''">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="workRelatedTraining">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="objective" [placeholder]="i === 0 ? 'To develop research capability for high level information gathering' : ''">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="intervention" [placeholder]="i === 0 ? 'Short course at Tech/University' : ''">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="quarter" [placeholder]="i === 0 ? 'Third quarter' : ''">
                      </mat-form-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="conference-section">
              <p class="conference-note">You may attend a conference within the year that would be a substitute for any of the areas of development.</p>
              
              <table class="conference-table">
                <thead>
                  <tr>
                    <th>CONFERENCES ATTENDED</th>
                    <th>TYPE OF CONFERENCE</th>
                  </tr>
                </thead>
                <tbody formArrayName="conferences">
                  <tr *ngFor="let conf of conferencesArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="name" [placeholder]="i === 0 ? 'e.g. Labour Law' : ''">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="type" [placeholder]="i === 0 ? 'e.g. Dealt with current application of employment legislation' : ''">
                      </mat-form-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="signature-section">
              <div class="signature-row">
                <div class="signature-field">
                  <label>Employee:</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="employeeSignature">
                  </mat-form-field>
                </div>
                <div class="signature-field">
                  <label>Date:</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="employeeDate" type="date">
                  </mat-form-field>
                </div>
                <div class="signature-field">
                  <label>Supervisor:</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="supervisorSignature">
                  </mat-form-field>
                </div>
                <div class="signature-field">
                  <label>Date:</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="supervisorDate" type="date">
                  </mat-form-field>
                </div>
              </div>
            </div>

            <div class="impact-section">
              <h3>IMPACT ASSESSMENT</h3>
              <table class="impact-table">
                <thead>
                  <tr>
                    <th colspan="2">IMPACT OF DEVELOPMENT ON WORK (AFTER SIX MONTHS)</th>
                  </tr>
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>SUPERVISOR/MANAGER</th>
                  </tr>
                </thead>
                <tbody formArrayName="impactAssessments">
                  <tr *ngFor="let impact of impactAssessmentsArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="employeeImpact" 
                               [placeholder]="i === 0 ? 'e.g. Did not have the opportunity to use all skills developed due to the need to focus on other priority areas of my work' : ''">
                      </mat-form-field>
                    </td>
                    <td>
                      <mat-form-field appearance="outline">
                        <input matInput formControlName="supervisorImpact"
                               [placeholder]="i === 0 ? 'e.g. Employee completed first draft of questionnaire for a survey to be implemented in Aug 03' : ''">
                      </mat-form-field>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="agreement-text">
                <p>We, (Employee) and (Supervisor) agree that the above-mentioned areas for development and the type of intervention suggested would be engaged in to achieve the required objective for development. We also understand that due to the operational requirements and budget constraints of the Department (component/unit), it may not be possible to undertake the training and development stated with the type of invention stated and/or within the quarter of the year as stated. There is also an understanding between ourselves that areas for development could be identified throughout the year and that this may change the order of priority and type of invention as stated in the plan.</p>
              </div>

              <div class="signature-section">
                <div class="signature-row">
                  <div class="signature-field">
                    <label>Employee:</label>
                    <mat-form-field appearance="outline">
                      <input matInput formControlName="impactEmployeeSignature">
                    </mat-form-field>
                  </div>
                  <div class="signature-field">
                    <label>Date:</label>
                    <mat-form-field appearance="outline">
                      <input matInput formControlName="impactEmployeeDate" type="date">
                    </mat-form-field>
                  </div>
                  <div class="signature-field">
                    <label>Supervisor:</label>
                    <mat-form-field appearance="outline">
                      <input matInput formControlName="impactSupervisorSignature">
                    </mat-form-field>
                  </div>
                  <div class="signature-field">
                    <label>Date:</label>
                    <mat-form-field appearance="outline">
                      <input matInput formControlName="impactSupervisorDate" type="date">
                    </mat-form-field>
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
      background-color: #f7fafc;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1400px;
      margin: 0 auto;
    }

    .pdp-container {
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

    .form-section {
      padding: 1.5rem;
    }

    .form-row {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      label {
        min-width: 150px;
        font-weight: 600;
        color: var(--text-color);
      }

      mat-form-field {
        flex: 1;
      }
    }

    .purpose-section {
      margin-top: 1.5rem;
      
      label {
        font-weight: 600;
        color: var(--text-color);
        display: block;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
        color: var(--text-color);
      }
    }

    .table-section {
      padding: 1.5rem;
    }

    .development-table, .conference-table, .impact-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;

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

      mat-form-field {
        width: 100%;
      }
    }

    .conference-section {
      padding: 1.5rem;

      .conference-note {
        margin-bottom: 1rem;
        color: var(--text-color);
        font-style: italic;
      }
    }

    .signature-section {
      padding: 1.5rem;
    }

    .signature-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .signature-field {
      flex: 1;
      min-width: 200px;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-color);
      }
    }

    .impact-section {
      padding: 1.5rem;

      h3 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 1.5rem;
      }
    }

    .agreement-text {
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--primary-light);
      border-radius: 4px;

      p {
        margin: 0;
        line-height: 1.5;
        color: var(--text-color);
      }
    }

    @media (max-width: 1024px) {
      .content-wrapper {
        max-width: 100%;
      }

      .page-container {
        padding: 1rem;
      }

      .signature-row {
        flex-direction: column;
      }

      .signature-field {
        width: 100%;
      }
    }
  `]
})
export class PersonalDevelopmentPlanComponent {
  pdpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pdpForm = this.fb.group({
      department: [''],
      jobTitle: [''],
      incumbent: [''],
      developmentAreas: this.fb.array([
        this.createDevelopmentArea(),
        this.createDevelopmentArea(),
        this.createDevelopmentArea(),
        this.createDevelopmentArea(),
        this.createDevelopmentArea()
      ]),
      conferences: this.fb.array([
        this.createConference(),
        this.createConference(),
        this.createConference(),
        this.createConference()
      ]),
      employeeSignature: [''],
      employeeDate: [''],
      supervisorSignature: [''],
      supervisorDate: [''],
      impactAssessments: this.fb.array([
        this.createImpactAssessment(),
        this.createImpactAssessment(),
        this.createImpactAssessment(),
        this.createImpactAssessment(),
        this.createImpactAssessment()
      ]),
      impactEmployeeSignature: [''],
      impactEmployeeDate: [''],
      impactSupervisorSignature: [''],
      impactSupervisorDate: ['']
    });
  }

  get developmentAreasArray() {
    return this.pdpForm.get('developmentAreas') as FormArray;
  }

  get conferencesArray() {
    return this.pdpForm.get('conferences') as FormArray;
  }

  get impactAssessmentsArray() {
    return this.pdpForm.get('impactAssessments') as FormArray;
  }

  private createDevelopmentArea() {
    return this.fb.group({
      genericTraining: [''],
      workRelatedTraining: [''],
      objective: [''],
      intervention: [''],
      quarter: ['']
    });
  }

  private createConference() {
    return this.fb.group({
      name: [''],
      type: ['']
    });
  }

  private createImpactAssessment() {
    return this.fb.group({
      employeeImpact: [''],
      supervisorImpact: ['']
    });
  }
}
