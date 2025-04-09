import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { PersonalDevelopmentPlanComponent } from './features/personal-development-plan/personal-development-plan.component';
import { SeptemberReviewComponent } from './features/september-review/september-review.component';
import { QuarterlyAnnualAssessmentComponent } from './features/quarterly-annual-assessment/quarterly-annual-assessment.component';
import { WorkplanComponent } from './features/workplan/workplan.component';
import { SmsWorkplanComponent } from './features/sms-workplan/sms-workplan.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'epmds',
    children: [
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
      { path: 'performance', component: PerformanceComponent },
      { path: 'workplan', component: WorkplanComponent },
      { path: 'sms-workplan', component: SmsWorkplanComponent },
      { path: 'pdp', component: PersonalDevelopmentPlanComponent },
      { path: 'september-review', component: SeptemberReviewComponent },
      { path: 'assessment', component: QuarterlyAnnualAssessmentComponent },
      { path: 'quarterly-assessment', component: QuarterlyAnnualAssessmentComponent },
      { path: 'elementary', component: TasksComponent },
      { path: 'pdp-elementary', component: TasksComponent },
      { path: 'factor1', component: TasksComponent },
      { path: 'criteria', component: TasksComponent },
      { path: 'factor2', component: TasksComponent },
      { path: 'factor3', component: TasksComponent },
      { path: 'rating-scale', component: TasksComponent },
      { path: 'kra', component: TasksComponent },
      { path: 'gaf', component: TasksComponent },
      { path: 'final-score', component: TasksComponent }
    ]
  },
  { 
    path: 'iappms',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProjectsComponent },
      { path: 'settings', component: TasksComponent }
    ]
  },
  { 
    path: 'ess',
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
      { path: 'personal-info', component: TasksComponent },
      { path: 'leave', component: TasksComponent },
      { path: 'time', component: TasksComponent },
      { path: 'benefits', component: TasksComponent },
      { path: 'documents', component: TasksComponent }
    ]
  },
  { 
    path: 'reporting',
    children: [
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
      { path: 'performance', component: ReportsComponent },
      { path: 'assessment', component: ReportsComponent },
      { path: 'ess', component: ReportsComponent },
      { path: 'custom', component: ReportsComponent },
      { path: 'analytics', component: ReportsComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
