import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { inject } from '@angular/core';

@Component({
  selector: 'app-quarterly-annual-assessment',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './quarterly-annual-assessment.component.html',
  styleUrls: ['./quarterly-annual-assessment.component.scss']
})
export class QuarterlyAnnualAssessmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  assessmentForm = this.fb.group({
    quarter: ['', Validators.required],
    name: ['', Validators.required],
    rank: ['', Validators.required],
    component: ['', Validators.required],
    dateOfAppointment: ['', Validators.required],
    periodOfAssessment: ['', Validators.required],
    persalNumber: ['', Validators.required],
    employeeAccomplishments: ['', Validators.required],
    areasOfLessSuccess: ['', Validators.required],
    supervisorAssessment: ['', Validators.required],
    finalScore: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    trainingReasons: [''],
    placementSuitability: ['', Validators.required],
    recommendationType: ['', Validators.required],
    recommendationDetails: ['']
  });
  isLoading = true;

  constructor() {
    // Set up conditional validation for recommendationDetails
    this.assessmentForm.get('recommendationType')?.valueChanges.subscribe(value => {
      const detailsControl = this.assessmentForm.get('recommendationDetails');
      if (value === 'other') {
        detailsControl?.setValidators(Validators.required);
      } else {
        detailsControl?.clearValidators();
      }
      detailsControl?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    // Simulate data loading - replace with actual data fetching
    setTimeout(() => {
      // Here you would typically fetch data from a service
      this.isLoading = false;
    }, 1000);
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      console.log('Form submitted:', this.assessmentForm.value);
      // Add your submission logic here
    } else {
      this.markFormGroupTouched(this.assessmentForm);
    }
  }

  saveDraft() {
    console.log('Draft saved:', this.assessmentForm.value);
    // Add your draft saving logic here
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
} 