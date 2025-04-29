import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface WorkplanItem {
  keyActivities: string;
  indicators: string;
  timeframes: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
  };
  resources: {
    human: string;
    financial: string;
  };
}

interface KeyResultArea {
  title: string;
  output: string;
  workplanItems: WorkplanItem[];
}

@Component({
  selector: 'app-workplan',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="workplan-container">
          <div class="section-header">
            <h2>EXAMPLE 1: Workplan</h2>
          </div>

          <form [formGroup]="workplanForm">
            <div formArrayName="keyResultAreas">
              <div *ngFor="let kra of keyResultAreasArray.controls; let kraIndex = index" [formGroupName]="kraIndex">
                <div class="kra-section">
                  <div class="kra-header">
                    <div class="kra-title">KEY RESULT AREA {{kraIndex + 1}}: {{kra.get('title')?.value}}</div>
                    <div class="kra-output">OUTPUT: {{kra.get('output')?.value}}</div>
                  </div>

                  <div class="table-container">
                    <table class="workplan-table">
                      <thead>
                        <tr>
                          <th class="col-activities">KEY ACTIVITIES</th>
                          <th class="col-standards" colspan="5">PERFORMANCE STANDARDS</th>
                          <th class="col-resources" colspan="2">RESOURCE REQUIREMENTS</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th>Indicators</th>
                          <th colspan="4">Time (completed by)</th>
                          <th>Human resources</th>
                          <th>Financial resources</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>Q 1</th>
                          <th>Q 2</th>
                          <th>Q 3</th>
                          <th>Q 4</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody formArrayName="workplanItems">
                        <tr *ngFor="let item of getWorkplanItems(kra).controls; let itemIndex = index" [formGroupName]="itemIndex">
                          <td>
                            <input type="text" formControlName="keyActivities">
                          </td>
                          <td>
                            <input type="text" formControlName="indicators">
                          </td>
                          <td class="quarter-cell">
                            <input type="text" formControlName="q1">
                          </td>
                          <td class="quarter-cell">
                            <input type="text" formControlName="q2">
                          </td>
                          <td class="quarter-cell">
                            <input type="text" formControlName="q3">
                          </td>
                          <td class="quarter-cell">
                            <input type="text" formControlName="q4">
                          </td>
                          <td>
                            <input type="text" formControlName="humanResources">
                          </td>
                          <td>
                            <input type="text" formControlName="financialResources">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button style="background-color: #04ac64;" type="button" class="btn-action" (click)="addWorkplanItem(0)">
                Add Activity
              </button>
              <button style="background-color: #04a9e8 ;" type="button" class="btn-action" (click)="removeWorkplanItem(0)" *ngIf="getWorkplanItems(keyResultAreasArray.at(0)).length > 1">
                Remove Activity
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
      background-color: #f5f5f5;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .workplan-container {
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

    .kra-section {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .kra-header {
      background: #04ac64;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .kra-title {
      color: white;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .kra-output {
      color: white;
    }

    .table-container {
      margin-top: 1rem;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .workplan-table {
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

      .quarter-cell {
        width: 80px;
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

    .col-activities {
      width: 25%;
    }

    .col-standards {
      width: 50%;
    }

    .col-resources {
      width: 25%;
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
      background: var(--primary-color);
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: var(--primary-dark);
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

      .kra-section {
        padding: 1rem;
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
export class WorkplanComponent implements OnInit {
  workplanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.workplanForm = this.fb.group({
      keyResultAreas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addKeyResultArea({
      title: 'Assistance and advice to departments on employee performance management',
      output: 'Render timely, correct and authoritative assistance and advice to departments on employee performance management',
      workplanItems: []
    });
    this.addWorkplanItem(0);
  }

  get keyResultAreasArray() {
    return this.workplanForm.get('keyResultAreas') as FormArray;
  }

  getWorkplanItems(kra: any): FormArray {
    return kra.get('workplanItems') as FormArray;
  }

  addKeyResultArea(kra?: KeyResultArea) {
    const kraGroup = this.fb.group({
      title: [kra?.title || '', Validators.required],
      output: [kra?.output || '', Validators.required],
      workplanItems: this.fb.array([])
    });

    this.keyResultAreasArray.push(kraGroup);
  }

  addWorkplanItem(kraIndex: number) {
    const workplanItem = this.fb.group({
      keyActivities: [''],
      indicators: [''],
      q1: [''],
      q2: [''],
      q3: [''],
      q4: [''],
      humanResources: [''],
      financialResources: ['']
    });

    const kra = this.keyResultAreasArray.at(kraIndex);
    const workplanItems = kra.get('workplanItems') as FormArray;
    workplanItems.push(workplanItem);
  }

  removeWorkplanItem(kraIndex: number) {
    const kra = this.keyResultAreasArray.at(kraIndex);
    const workplanItems = kra.get('workplanItems') as FormArray;
    if (workplanItems.length > 1) {
      workplanItems.removeAt(workplanItems.length - 1);
    }
  }
}
 