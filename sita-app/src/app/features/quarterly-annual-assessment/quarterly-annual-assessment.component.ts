import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quarterly-annual-assessment',
  templateUrl: './quarterly-annual-assessment.component.html',
  styleUrls: ['./quarterly-annual-assessment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class QuarterlyAnnualAssessmentComponent {
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