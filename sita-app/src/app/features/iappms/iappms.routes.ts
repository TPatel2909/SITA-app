import { Routes } from '@angular/router';
import { MtsfImplementationPlanComponent } from './components/mtsf-implementation-plan/mtsf-implementation-plan.component';
import { StrategicMappingComponent } from './components/strategic-mapping/strategic-mapping.component';
import { OperationalPlanComponent } from './components/operational-plan/operational-plan.component';
import { StrategicPlanComponent } from './components/strategic-plan/strategic-plan.component';
import { AnnualPerformancePlanComponent } from './components/annual-performance-plan/annual-performance-plan.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const IAPPMS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: { breadcrumb: 'IAPPMS' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: 'IAPPMS Dashboard' }
  },
  {
    path: 'mtsf',
    component: MtsfImplementationPlanComponent,
    data: { breadcrumb: 'MTSF Implementation Plan' }
  },
  {
    path: 'strategic-mapping',
    component: StrategicMappingComponent,
    data: { breadcrumb: 'Strategic Mapping' }
  },
  {
    path: 'operational-plan',
    component: OperationalPlanComponent,
    data: { breadcrumb: 'Operational Plan' }
  },
  {
    path: 'strategic-plan',
    component: StrategicPlanComponent,
    data: { breadcrumb: 'Strategic Plan' }
  },
  {
    path: 'annual',
    component: AnnualPerformancePlanComponent,
    data: { breadcrumb: 'Annual Performance Plan' }
  }
]; 