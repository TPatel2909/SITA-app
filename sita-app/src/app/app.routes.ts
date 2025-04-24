import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { PersonalDevelopmentPlanComponent } from './features/personal-development-plan/personal-development-plan.component';
import { SeptemberReviewComponent } from './features/september-review/september-review.component';
import { PerformanceAssessmentComponent } from './features/performance-assessment/performance-assessment.component';
import { QuarterlyAnnualAssessmentComponent } from './features/quarterly-annual-assessment/quarterly-annual-assessment.component';
import { ElementaryComponent } from './features/elementary/elementary.component';
import { PdpElementaryComponent } from './features/pdp-elementary/pdp-elementary.component';
import { AssessmentFactorOneComponent } from './features/assessment-factor-one/assessment-factor-one.component';
import { AssessmentCriteriaComponent } from './features/assessment-criteria/assessment-criteria.component';
import { AssessmentFactorTwoComponent } from './features/assessment-factor-two/assessment-factor-two.component';
import { AssessmentFactorThreeComponent } from './features/assessment-factor-three/assessment-factor-three.component';
import { WorkplanComponent } from './features/workplan/workplan.component';
import { SmsWorkplanComponent } from './features/sms-workplan/sms-workplan.component';
import { PerformanceRatingScaleComponent } from './features/performance-rating-scale/performance-rating-scale.component';
import { KeyResultAreasComponent } from './features/key-result-areas/key-result-areas.component';
import { GenericAssessmentFactorComponent } from './features/generic-assessment-factor/generic-assessment-factor.component';
import { FinalScoreComponent } from './features/final-score/final-score.component';
import { AppWorksTestComponent } from './test/appworks-test.component';

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
      { path: 'assessment', component: PerformanceAssessmentComponent },
      { path: 'quarterly-assessment', component: QuarterlyAnnualAssessmentComponent },
      { path: 'elementary', component: ElementaryComponent },
      { path: 'pdp-elementary', component:PdpElementaryComponent },
      { path: 'factor1', component: AssessmentFactorOneComponent },
      { path: 'criteria', component: AssessmentCriteriaComponent },
      { path: 'factor2', component: AssessmentFactorTwoComponent },
      { path: 'factor3', component: AssessmentFactorThreeComponent },
      { path: 'rating-scale', component: PerformanceRatingScaleComponent },
      { path: 'kra', component: KeyResultAreasComponent },
      { path: 'gaf', component: GenericAssessmentFactorComponent },
      { path: 'final-score', component: FinalScoreComponent }
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
  { path: 'appworks-test', component: AppWorksTestComponent },
  { path: '**', redirectTo: '/dashboard' }
];
