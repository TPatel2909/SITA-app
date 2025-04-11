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
  selector: 'app-assessment-factor-one',
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
  templateUrl: './assessment-factor-one.component.html',
  styleUrls: ['./assessment-factor-one.component.scss']
})
export class AssessmentFactorOneComponent {
  assessmentForm: FormGroup;
  
  readonly assessmentCriteria: AssessmentCriteria[] = [
    {
      id: 1,
      title: 'RESOURCES UTILISATION (CLEANING MATERIAL/ PRINTING PAPER/ MACHINERY, etc)',
      ratings: {
        one: 'Utilises resources in a wasteful manner',
        two: 'To some extent utilises resources in wasteful manner.',
        three: 'Does not waste resources and employee perform well.',
        four: 'Consistent in being resourceful and ensures savings to the Department during the execution of duties and in many cases exceeds resourcefulness',
        five: 'Exceptional ability in utilizing resources in non-wasteful manner and exceptional in resourcefulness.'
      }
    },
    {
      id: 2,
      title: 'PLANNING AND PRIORITIZING OF WORK',
      ratings: {
        one: 'Does not plan and prioritise work. Always behind schedule. Efficiency is low. Needs constant checking & correction.',
        two: 'Some extent of planning but work not always completed on time or at required level of competency. Targets not always met.',
        three: 'Always plan and prioritise work to the benefit of the component. Steady and willing producer. Work needs very little checking.',
        four: 'Work attests to high level of commitment and the employee consistently plans and prioritises work and produces work that exceeds expectations.',
        five: 'Outstanding ability to plan and prioritise work and always does exceptionally more than what is expected.'
      }
    },
    {
      id: 3,
      title: 'SUPERVISION',
      ratings: {
        one: 'Always needs constant checking & correction. Adversely affects work output of component.',
        two: 'Assistance required in fulfilling important key tasks in the job. Work not always completed on time or at required level of competency.',
        three: 'Works adequately without constant supervision. Accuracy & quality of work acceptable.',
        four: 'Consistently produces work with minimal supervision and in many cases exceeds expectations. Work attests to high level of competence.',
        five: 'Always does far more than is expected without supervision. Maintains highest level of quality & exceeds quantity in all key tasks.'
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