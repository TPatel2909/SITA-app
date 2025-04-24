import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
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


export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'epmds',
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
        path: 'assessment', 
        component: PerformanceAssessmentComponent,
        data: { breadcrumb: 'Assessment' }
      },
      { 
        path: 'quarterly-assessment', 
        component: QuarterlyAnnualAssessmentComponent,
        data: { breadcrumb: 'Quarterly Assessment' }
      },
      { 
        path: 'elementary', 
        component: ElementaryComponent,
        data: { breadcrumb: 'Elementary' }
      },
      { 
        path: 'pdp-elementary', 
        component: PdpElementaryComponent,
        data: { breadcrumb: 'PDP Elementary' }
      },
      { 
        path: 'factor1', 
        component: AssessmentFactorOneComponent,
        data: { breadcrumb: 'Factor 1' }
      },
      { 
        path: 'criteria', 
        component: AssessmentCriteriaComponent,
        data: { breadcrumb: 'Criteria' }
      },
      { 
        path: 'factor2', 
        component: AssessmentFactorTwoComponent,
        data: { breadcrumb: 'Factor 2' }
      },
      { 
        path: 'factor3', 
        component: AssessmentFactorThreeComponent,
        data: { breadcrumb: 'Factor 3' }
      },
      { 
        path: 'kra', 
        component: KeyResultAreasComponent,
        data: { breadcrumb: 'Key Result Areas' }
      },
      { 
        path: 'gaf', 
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
  { path: '**', redirectTo: '/dashboard' }
];
