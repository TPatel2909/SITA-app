import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  subItems: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  route: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public menuItems: MenuItem[] = [
    {
      label: 'EPMDS',
      subItems: [
        { label: 'Performance Agreement', route: '/epmds/performance' },
        { label: 'EPMDS Workplan (Level 1-12)', route: '/epmds/workplan' },
        { label: 'SMS Workplan (Level 13-16)', route: '/epmds/sms-workplan' },
        { label: 'Personal Development Plan', route: '/epmds/pdp' },
        { label: 'September Review Form', route: '/epmds/september-review' },
        { label: 'Performance Assessment', route: '/epmds/assessment' },
        { label: 'Elementary Occupations', route: '/epmds/elementary' },
        { label: 'Performance Development Plan (EO)', route: '/epmds/pdp-elementary' },
        { label: 'Assessment Factor 1', route: '/epmds/factor1' },
        { label: 'Assessment Criteria', route: '/epmds/criteria' },
        { label: 'Assessment Factor 2', route: '/epmds/factor2' },
        { label: 'Assessment Factor 3', route: '/epmds/factor3' },
        { label: 'Key Result Areas', route: '/epmds/kra' },
        { label: 'Generic Assessment Factors', route: '/epmds/gaf' },
        { label: 'Final Score', route: '/epmds/final-score' },
        { label: 'Quarterly/Annual Assessment', route: '/epmds/quarterly-assessment' }
      ]
    },
    {
      label: 'IAPPMS',
      subItems: [
        { label: 'MTSF Implementation Plan', route: '/iappms/mtsf', icon: '📊', description: 'Medium Term Strategic Framework Implementation Plan' },
        { label: 'Strategic Mapping', route: '/iappms/strategic-mapping', icon: '🗺️', description: 'Strategic Mapping of Provincial Priorities' },
        { label: 'Operational Plan', route: '/iappms/operational-plan', icon: '📋', description: 'Operational Planning and Management' },
        { label: 'Strategic Plan', route: '/iappms/strategic-plan', icon: '🎯', description: 'Strategic Planning and Development' },
        { label: 'Annual Performance Plan', route: '/iappms/annual', icon: '📅', description: 'Annual Performance Planning and Review' }
      ]
    },
    {
      label: 'ESS',
      subItems: [
        { label: 'Personal Information', route: '/ess/personal-info' },
        { label: 'Leave Management', route: '/ess/leave' },
        { label: 'Time Management', route: '/ess/time' },
        { label: 'Benefits', route: '/ess/benefits' },
        { label: 'Documents', route: '/ess/documents' }
      ]
    },
    {
      label: 'Reporting',
      subItems: [
        { label: 'Performance Reports', route: '/reporting/performance' },
        { label: 'Assessment Reports', route: '/reporting/assessment' },
        { label: 'ESS Reports', route: '/reporting/ess' },
        { label: 'Custom Reports', route: '/reporting/custom' },
        { label: 'Analytics Dashboard', route: '/reporting/analytics' }
      ]
    }
  ];
} 