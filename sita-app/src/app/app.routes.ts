import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { LandingComponent } from './landing/landing.component';
import { CordysTestComponent } from './auth/cordys-test/cordys-test.component';
import { ExampleComponent } from './auth/serv/example/example.component';
import { UserExampleComponent } from './auth/serv/user-example/user-example.component';

// Import EPMDS feature components
import {
  PersonalDevelopmentPlanComponent,
  SeptemberReviewComponent,
  PerformanceAssessmentComponent,
  QuarterlyAnnualAssessmentComponent,
  ElementaryComponent,
  PdpElementaryComponent,
  AssessmentFactorOneComponent,
  AssessmentCriteriaComponent,
  AssessmentFactorTwoComponent,
  AssessmentFactorThreeComponent,
  WorkplanComponent,
  SmsWorkplanComponent,
  PerformanceRatingScaleComponent,
  KeyResultAreasComponent,
  GenericAssessmentFactorComponent,
  FinalScoreComponent,
  AnnualPerformanceAssessmentComponent
} from './features/epmds/index';

//import { MtsfImplementationPlanComponent } from './features/iappms/components/mtsf-implementation-plan/mtsf-implementation-plan.component';
import { IAPPMS_ROUTES } from './features/iappms/iappms.routes';

export const routes: Routes = [
  { path: 'cordys-test', component: CordysTestComponent },
  { path: 'ExampleComponent', component: ExampleComponent },
  { path: 'UserExampleComponent', component: UserExampleComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'SignaturePadComponent',
    component: SignaturePadComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'epmds',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'EPMDS' },
    children: [
      {
        path: '',
        redirectTo: 'performance',
        pathMatch: 'full'
      },
      {
        path: 'performance',
        component: PerformanceComponent,
        data: { breadcrumb: 'Performance Agreement' }
      },
      { 
        path: 'pdp', 
        component: PersonalDevelopmentPlanComponent,
        data: { breadcrumb: 'Personal Development Plan' }
      },
      { 
        path: 'september-review', 
        component: SeptemberReviewComponent,
        data: { breadcrumb: 'September Review' }
      },
      { 
        path: 'performance-assessment', 
        component: PerformanceAssessmentComponent,
        data: { breadcrumb: 'Performance Assessment' }
      },
      { 
        path: 'quarterly-assessment', 
        component: QuarterlyAnnualAssessmentComponent,
        data: { breadcrumb: 'Quarterly/Annual Assessment' }
      },
      { 
        path: 'annual-performance-assessment-instrument', 
        component: AnnualPerformanceAssessmentComponent,
        data: { breadcrumb: 'Annual Performance Assessment Instrument' }
      },
      { 
        path: 'elementary', 
        component: ElementaryComponent,
        data: { breadcrumb: 'Elementary Occupations' }
      },
      { 
        path: 'pdp-elementary', 
        component: PdpElementaryComponent,
        data: { breadcrumb: 'PDP Elementary' }
      },
      { 
        path: 'assessment-factor-one', 
        component: AssessmentFactorOneComponent,
        data: { breadcrumb: 'Assessment Factor 1' }
      },
      { 
        path: 'assessment-criteria', 
        component: AssessmentCriteriaComponent,
        data: { breadcrumb: 'Assessment Criteria' }
      },
      { 
        path: 'assessment-factor-two', 
        component: AssessmentFactorTwoComponent,
        data: { breadcrumb: 'Assessment Factor 2' }
      },
      { 
        path: 'assessment-factor-three', 
        component: AssessmentFactorThreeComponent,
        data: { breadcrumb: 'Assessment Factor 3' }
      },
      { 
        path: 'workplan', 
        component: WorkplanComponent,
        data: { breadcrumb: 'Workplan' }
      },
      { 
        path: 'sms-workplan', 
        component: SmsWorkplanComponent,
        data: { breadcrumb: 'SMS Workplan' }
      },
      { 
        path: 'performance-rating-scale', 
        component: PerformanceRatingScaleComponent,
        data: { breadcrumb: 'Performance Rating Scale' }
      },
      { 
        path: 'key-result-areas', 
        component: KeyResultAreasComponent,
        data: { breadcrumb: 'Key Result Areas' }
      },
      { 
        path: 'generic-assessment-factor', 
        component: GenericAssessmentFactorComponent,
        data: { breadcrumb: 'Generic Assessment Factor' }
      },
      { 
        path: 'final-score', 
        component: FinalScoreComponent,
        data: { breadcrumb: 'Final Score' }
      }
    ]
  },
  {
    path: 'iappms',
    data: { breadcrumb: 'IAPPMS' },
    children: IAPPMS_ROUTES
  },
  { 
    path: 'ess',
    data: { breadcrumb: 'ESS' },
    children: [
      { 
        path: '', 
        redirectTo: 'personal-info', 
        pathMatch: 'full'
      },
      { 
        path: 'personal-info', 
        component: TasksComponent,
        data: { breadcrumb: 'Personal Info' }
      },
      { 
        path: 'leave', 
        component: TasksComponent,
        data: { breadcrumb: 'Leave' }
      },
      { 
        path: 'time', 
        component: TasksComponent,
        data: { breadcrumb: 'Time' }
      },
      { 
        path: 'benefits', 
        component: TasksComponent,
        data: { breadcrumb: 'Benefits' }
      },
      { 
        path: 'documents', 
        component: TasksComponent,
        data: { breadcrumb: 'Documents' }
      }
    ]
  },
  { 
    path: 'reporting',
    data: { breadcrumb: 'Reporting' },
    children: [
      { 
        path: '', 
        redirectTo: 'performance', 
        pathMatch: 'full'
      },
      { 
        path: 'performance', 
        component: ReportsComponent,
        data: { breadcrumb: 'Performance' }
      },
      { 
        path: 'assessment', 
        component: ReportsComponent,
        data: { breadcrumb: 'Assessment' }
      },
      { 
        path: 'ess', 
        component: ReportsComponent,
        data: { breadcrumb: 'ESS' }
      },
      { 
        path: 'custom', 
        component: ReportsComponent,
        data: { breadcrumb: 'Custom' }
      },
      { 
        path: 'analytics', 
        component: ReportsComponent,
        data: { breadcrumb: 'Analytics' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
