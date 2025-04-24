import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface ActivityDetail {
  monthlyTarget: string;
  activity: string;
  timeframe: string;
  budget: number;
  dependencies: string;
  responsiblePerson: string;
}

@Component({
  selector: 'app-operational-plan',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './operational-plan.component.html',
  styleUrls: ['./operational-plan.component.scss']
})
export class OperationalPlanComponent implements OnInit {
  operationalPlanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.operationalPlanForm = this.fb.group({
      programName: [''],
      subProgramme: [''],
      output: [''],
      outputIndicator: [''],
      annualTarget: [''],
      quarterlyTargets: this.fb.group({
        q1: [''],
        q2: [''],
        q3: [''],
        q4: ['']
      }),
      activities: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addActivity();
  }

  get activities() {
    return this.operationalPlanForm.get('activities') as FormArray;
  }

  addActivity() {
    const activityForm = this.fb.group({
      monthlyTarget: [''],
      activity: [''],
      timeframe: [''],
      budget: [''],
      dependencies: [''],
      responsiblePerson: ['']
    });

    this.activities.push(activityForm);
  }

  removeActivity(index: number) {
    this.activities.removeAt(index);
  }

  onSubmit() {
    if (this.operationalPlanForm.valid) {
      console.log(this.operationalPlanForm.value);
      // Handle form submission
    }
  }

  onSave() {
    console.log('Saving...', this.operationalPlanForm.value);
    // Handle save operation
  }

  onSaveAndSubmit() {
    console.log('Saving and submitting...', this.operationalPlanForm.value);
    // Handle save and submit operation
  }
} 