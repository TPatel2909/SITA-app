import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { PersonalDevelopmentPlanComponent } from './features/epmds/personal-development-plan/personal-development-plan.component';
import { SeptemberReviewComponent } from './features/epmds/september-review/september-review.component';
import { PerformanceAssessmentComponent } from './features/epmds/performance-assessment/performance-assessment.component';
import { QuarterlyAnnualAssessmentComponent } from './features/epmds/quarterly-annual-assessment/quarterly-annual-assessment.component';
import { ElementaryComponent } from './features/epmds/elementary/elementary.component';
import { PdpElementaryComponent } from './features/epmds/pdp-elementary/pdp-elementary.component';
import { AssessmentFactorOneComponent } from './features/epmds/assessment-factor-one/assessment-factor-one.component';
import { AssessmentCriteriaComponent } from './features/epmds/assessment-criteria/assessment-criteria.component';
import { AssessmentFactorTwoComponent } from './features/epmds/assessment-factor-two/assessment-factor-two.component';
import { AssessmentFactorThreeComponent } from './features/epmds/assessment-factor-three/assessment-factor-three.component';
import { WorkplanComponent } from './features/epmds/workplan/workplan.component';
import { SmsWorkplanComponent } from './features/epmds/sms-workplan/sms-workplan.component';
import { PerformanceRatingScaleComponent } from './features/epmds/performance-rating-scale/performance-rating-scale.component';
import { KeyResultAreasComponent } from './features/epmds/key-result-areas/key-result-areas.component';
import { GenericAssessmentFactorComponent } from './features/epmds/generic-assessment-factor/generic-assessment-factor.component';
import { FinalScoreComponent } from './features/epmds/final-score/final-score.component';
import { MtsfImplementationPlanComponent } from './features/iappms/components/mtsf-implementation-plan/mtsf-implementation-plan.component';
import { IAPPMS_ROUTES } from './features/iappms/iappms.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/iappms/mtsf', pathMatch: 'full' },
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
      { path: 'kra', component: KeyResultAreasComponent },
      { path: 'gaf', component: GenericAssessmentFactorComponent },
      { path: 'final-score', component: FinalScoreComponent }
    ]
  },
  { 
    path: 'iappms',
    children: IAPPMS_ROUTES
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
  { path: '**', redirectTo: '/iappms/mtsf' }
];
