import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface WorkplanItem {
  measurableObjective: string;
  outputs: string;
  indicator: string;
  timeframes: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
  };
  resources: {
    budget: string;
    hrResources: string;
  };
}

@Component({
  selector: 'app-sms-workplan',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="workplan-container">
          <div class="section-header">
            <h2>EXAMPLE 2: Workplan</h2>
          </div>

          <form [formGroup]="workplanForm">
            <div class="kra-section">
              <div class="kra-header">
                <div class="kra-title">Directorate Performance Management</div>
                <div class="kra-subtitle">KEY RESULT AREA 1: Policy development and research</div>
                <div class="strategic-objective">
                  Strategic objective: To develop at a national level policies, systems and guidelines pertaining to 
                  employee performance management for employees on salary levels 1 to 12 and to facilitate and ensure 
                  implementation in national and provincial departments in the Public Service through research, 
                  interventions, assistance and advice, and monitoring and evaluation.
                </div>
              </div>

              <div class="table-container">
                <table class="workplan-table">
                  <thead>
                    <tr>
                      <th>Measurable objective</th>
                      <th>Outputs</th>
                      <th>Indicator</th>
                      <th colspan="4">Activities per quarter</th>
                      <th colspan="2">Resource requirements</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Qrtr 1</th>
                      <th>Qrtr 2</th>
                      <th>Qrtr 3</th>
                      <th>Qrtr 4</th>
                      <th>Budget</th>
                      <th>HR resources</th>
                    </tr>
                  </thead>
                  <tbody formArrayName="workplanItems">
                    <tr *ngFor="let item of workplanItemsArray.controls; let i = index" [formGroupName]="i">
                      <td>
                        <ng-container *ngIf="i === 0">
                          To conduct and provide research and inputs for policy development, projects and assignments relating to employee performance management.
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          Research for policy development in employee performance management:
                          • Conduct research on systems & practices and consult with clients
                          • Provide inputs for policy & system development and implementation
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          Review and redraft EPMDS, and obtain approval for Circular.
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          Review and redraft PSR 1/VIII on non-SMS employee performance management, and obtain MPSA approval for publication.
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          • Relevant and applicable research results on policy development for PM provided for public service stakeholders.
                          • Regular consultation with clients.
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          EPMDS reviewed and amended, and distributed for use in departments.
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          PSR 1/VIII reviewed, redrafted and approved in line with amendments to PS Act.
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          Ongoing research
                          Workshop in KZN
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          Review complete
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          Start review
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          Ongoing research
                          Workshop in Free State
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          Draft changes
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          Consult legal services
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          Ongoing research
                          Workshop in Gauteng
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          Changes approved
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          Consult clients
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0">
                          Ongoing research
                          National workshop
                        </ng-container>
                        <ng-container *ngIf="i === 1">
                          EPMDS sent out
                        </ng-container>
                        <ng-container *ngIf="i === 2">
                          Complete draft
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0 || i === 1 || i === 2">
                          Normal MTEF budget
                        </ng-container>
                      </td>
                      <td>
                        <ng-container *ngIf="i === 0 || i === 1 || i === 2">
                          D: PM & subdirectorate. 1
                        </ng-container>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      background-color:rgb(195, 199, 207);
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1400px;
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
    }

    .kra-header {
      background: #04ac64;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .kra-title {
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .kra-subtitle {
      color: white;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .strategic-objective {
      color: white;
      line-height: 1.5;
    }

    .table-container {
      margin-top: 1rem;
      border-radius: 4px;
      overflow-x: auto;
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
        vertical-align: top;
      }

      th {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 600;
        white-space: nowrap;
      }

      td {
        line-height: 1.5;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
      }
    }

    @media (max-width: 1024px) {
      .content-wrapper {
        max-width: 100%;
      }

      .page-container {
        padding: 1rem;
      }

      .kra-section {
        padding: 1rem;
      }

      .table-container {
        overflow-x: auto;
      }
    }
  `]
})
export class SmsWorkplanComponent implements OnInit {
  workplanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.workplanForm = this.fb.group({
      workplanItems: this.fb.array([])
    });
  }

  ngOnInit() {
    // Initialize with three rows of data
    for (let i = 0; i < 3; i++) {
      this.addWorkplanItem();
    }
  }

  get workplanItemsArray() {
    return this.workplanForm.get('workplanItems') as FormArray;
  }

  addWorkplanItem() {
    const workplanItem = this.fb.group({
      measurableObjective: [''],
      outputs: [''],
      indicator: [''],
      q1: [''],
      q2: [''],
      q3: [''],
      q4: [''],
      budget: [''],
      hrResources: ['']
    });

    this.workplanItemsArray.push(workplanItem);
  }
} 