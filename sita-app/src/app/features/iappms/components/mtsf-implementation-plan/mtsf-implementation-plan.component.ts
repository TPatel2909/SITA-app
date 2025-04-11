import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MTSFOutcome {
  outcomes: string;
  indicator: string;
  baseline2019: string;
  target2024: string;
  interventions: string;
  indicators: string;
  baseline: string;
  targets: string;
  poaContribution: string;
  source: string;
  appIndicator: string;
  opsIndicator: string;
}

@Component({
  selector: 'app-mtsf-implementation-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mtsf-implementation-plan.component.html',
  styleUrls: ['./mtsf-implementation-plan.component.scss']
})
export class MtsfImplementationPlanComponent {
  mtsfPriority = '3: Health and Education';
  mtsfAreaOfEmphasis = '6: Education and skills for a changing world';
  provincialPriority = '5: Education and Skills Development';
  
  impacts2024 = [
    'Access to Pre-schooling expanded to 95% and quality improved',
    'More children in foundation phase acquire levels of literacy and numeracy required for meaningful lifelong learning by 2024',
    'Improved quality of learning outcomes in the intermediate and senior phases, with inequalities reduced by 2024',
    'More learners obtain a National Senior Certificate (NSC) with Excellent mark in critically important subjects by 2024',
    'Learners and teachers feel respected and learning improves by 2024'
  ];

  outcomes: MTSFOutcome[] = [
    {
      outcomes: 'Improved school readiness of children',
      indicator: 'Proportion of 6 year old (Grade R) enrolled in educational institutions by 2024',
      baseline2019: '96.00%',
      target2024: '99%',
      interventions: 'Migrate the responsibility for pre-schooling to the Department of Basic Education',
      indicators: 'Amendment of legislation to regulate the new ECD land scape',
      baseline: 'New Indicator',
      targets: 'Presidential and provincial Proclamations gazette by 2022 and migration concluded by 2024',
      poaContribution: 'Migrate the responsibility for pre-schooling to the DBE - provincial implementation of migration',
      source: 'Percentage Contracts, SLA, MOU and litigations transferred from KZNDSD to KZNDOE.',
      appIndicator: 'N/A',
      opsIndicator: 'Contracts, SLA, MOU and litigations transferred from KZNDSD to KZNDOE.'
    }
  ];
} 