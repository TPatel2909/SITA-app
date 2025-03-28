import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: Date;
  endDate: Date;
  progress: number;
  tasksCount: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="projects-container">
      <h1>Projects</h1>
      
      <div class="projects-header">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search projects..."
            class="search-input"
          >
        </div>
        <button class="add-project-btn">New Project</button>
      </div>

      <div class="projects-list">
        <div *ngFor="let project of filteredProjects" class="project-card">
          <div class="project-header">
            <h3>{{ project.name }}</h3>
            <span [class]="'status-badge ' + project.status">
              {{ project.status }}
            </span>
          </div>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                [style.width.%]="project.progress"
              ></div>
            </div>
            <span class="progress-text">{{ project.progress }}% Complete</span>
          </div>

          <div class="project-details">
            <div class="detail-item">
              <span class="label">Start Date:</span>
              <span class="value">{{ project.startDate | date }}</span>
            </div>
            <div class="detail-item">
              <span class="label">End Date:</span>
              <span class="value">{{ project.endDate | date }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Tasks:</span>
              <span class="value">{{ project.tasksCount }}</span>
            </div>
          </div>

          <div class="project-actions">
            <button class="action-btn view">View Details</button>
            <button class="action-btn edit">Edit</button>
            <button class="action-btn delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 1rem;
    }

    .projects-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
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

    .add-project-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }

    .projects-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      text-transform: capitalize;

      &.active {
        background-color: #d4edda;
        color: #155724;
      }

      &.completed {
        background-color: #cce5ff;
        color: #004085;
      }

      &.on-hold {
        background-color: #fff3cd;
        color: #856404;
      }
    }

    .project-description {
      color: #666;
      margin: 0.5rem 0;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .project-progress {
      margin: 1rem 0;
    }

    .progress-bar {
      height: 8px;
      background-color: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill {
      height: 100%;
      background-color: #28a745;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.8rem;
      color: #666;
    }

    .project-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1rem 0;
      padding: 1rem 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .label {
        font-size: 0.8rem;
        color: #666;
      }

      .value {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .project-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
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

      &.edit {
        background-color: #e9ecef;
        color: #495057;

        &:hover {
          background-color: #dee2e6;
        }
      }

      &.delete {
        background-color: #f8d7da;
        color: #721c24;

        &:hover {
          background-color: #f5c6cb;
        }
      }
    }
  `]
})
export class ProjectsComponent {
  searchQuery = '';
  projects: Project[] = [
    {
      id: 1,
      name: 'SITA Application Development',
      description: 'Development of the SITA application with modern Angular features',
      status: 'active',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-30'),
      progress: 45,
      tasksCount: 12
    },
    {
      id: 2,
      name: 'User Interface Redesign',
      description: 'Redesigning the user interface for better user experience',
      status: 'on-hold',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-05-15'),
      progress: 20,
      tasksCount: 8
    },
    {
      id: 3,
      name: 'Performance Optimization',
      description: 'Optimizing application performance and load times',
      status: 'completed',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      progress: 100,
      tasksCount: 5
    }
  ];

  get filteredProjects(): Project[] {
    if (!this.searchQuery) return this.projects;
    
    const query = this.searchQuery.toLowerCase();
    return this.projects.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  }
} 