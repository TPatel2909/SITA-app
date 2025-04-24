import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface StrategicMapping {
  outcome: string;
  outcomeIndicators: string;
  baseline: string;
  fiveYearTarget: string;
  nationalPriority: string;
  mtsfOutcome: string;
  actionPlanGoal: string;
}

@Component({
  selector: 'app-strategic-mapping',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './strategic-mapping.component.html',
  styleUrls: ['./strategic-mapping.component.scss']
})
export class StrategicMappingComponent {
  mappings: StrategicMapping[] = [
    {
      outcome: 'Sound corporate governance and accountability',
      outcomeIndicators: 'Clean Audit Outcome',
      baseline: 'Unqualified audit opinion',
      fiveYearTarget: 'Clean Audit',
      nationalPriority: 'Work towards results oriented mutual accountability.',
      mtsfOutcome: 'Improved leadership, governance and accountability',
      actionPlanGoal: 'Ensure that the basic annual management processes take place across all schools in the country in a way that contributes towards a functional school environment.'
    },
    {
      outcome: 'Youth better prepared for further learning and world of work',
      outcomeIndicators: 'Percentage of learners achieve Bachelor Passes in NSC.',
      baseline: '33%',
      fiveYearTarget: '60%',
      nationalPriority: 'Improving foundational skills of Numeracy and Literacy, especially Reading which should be underpinned by a Reading Revolution.',
      mtsfOutcome: 'Outcome 4: Youth leaving the schooling system more prepared to contribute to prosperous and equitable South Africa',
      actionPlanGoal: 'Goal 4: Increase the number of Grade 12 learners who become eligible for a Bachelors programme at a university.'
    }
  ];
} 