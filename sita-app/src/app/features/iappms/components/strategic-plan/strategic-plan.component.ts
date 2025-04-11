import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';

interface StrategicOutcome {
  outcome: string;
  outcomeIndicator: string;
  baseline: string;
  fiveYearTarget: string;
}

@Component({
  selector: 'app-strategic-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './strategic-plan.component.html',
  styleUrls: ['./strategic-plan.component.scss']
})
export class StrategicPlanComponent implements OnInit {
  strategicPlanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.strategicPlanForm = this.fb.group({
      partA: this.fb.group({
        constitutionalMandate: ['', Validators.required],
        legislativePolicyMandates: ['', Validators.required],
        institutionalPolicies: ['', Validators.required],
        courtRulings: ['', Validators.required]
      }),
      partB: this.fb.group({
        vision: ['', Validators.required],
        mission: ['', Validators.required],
        values: ['', Validators.required]
      }),
      partC: this.fb.group({
        outcomes: this.fb.array([])
      })
    });
  }

  ngOnInit() {
    this.addOutcome();
  }

  get outcomesArray() {
    return this.strategicPlanForm.get('partC.outcomes') as FormArray;
  }

  addOutcome() {
    const outcome = this.fb.group({
      outcome: ['', Validators.required],
      outcomeIndicator: ['', Validators.required],
      baseline: ['', Validators.required],
      fiveYearTarget: ['', Validators.required]
    });

    this.outcomesArray.push(outcome);
  }

  removeOutcome(index: number) {
    if (this.outcomesArray.length > 1) {
      this.outcomesArray.removeAt(index);
    }
  }

  onSave() {
    if (this.strategicPlanForm.valid) {
      console.log(this.strategicPlanForm.value);
    }
  }

  onSubmit() {
    if (this.strategicPlanForm.valid) {
      console.log('Submitting for approval:', this.strategicPlanForm.value);
    }
  }
} 