import { Routes } from '@angular/router';
import { MtsfImplementationPlanComponent } from './components/mtsf-implementation-plan/mtsf-implementation-plan.component';
import { StrategicMappingComponent } from './components/strategic-mapping/strategic-mapping.component';
import { OperationalPlanComponent } from './components/operational-plan/operational-plan.component';
import { StrategicPlanComponent } from './components/strategic-plan/strategic-plan.component';
import { AnnualPerformancePlanComponent } from './components/annual-performance-plan/annual-performance-plan.component';

export const IAPPMS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'mtsf',
    pathMatch: 'full'
  },
  {
    path: 'mtsf',
    component: MtsfImplementationPlanComponent,
    title: 'MTSF Implementation Plan'
  },
  {
    path: 'strategic-mapping',
    component: StrategicMappingComponent,
    title: 'Strategic Mapping'
  },
  {
    path: 'operational-plan',
    component: OperationalPlanComponent,
    title: 'Operational Plan'
  },
  {
    path: 'strategic-plan',
    component: StrategicPlanComponent,
    title: 'Strategic Plan'
  },
  {
    path: 'annual',
    component: AnnualPerformancePlanComponent,
    title: 'Annual Performance Plan'
  }
]; 