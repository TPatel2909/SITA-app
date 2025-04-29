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

          <form [formGroup]="pdpForm" class="form-content">
       
            <div class="basic-info-section">
              <div class="form-group">
                <label>DEPARTMENT:</label>
                <input type="text" formControlName="department">
              </div>

              <div class="form-group">
                <label>JOB TITLE:</label>
                <input type="text" formControlName="jobTitle">
              </div>

              <div class="form-group">
                <label>INCUMBENT:</label>
                <input type="text" formControlName="incumbent">
              </div>

              <div class="purpose-section">
                <label>PURPOSE:</label>
                <p>To enable the manager and the employee to identify skills development requirements and as a result agree on the steps taken to address those developmental gaps</p>
              </div>
            </div>

            <!-- Development Areas Table -->
            <div class="table-container">
              <table class="pdp-table">
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
                      <input type="text" formControlName="genericTraining" [placeholder]="i === 0 ? 'e.g. Computer Training' : ''">
                    </td>
                    <td>
                      <input type="text" formControlName="workRelatedTraining">
                    </td>
                    <td>
                      <input type="text" formControlName="objective" [placeholder]="i === 0 ? 'To develop research capability for high level information gathering' : ''">
                    </td>
                    <td>
                      <input type="text" formControlName="intervention" [placeholder]="i === 0 ? 'Short course at Tech/University' : ''">
                    </td>
                    <td>
                      <input type="text" formControlName="quarter" [placeholder]="i === 0 ? 'Third quarter' : ''">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="conference-note">
              <p>You may attend a conference within the year that would be a substitute for any of the areas of development.</p>
            </div>

            <!-- Conferences Table -->
            <div class="table-container">
              <table class="pdp-table">
                <thead>
                  <tr>
                    <th>CONFERENCES ATTENDED</th>
                    <th>TYPE OF CONFERENCE</th>
                  </tr>
                </thead>
                <tbody formArrayName="conferences">
                  <tr *ngFor="let conf of conferencesArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      <input type="text" formControlName="name" [placeholder]="i === 0 ? 'e.g. Labour Law' : ''">
                    </td>
                    <td>
                      <input type="text" formControlName="type" [placeholder]="i === 0 ? 'e.g. Dealt with current application of employment legislation' : ''">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- First Signature Section -->
            <div class="signature-section">
              <div class="signature-row">
                <div class="signature-group">
                  <label>Employee:</label>
                  <input type="text" formControlName="employeeSignature">
                </div>
                <div class="signature-group">
                  <label>Date:</label>
                  <input type="date" formControlName="employeeDate">
                </div>
                <div class="signature-group">
                  <label>Supervisor:</label>
                  <input type="text" formControlName="supervisorSignature">
                </div>
                <div class="signature-group">
                  <label>Date:</label>
                  <input type="date" formControlName="supervisorDate">
                </div>
              </div>
            </div>

            <!-- Impact Assessment Section -->
            <div class="impact-assessment">
              <h3>IMPACT ASSESSMENT</h3>
              <table class="pdp-table">
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
                      <input type="text" formControlName="employeeImpact" 
                             [placeholder]="i === 0 ? 'e.g. Did not have the opportunity to use all skills developed due to the need to focus on other priority areas of my work' : ''">
                    </td>
                    <td>
                      <input type="text" formControlName="supervisorImpact"
                             [placeholder]="i === 0 ? 'e.g. Employee completed first draft of questionnaire for a survey to be implemented in Aug 03' : ''">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Agreement Text -->
            <div class="agreement-section">
              <p>We, (Employee) and (Supervisor) agree that the above-mentioned areas for development and the type of intervention suggested would be engaged in to achieve the required objective for development. We also understand that due to the operational requirements and budget constraints of the Department (component/unit), it may not be possible to undertake the training and development stated with the type of invention stated and/or within the quarter of the year as stated. There is also an understanding between ourselves that areas for development could be identified throughout the year and that this may change the order of priority and type of invention as stated in the plan.</p>
            </div>

            <!-- Second Signature Section -->
            <div class="signature-section">
              <div class="signature-row">
                <div class="signature-group">
                  <label>Employee:</label>
                  <input type="text" formControlName="impactEmployeeSignature">
                </div>
                <div class="signature-group">
                  <label>Date:</label>
                  <input type="date" formControlName="impactEmployeeDate">
                </div>
                <div class="signature-group">
                  <label>Supervisor:</label>
                  <input type="text" formControlName="impactSupervisorSignature">
                </div>
                <div class="signature-group">
                  <label>Date:</label>
                  <input type="date" formControlName="impactSupervisorDate">
                </div>
              </div>
            </div>
          </form>

          <div class="form-actions">
            <button type="button" class="btn-action" (click)="addDevelopmentArea()" style="background-color: #04ac64;">
              Add Development Area
            </button>
            <button type="button" class="btn-action" (click)="removeDevelopmentArea()" 
                    *ngIf="developmentAreasArray.length > 1" style="background-color: #04a9e8;">
              Remove Development Area
            </button>
          </div>
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
      text-align: center;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
    }

    .form-content {
      padding: 2rem;
    }

    .basic-info-section {
      margin-bottom: 2rem;
    }

    .form-group {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      gap: 1rem;

      label {
        min-width: 150px;
        font-weight: 600;
        color: var(--text-color);
      }

      input {
        flex: 1;
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

    .purpose-section {
       margin: 1.5rem;
  padding: 1.5rem;
  background: var(--accent-color);
  color: white;
  border-radius: 6px;

      label {
        font-weight: 600;
        color: white;
        display: block;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
        color: white;
      }
    }

    .table-container {
      margin: 1.5rem 0;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .pdp-table {
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
        white-space: normal;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          background: var(--primary-light);
        }
      }
    }

    .conference-note {
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--primary-light);
      border-radius: 4px;
      color: var(--text-color);
      font-style: italic;

      p {
        margin: 0;
      }
    }

    .signature-section {
      margin: 2rem 0;
      padding: 1rem;
      background: var(--bg-color);
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .signature-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .signature-group {
      flex: 1;
      min-width: 200px;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-color);
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

    .impact-assessment {
      margin: 2rem 0;

      h3 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
        font-weight: 600;
      }
    }

    .agreement-section {
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

    .form-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-start;
      border-top: 1px solid var(--border-color);
    }

    .btn-action {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .form-content {
        padding: 1rem;
      }

      .signature-row {
        flex-direction: column;
      }

      .form-actions {
        flex-direction: column;

        .btn-action {
          width: 100%;
        }
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

  addDevelopmentArea() {
    this.developmentAreasArray.push(this.createDevelopmentArea());
  }

  removeDevelopmentArea() {
    if (this.developmentAreasArray.length > 1) {
      this.developmentAreasArray.removeAt(this.developmentAreasArray.length - 1);
    }
  }
}
