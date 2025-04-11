import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface AssessmentCriteria {
  criteria: string;
  weight: number;
  rating: number;
  score: number;
}

@Component({
  selector: 'app-assessment-factor-three',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './assessment-factor-three.component.html',
  styleUrls: ['./assessment-factor-three.component.scss']
})
export class AssessmentFactorThreeComponent {
  assessmentForm!: FormGroup;
  totalWeight: number = 0;
  totalScore: number = 0;

  readonly assessmentCriteria: AssessmentCriteria[] = [
    { criteria: 'Problem solving and analysis', weight: 15, rating: 0, score: 0 },
    { criteria: 'People management and empowerment', weight: 15, rating: 0, score: 0 },
    { criteria: 'Client orientation and customer focus', weight: 15, rating: 0, score: 0 },
    { criteria: 'Communication', weight: 15, rating: 0, score: 0 },
    { criteria: 'Honesty and integrity', weight: 20, rating: 0, score: 0 },
    { criteria: 'Service delivery innovation', weight: 20, rating: 0, score: 0 }
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.calculateTotalWeight();
  }

  private createForm() {
    this.assessmentForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      assessmentPeriod: ['', Validators.required],
      ratings: this.fb.group({}),
      comments: ['', Validators.required],
      strengthsIdentified: ['', Validators.required],
      areasForImprovement: ['', Validators.required],
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required]
    });

    // Add form controls for each criteria rating
    this.assessmentCriteria.forEach(criteria => {
      (this.assessmentForm.get('ratings') as FormGroup).addControl(
        criteria.criteria,
        this.fb.control('', [Validators.required, Validators.min(1), Validators.max(5)])
      );
    });

    // Subscribe to rating changes to update scores
    this.assessmentForm.get('ratings')?.valueChanges.subscribe(values => {
      this.updateScores(values);
    });
  }

  private calculateTotalWeight() {
    this.totalWeight = this.assessmentCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);
  }

  private updateScores(ratings: { [key: string]: number }) {
    this.totalScore = 0;
    this.assessmentCriteria.forEach(criteria => {
      const rating = ratings[criteria.criteria] || 0;
      criteria.rating = rating;
      criteria.score = (criteria.weight / 100) * rating;
      this.totalScore += criteria.score;
    });
  }

  getRatingDescription(rating: number): string {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  }

  getRatingDetails(rating: number): string {
    switch (rating) {
      case 1: return 'Performance far below the standard expected for the job';
      case 2: return 'Performance does not fully meet the standards expected for the job';
      case 3: return 'Performance fully meets the standards expected for the job';
      case 4: return 'Performance significantly above expectations';
      case 5: return 'Outstanding performance; far exceeds standards and expectations';
      default: return '';
    }
  }

  getPerformanceCategory(score: number): string {
    if (score >= 4.5) return 'Outstanding Performance';
    if (score >= 3.5) return 'Performance Significantly Above Expectations';
    if (score >= 2.5) return 'Fully Effective Performance';
    if (score >= 1.5) return 'Performance Not Fully Effective';
    return 'Unacceptable Performance';
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      console.log(this.assessmentForm.value);
      // Handle form submission
    }
  }

  saveDraft() {
    console.log('Saving draft:', this.assessmentForm.value);
    // Handle draft saving
  }
} 