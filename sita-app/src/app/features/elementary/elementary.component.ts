import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-elementary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './elementary.component.html',
  styleUrls: ['./elementary.component.scss']
})
export class ElementaryComponent {
  elementaryForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.elementaryForm = this.fb.group({
      periodUnderReview: ['', Validators.required],
      periodTo: ['', Validators.required],
      surname: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salaryLevel: ['', Validators.required],
      persalNo: ['', Validators.required],
      component: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      race: ['', Validators.required],
      gender: ['', Validators.required],
      disability: [''],
      employmentStatus: ['', Validators.required],
      
      // Signatures
      employeeSignature: ['', Validators.required],
      employeeDate: ['', Validators.required],
      supervisorSignature: ['', Validators.required],
      supervisorDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.elementaryForm.valid) {
      console.log(this.elementaryForm.value);
    }
  }

  saveDraft() {
    console.log('Saving draft:', this.elementaryForm.value);
  }
} 