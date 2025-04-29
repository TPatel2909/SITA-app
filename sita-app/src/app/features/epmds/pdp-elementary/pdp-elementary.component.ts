import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface DevelopmentArea {
  areaIdentified: string;
  objective: string;
  interventionType: string;
  quarterTargeted: string;
}

@Component({
  selector: 'app-pdp-elementary',
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
        <div class="pdp-container">
          <div class="section-header">
            <h2>PERSONAL DEVELOPMENT PLAN FOR ELEMENTARY OCCUPATIONS (PDP)</h2>
          </div>

          <form [formGroup]="pdpForm">
            <div class="header-section">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>COMPONENT/INSTITUTION</mat-label>
                  <input matInput formControlName="component">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>SERVICE CENTRE</mat-label>
                  <input matInput formControlName="serviceCentre">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>DISTRICT</mat-label>
                  <input matInput formControlName="district">
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>NAME OF EMPLOYEE</mat-label>
                  <input matInput formControlName="employeeName">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>PERSAL No.</mat-label>
                  <input matInput formControlName="persalNo">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>JOB TITLE</mat-label>
                  <input matInput formControlName="jobTitle">
                </mat-form-field>
              </div>
            </div>

            <div class="purpose-section">
              <h3>PURPOSE:</h3>
              <p>To enable the supervisor and the employee to identify skills development requirements that are relevant to the core job content and as a result agree on the steps to be taken to address those developmental gaps</p>
            </div>

            <div class="table-container">
              <table class="pdp-table">
                <thead>
                  <tr>
                    <th>AREA IDENTIFIED FOR DEVELOPMENT</th>
                    <th>OBJECTIVE OF DEVELOPMENT</th>
                    <th>TYPE OF INTERVENTION (SHORT COURSE, BURSARY)</th>
                    <th>QUARTER TARGETED</th>
                  </tr>
                </thead>
                <tbody formArrayName="developmentAreas">
                  <tr>
                    <td>e.g. Computer Literacy</td>
                    <td>To develop technical skills for the effective delivery of core functions</td>
                    <td>Short course</td>
                    <td>Third quarter</td>
                  </tr>
                  <tr *ngFor="let area of developmentAreasArray.controls; let i = index" [formGroupName]="i">
                    <td>
                      <input type="text" formControlName="areaIdentified" placeholder="Enter area">
                    </td>
                    <td>
                      <input type="text" formControlName="objective" placeholder="Enter objective">
                    </td>
                    <td>
                      <input type="text" formControlName="interventionType" placeholder="Enter intervention type">
                    </td>
                    <td>
                      <input type="text" formControlName="quarterTargeted" placeholder="Enter quarter">
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="table-actions">
                <button type="button" mat-button (click)="addDevelopmentArea()" class="btn-action">
                  <mat-icon>add</mat-icon> Add Area
                </button>
                <button type="button" mat-button (click)="removeDevelopmentArea(developmentAreasArray.length - 1)" 
                        class="btn-action" *ngIf="developmentAreasArray.length > 1">
                  <mat-icon>remove</mat-icon> Remove Area
                </button>
              </div>
            </div>

            <div class="info-section">
              <p>You may be nominated to attend workshops/conference/seminars and other training interventions to address the developmental areas as identified above.</p>
              <p class="agreement-text">
                We, (Employee and Supervisor) agree that the above-mentioned areas for development and the type of intervention suggested would be engaged in to achieve the required objective for development. We also understand that due to the operational requirements and budget constraints of the Department/office/institution, it may not be possible to undertake the training and development stated with the type of invention stated and/or within the quarter of the year as stated. There is also an understanding between ourselves that areas for development could be identified throughout the year and that this may change the order of priority and type of invention as stated in the plan.
              </p>
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
      background-color: #f5f5f5;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1200px;
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
      }
    }

    .header-section {
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

    .purpose-section {
             margin: 1.5rem;
     padding: 1.5rem;
  background: var(--accent-color);
  color: white;
  border-radius: 6px;


      h3 {
        color: white;
        margin: 0 0 0.5rem 0;
        font-weight: 600;
      }

      p {
        margin: 0;
        color: white;
        line-height: 1.5;
      }
    }

    .table-container {
      margin: 1.5rem;
      overflow-x: auto;
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
        white-space: nowrap;
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

    .table-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      justify-content: flex-start;
    }

    .btn-action {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: var(--primary-dark);
      }

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .info-section {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);

      p {
        margin: 0 0 1rem 0;
        color: var(--text-color);
        line-height: 1.5;
      }

      .agreement-text {
        font-size: 0.875rem;
        color: var(--text-light);
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

      .pdp-table {
        th, td {
          min-width: 200px;
        }
      }

      .table-actions {
        flex-direction: column;

        .btn-action {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `]
})
export class PdpElementaryComponent {
  pdpForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.pdpForm = this.fb.group({
      component: ['', Validators.required],
      serviceCentre: ['', Validators.required],
      district: ['', Validators.required],
      employeeName: ['', Validators.required],
      persalNo: ['', Validators.required],
      jobTitle: ['', Validators.required],
      developmentAreas: this.fb.array([
        this.createDevelopmentArea()
      ])
    });
  }

  get developmentAreasArray() {
    return this.pdpForm.get('developmentAreas') as FormArray;
  }

  createDevelopmentArea() {
    return this.fb.group({
      areaIdentified: [''],
      objective: [''],
      interventionType: [''],
      quarterTargeted: ['']
    });
  }

  addDevelopmentArea() {
    this.developmentAreasArray.push(this.createDevelopmentArea());
  }

  removeDevelopmentArea(index: number) {
    if (this.developmentAreasArray.length > 1) {
      this.developmentAreasArray.removeAt(index);
    }
  }
} 