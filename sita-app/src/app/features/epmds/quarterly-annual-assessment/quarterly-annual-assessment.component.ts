import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quarterly-annual-assessment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './quarterly-annual-assessment.component.html',
  styleUrls: ['./quarterly-annual-assessment.component.scss']
})
export class QuarterlyAnnualAssessmentComponent implements OnInit {
  assessmentForm: FormGroup = this.initializeForm();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('QuarterlyAnnualAssessmentComponent initialized');
    this.setupConditionalValidators();
  }

  private setupConditionalValidators(): void {
    this.assessmentForm.get('recommendationType')?.valueChanges.subscribe(value => {
      const confirmationNameControl = this.assessmentForm.get('confirmationName');
      const extensionNameControl = this.assessmentForm.get('extensionName');
      const extensionPeriodControl = this.assessmentForm.get('extensionPeriod');
      const extensionReasonsControl = this.assessmentForm.get('extensionReasons');

      if (value === 'confirm') {
        confirmationNameControl?.setValidators(Validators.required);
        extensionNameControl?.clearValidators();
        extensionPeriodControl?.clearValidators();
        extensionReasonsControl?.clearValidators();
      } else if (value === 'extend') {
        confirmationNameControl?.clearValidators();
        extensionNameControl?.setValidators(Validators.required);
        extensionPeriodControl?.setValidators(Validators.required);
        extensionReasonsControl?.setValidators(Validators.required);
      }

      confirmationNameControl?.updateValueAndValidity();
      extensionNameControl?.updateValueAndValidity();
      extensionPeriodControl?.updateValueAndValidity();
      extensionReasonsControl?.updateValueAndValidity();
    });
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      // Basic Information
      quarter: ['', Validators.required],
      name: ['', Validators.required],
      rank: ['', Validators.required],
      component: ['', Validators.required],
      dateOfAppointment: ['', Validators.required],
      periodOfAssessment: ['', Validators.required],
      persalNo: ['', Validators.required],

      // Part 1: Employee Comments
      majorAccomplishments: ['', Validators.required],
      lessSuccessfulAreas: ['', Validators.required],
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required],

      // Part 2: Assessment Scores
      ownRating: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      supervisorRating: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      moderatingRating: ['', [Validators.min(0), Validators.max(100)]],
      finalScoreOwn: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      finalScoreSupervisor: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      finalScoreModerating: ['', [Validators.min(0), Validators.max(100)]],

      // Part 3: Supervisor Section
      trainingReasons: ['', Validators.required],
      isCorrectlyPlaced: ['', Validators.required],
      suitableForPermanent: ['', Validators.required],
      recommendationType: ['', Validators.required],
      confirmationName: [''],
      extensionName: [''],
      extensionPeriod: [''],
      extensionReasons: [''],

      // Employee Comments Section
      employeeComments: ['', Validators.required],
      employeeCommentsSignature: ['', Validators.required],
      employeeCommentsName: ['', Validators.required],
      employeeCommentsDate: ['', Validators.required],

      // Final Approval Section
      approvalSignature: ['', Validators.required],
      approvalName: ['', Validators.required],
      approvalDate: ['', Validators.required]
    });
  }

  saveDraft(): void {
    if (this.assessmentForm.dirty) {
      // TODO: Implement draft saving logic
      this.snackBar.open('Draft saved successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      // TODO: Implement form submission logic
      console.log('Form submitted:', this.assessmentForm.value);
      this.snackBar.open('Assessment submitted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
} 