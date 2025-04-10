import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface AssessmentCriteria {
  id: number;
  title: string;
  ratings: {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
  };
}

interface RatingControls {
  [key: string]: any;
}

@Component({
  selector: 'app-assessment-criteria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './assessment-criteria.component.html',
  styleUrls: ['./assessment-criteria.component.scss']
})
export class AssessmentCriteriaComponent {
  assessmentForm: FormGroup;
  
  readonly assessmentCriteria: AssessmentCriteria[] = [
    {
      id: 4,
      title: 'DEDICATION AND PRIDE IN WORK PERFORMANCE',
      ratings: {
        one: 'Official lacks dedication and pride in work is always disorderly. Needs significant prompting and guidance. Never meets commitments.',
        two: 'Work is sometimes disorderly and not always completed at required level of competence. Targets not always met.',
        three: 'Work is neat and accuracy & quality of work acceptable. Meets all expectations and performs well.',
        four: 'Work attests to high level of dedication, neatness and accuracy. Consistently produces work of high quality and in many cases exceeds expectations.',
        five: 'Always maintains highest level of quality & neatness in all key tasks. Produces excellent work indicating dedication and pride. Consistently exceeds expectations.'
      }
    },
    {
      id: 5,
      title: 'ACCEPTANCE OF ADDED RESPONSIBILITY',
      ratings: {
        one: 'Refuses to undertake new work or accept changes in work practices. Frequently fails to execute functions as instructed. Declines all responsibility for own areas of work.',
        two: 'To some extent undertakes new work or accept changes in work practices. Training and counseling still required to cope with the full range of responsibilities.',
        three: 'Constantly accepts responsibility in a competent manner. Can be relied upon to accept added responsibility in respect of own areas of work and in respect of other employees in their absence when requested to do so.',
        four: 'Can be relied upon to cope with added responsibility. Will in many cases, out of own initiative, accept added responsibility of own areas of work and of other employees in their absence.',
        five: 'Exceptional ability to accept added responsibility for own areas of work and of other employees in their absence.'
      }
    },
    {
      id: 6,
      title: 'PROBLEM SOLVING',
      ratings: {
        one: 'Unable to solve problems relating to his/her the work.',
        two: 'Is sometimes able to solve problems relating to his/her work but still have shortcomings.',
        three: 'Succeeds in identifying and solving problems in the work satisfactorily.',
        four: 'Demonstrates ability to consistently be effective and efficient in solving problems in the work timeously and sometimes exceeds this ability.',
        five: 'Demonstrates an exceptional ability to quickly solve complex work problems independently.'
      }
    }
  ];

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.createForm();
  }

  private createForm(): FormGroup {
    const ratingControls: RatingControls = {};
    
    this.assessmentCriteria.forEach(criteria => {
      ratingControls[`rating${criteria.id}`] = ['', [Validators.required, Validators.min(1), Validators.max(5)]];
    });

    return this.fb.group({
      employeeName: ['', Validators.required],
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required],
      ...ratingControls
    });
  }

  getRatingDescription(criteriaId: number, rating: number): string {
    const criteria = this.assessmentCriteria.find(c => c.id === criteriaId);
    if (!criteria) return '';

    switch (rating) {
      case 1: return criteria.ratings.one;
      case 2: return criteria.ratings.two;
      case 3: return criteria.ratings.three;
      case 4: return criteria.ratings.four;
      case 5: return criteria.ratings.five;
      default: return '';
    }
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      console.log(this.assessmentForm.value);
      // Handle form submission
    }
  }

  saveDraft(): void {
    console.log('Saving draft:', this.assessmentForm.value);
    // Handle draft saving
  }
} 