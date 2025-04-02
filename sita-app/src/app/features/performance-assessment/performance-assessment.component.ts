import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performance-assessment',
  templateUrl: './performance-assessment.component.html',
  styleUrls: ['./performance-assessment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerformanceAssessmentComponent {
  // Properties for form data
  periodFrom: string = '';
  periodTo: string = '';
  surnameInitials: string = '';
  jobTitle: string = '';
  salaryLevel: string = '';
  persalNo: string = '';
  component: string = '';
  appointmentDate: string = '';
  disability: string = '';
  
  // Radio button selections
  selectedRace: string = '';
  selectedGender: string = '';
  selectedProbation: string = '';
} 