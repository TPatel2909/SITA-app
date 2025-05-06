import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SignaturePadComponent } from '../../../signature-pad/signature-pad.component';

@Component({
  selector: 'app-september-review',
  templateUrl: './september-review.component.html',
  styleUrls: ['./september-review.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SignaturePadComponent
]
})
export class SeptemberReviewComponent {
  reviewForm: FormGroup;
  @ViewChild('employeeSignaturePad') employeeSignaturePad!: SignaturePadComponent;
  @ViewChild('supervisorSignaturePad') supervisorSignaturePad!: SignaturePadComponent;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      supervisor: ['', Validators.required],
      jobTitle: ['', Validators.required],
      component: ['', Validators.required],
      reviewDate: ['', Validators.required],
      salaryLevel: ['', Validators.required],
      kras: this.fb.array(
        Array(5).fill(null).map(() => this.fb.group({
          description: [''],
          weighting: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
          ownAssessment: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
          supervisorAssessment: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
        }))
      ),
      gafs: this.fb.array(
        Array(5).fill(null).map(() => this.fb.group({
          description: [''],
          weighting: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
          ownRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
          supervisorRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
        }))
      ),
      developmentalAreas: [''],
      unsatisfactoryPerformance: [''],
      employeeComments: [''],
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorComments: [''],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required]
    });
  }

  get kras(): FormArray {
    return this.reviewForm.get('kras') as FormArray;
  }

  get gafs(): FormArray {
    return this.reviewForm.get('gafs') as FormArray;
  }
  getSignautes(){
    // To get the employee signature value
    const employeeSignature = this.reviewForm.get('employeeSignature')?.value;
    console.log("employee",employeeSignature);
    // To get the supervisor signature value
    const supervisorSignature = this.reviewForm.get('supervisorSignature')?.value;
    console.log("superviosr",supervisorSignature);
  }
  onSubmit() {
    this.getSignautes();
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      // Add your form submission logic here
    }
  }
} 