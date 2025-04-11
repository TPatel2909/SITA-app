import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-final-score',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="assessment-container">
          <div class="section-header">
            <h2>FINAL SCORE</h2>
          </div>

          <form [formGroup]="finalScoreForm">
            <div class="table-container">
              <table class="assessment-table">
                <thead>
                  <tr>
                    <th>GRAND TOTAL</th>
                    <th>SUPERVISOR'S RATING</th>
                    <th>DEPT MODERATING COM'S RATING</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      KRA + GAF (80% + 20%) for levels 1-12
                      <br>
                      <span class="note">(As per calculator)</span>
                    </td>
                    <td>
                      <input type="number" formControlName="supervisorRating" class="rating-input">
                    </td>
                    <td>
                      <input type="number" formControlName="committeeRating" class="rating-input">
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="part-section">
              <h3>PART 3: DEVELOPMENT, TRAINING, COACHING, GUIDANCE AND GUIDANCE NEEDED</h3>
              <p class="subtitle">(To be completed by Supervisor in consultation with Employee)</p>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="development" rows="4"></textarea>
              </mat-form-field>
            </div>

            <div class="part-section">
              <h3>PART 4: SUPERVISOR'S COMMENTS AND RECOMMENDATION</h3>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="supervisorComments" rows="4"></textarea>
              </mat-form-field>
              <div class="signature-block">
                <div class="signature-field">
                  <span>FULL NAME</span>
                  <input type="text" formControlName="supervisorName">
                </div>
                <div class="signature-field">
                  <span>SIGNATURE</span>
                  <input type="text" formControlName="supervisorSignature">
                </div>
                <div class="signature-field">
                  <span>DATE</span>
                  <input type="date" formControlName="supervisorDate">
                </div>
              </div>
            </div>

            <div class="part-section">
              <h3>PART 5: EMPLOYEE'S COMMENTS</h3>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="employeeComments" rows="4"></textarea>
              </mat-form-field>
              <div class="signature-block">
                <div class="signature-field">
                  <span>FULL NAME</span>
                  <input type="text" formControlName="employeeName">
                </div>
                <div class="signature-field">
                  <span>SIGNATURE</span>
                  <input type="text" formControlName="employeeSignature">
                </div>
                <div class="signature-field">
                  <span>DATE</span>
                  <input type="date" formControlName="employeeDate">
                </div>
              </div>
            </div>

            <div class="part-section">
              <h3>PART 6: INTERMEDIATE REVIEW COMMITTEE</h3>
              <div class="validation-section">
                <span>Validated / not validated</span>
                <mat-radio-group formControlName="validated">
                  <mat-radio-button value="validated">Validated</mat-radio-button>
                  <mat-radio-button value="not_validated">Not Validated</mat-radio-button>
                </mat-radio-group>
              </div>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="committeeComments" rows="4"></textarea>
              </mat-form-field>
              <div class="signature-block">
                <div class="signature-field">
                  <span>FULL NAME</span>
                  <input type="text" formControlName="committeeName">
                </div>
                <div class="signature-field">
                  <span>SIGNATURE</span>
                  <input type="text" formControlName="committeeSignature">
                </div>
                <div class="signature-field">
                  <span>DATE</span>
                  <input type="date" formControlName="committeeDate">
                </div>
              </div>
            </div>

            <div class="part-section">
              <h3>PART 7: DEPARTMENTAL MODERATING COMMITTEE COMMENTS</h3>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="moderatingComments" rows="4"></textarea>
              </mat-form-field>
              <div class="signature-block">
                <div class="signature-field">
                  <span>FULL NAME</span>
                  <input type="text" formControlName="moderatingName">
                </div>
                <div class="signature-field">
                  <span>SIGNATURE</span>
                  <input type="text" formControlName="moderatingSignature">
                </div>
                <div class="signature-field">
                  <span>DATE</span>
                  <input type="date" formControlName="moderatingDate">
                </div>
              </div>
            </div>

            <div class="part-section">
              <h3>PART 8: DECISION BY THE EXECUTIVE AUTHORITY OR HIS/HER DELEGATE</h3>
              <mat-form-field appearance="outline" class="full-width">
                <textarea matInput formControlName="executiveDecision" rows="4"></textarea>
              </mat-form-field>
              <div class="signature-block">
                <div class="signature-field">
                  <span>FULL NAME</span>
                  <input type="text" formControlName="executiveName">
                </div>
                <div class="signature-field">
                  <span>SIGNATURE</span>
                  <input type="text" formControlName="executiveSignature">
                </div>
                <div class="signature-field">
                  <span>DATE</span>
                  <input type="date" formControlName="executiveDate">
                </div>
              </div>
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

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
    }

    .table-container {
      margin: 1.5rem;
      overflow-x: auto;
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

      .note {
        font-size: 0.8rem;
        color: var(--text-light);
        font-style: italic;
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

      .rating-input {
        width: 80px;
      }
    }

    .part-section {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);

      h3 {
        color: var(--primary-color);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .subtitle {
        color: var(--text-light);
        font-size: 0.875rem;
        margin-bottom: 1rem;
        font-style: italic;
      }

      .full-width {
        width: 100%;
      }
    }

    .signature-block {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px dashed var(--border-color);
    }

    .signature-field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-size: 0.75rem;
        color: var(--text-light);
        text-transform: uppercase;
      }

      input {
        padding: 0.5rem;
        border: none;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
    }

    .validation-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      span {
        color: var(--text-color);
      }

      mat-radio-group {
        display: flex;
        gap: 1rem;
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

      .signature-block {
        flex-direction: column;
        gap: 1rem;
      }

      .signature-row {
        flex-direction: column;
        gap: 1rem;
      }

      .table-container {
        margin: 1rem;
      }

      .assessment-table {
        th, td {
          min-width: 120px;
        }
      }
    }
  `]
})
export class FinalScoreComponent {
  finalScoreForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.finalScoreForm = this.fb.group({
      supervisorRating: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      committeeRating: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      development: [''],
      supervisorComments: [''],
      supervisorName: [''],
      supervisorSignature: [''],
      supervisorDate: [''],
      employeeComments: [''],
      employeeName: [''],
      employeeSignature: [''],
      employeeDate: [''],
      validated: [''],
      committeeComments: [''],
      committeeName: [''],
      committeeSignature: [''],
      committeeDate: [''],
      moderatingComments: [''],
      moderatingName: [''],
      moderatingSignature: [''],
      moderatingDate: [''],
      executiveDecision: [''],
      executiveName: [''],
      executiveSignature: [''],
      executiveDate: ['']
    });
  }
} 