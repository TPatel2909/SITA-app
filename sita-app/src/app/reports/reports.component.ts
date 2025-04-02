import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReportCard {
  id: number;
  title: string;
  description: string;
  type: 'chart' | 'table' | 'summary';
  data: any;
  lastUpdated: Date;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reports-container">
      <h1>Reports</h1>
      
      <div class="reports-header">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search reports..."
            class="search-input"
          >
        </div>
        <div class="filter-options">
          <select [(ngModel)]="selectedType" class="type-select">
            <option value="">All Types</option>
            <option value="chart">Charts</option>
            <option value="table">Tables</option>
            <option value="summary">Summaries</option>
          </select>
        </div>
      </div>

      <div class="reports-grid">
        <div *ngFor="let report of filteredReports" class="report-card">
          <div class="report-header">
            <h3>{{ report.title }}</h3>
            <span class="report-type">{{ report.type }}</span>
          </div>
          
          <p class="report-description">{{ report.description }}</p>
          
          <div class="report-preview">
            <div class="preview-placeholder">
              {{ getPreviewContent(report.type) }}
            </div>
          </div>
          
          <div class="report-footer">
            <span class="last-updated">
              Last updated: {{ report.lastUpdated | date }}
            </span>
            <div class="report-actions">
              <button class="action-btn view">View</button>
              <button class="action-btn export">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 1rem;
    }
    
    .reports-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
    }
    
    .search-box {
      flex: 1;
      max-width: 400px;
    }
    
    .search-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .filter-options {
      display: flex;
      gap: 1rem;
    }
    
    .type-select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      min-width: 150px;
    }
    
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .report-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
    }
    
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }
    
    .report-type {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      text-transform: capitalize;
      background-color: #e9ecef;
      color: #495057;
    }
    
    .report-description {
      color: #666;
      margin: 0.5rem 0;
      font-size: 0.9rem;
      line-height: 1.4;
    }
    
    .report-preview {
      background-color: #f8f9fa;
      border-radius: 4px;
      padding: 1rem;
      margin: 1rem 0;
      min-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .preview-placeholder {
      color: #adb5bd;
      font-size: 0.9rem;
    }
    
    .report-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    
    .last-updated {
      font-size: 0.8rem;
      color: #666;
    }
    
    .report-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .action-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s ease;
      
      &.view {
        background-color: #007bff;
        color: white;
        
        &:hover {
          background-color: #0056b3;
        }
      }
      
      &.export {
        background-color: #28a745;
        color: white;
        
        &:hover {
          background-color: #218838;
        }
      }
    }
  `]
})
export class ReportsComponent {
  searchQuery = '';
  selectedType = '';
  
  reports: ReportCard[] = [
    {
      id: 1,
      title: 'Project Progress Overview',
      description: 'Visual representation of project completion rates and milestones',
      type: 'chart',
      data: {},
      lastUpdated: new Date('2024-03-26')
    },
    {
      id: 2,
      title: 'Task Completion Report',
      description: 'Detailed breakdown of task completion by team member',
      type: 'table',
      data: {},
      lastUpdated: new Date('2024-03-26')
    },
    {
      id: 3,
      title: 'Monthly Performance Summary',
      description: 'Key performance indicators and metrics for the current month',
      type: 'summary',
      data: {},
      lastUpdated: new Date('2024-03-25')
    },
    {
      id: 4,
      title: 'Resource Allocation',
      description: 'Team member workload and resource distribution',
      type: 'chart',
      data: {},
      lastUpdated: new Date('2024-03-24')
    }
  ];
  
  get filteredReports(): ReportCard[] {
    let filtered = this.reports;
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query)
      );
    }
    
    if (this.selectedType) {
      filtered = filtered.filter(report => report.type === this.selectedType);
    }
    
    return filtered;
  }
  
  getPreviewContent(type: string): string {
    switch (type) {
      case 'chart':
        return '📊 Chart Preview';
      case 'table':
        return '📋 Table Preview';
      case 'summary':
        return '📝 Summary Preview';
      default:
        return 'Preview';
    }
  }
} 