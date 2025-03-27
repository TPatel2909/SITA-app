import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-personal-development-plan',
  templateUrl: './personal-development-plan.component.html',
  styleUrls: ['./personal-development-plan.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ]
})
export class PersonalDevelopmentPlanComponent {
  plans = [
    {
      id: 1,
      goal: 'Improve Technical Skills',
      objectives: [
        'Complete Angular Advanced Course',
        'Learn TypeScript Best Practices',
        'Master RxJS Concepts'
      ],
      timeline: 'Q2 2024',
      status: 'In Progress'
    },
    {
      id: 2,
      goal: 'Leadership Development',
      objectives: [
        'Attend Leadership Workshop',
        'Lead Team Projects',
        'Mentor Junior Developers'
      ],
      timeline: 'Q3 2024',
      status: 'Planned'
    },
    {
      id: 3,
      goal: 'Project Management',
      objectives: [
        'PMP Certification',
        'Agile Methodologies Training',
        'Stakeholder Management'
      ],
      timeline: 'Q4 2024',
      status: 'Not Started'
    }
  ];
}
