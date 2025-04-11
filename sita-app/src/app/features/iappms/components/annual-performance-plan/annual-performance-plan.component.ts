import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface ProgrammeItem {
  programme: string;
  outcome: string;
  outputs: string;
  outputIndicator: string;
  performanceIndicator: string;
  annualTargets: string;
}

@Component({
  selector: 'app-annual-performance-plan',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './annual-performance-plan.component.html',
  styleUrls: ['./annual-performance-plan.component.scss']
})
export class AnnualPerformancePlanComponent implements OnInit {
  annualPlanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.annualPlanForm = this.fb.group({
      mandate: ['', Validators.required],
      situationalAnalysis: ['', Validators.required],
      externalAnalysis: ['', Validators.required],
      internalAnalysis: ['', Validators.required],
      programmes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addProgramme();
  }

  get programmes() {
    return this.annualPlanForm.get('programmes') as FormArray;
  }

  addProgramme() {
    const programme = this.fb.group({
      programme: ['', Validators.required],
      outcome: ['', Validators.required],
      outputs: ['', Validators.required],
      outputIndicator: ['', Validators.required],
      performanceIndicator: ['', Validators.required],
      annualTargets: ['', Validators.required]
    });

    this.programmes.push(programme);
  }

  removeProgramme(index: number) {
    if (this.programmes.length > 1) {
      this.programmes.removeAt(index);
    }
  }

  onSave() {
    if (this.annualPlanForm.valid) {
      console.log('Saving annual performance plan:', this.annualPlanForm.value);
    }
  }

  onSubmit() {
    if (this.annualPlanForm.valid) {
      console.log('Submitting annual performance plan:', this.annualPlanForm.value);
    }
  }
} 