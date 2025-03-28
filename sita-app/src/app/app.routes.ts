import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { PersonalDevelopmentPlanComponent } from './features/personal-development-plan/personal-development-plan.component';
import { SeptemberReviewComponent } from './features/september-review/september-review.component';
import { QuarterlyAnnualAssessmentComponent } from './features/quarterly-annual-assessment/quarterly-annual-assessment.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'personal-development-plan', component: PersonalDevelopmentPlanComponent },
  { path: 'september-review', component: SeptemberReviewComponent },
  { path: 'quarterly-annual-assessment', component: QuarterlyAnnualAssessmentComponent },
  { path: '**', redirectTo: '/dashboard' }
];
