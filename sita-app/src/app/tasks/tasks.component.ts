import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tasks-container">
      <h1>Tasks</h1>
      
      <div class="tasks-header">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search tasks..."
            class="search-input"
          >
        </div>
        <button class="add-task-btn">Add New Task</button>
      </div>

      <div class="tasks-list">
        <div *ngFor="let task of filteredTasks" class="task-card">
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <span [class]="'status-badge ' + task.status">
              {{ task.status }}
            </span>
          </div>
          <p class="task-description">{{ task.description }}</p>
          <div class="task-footer">
            <span class="due-date">Due: {{ task.dueDate | date }}</span>
            <div class="task-actions">
              <button class="action-btn edit">Edit</button>
              <button class="action-btn delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tasks-container {
      padding: 1rem;
    }

    .tasks-header {
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

    .add-task-btn {
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

    .tasks-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .task-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      h3 {
        margin: 0;
        font-size: 1.1rem;
      }
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      text-transform: capitalize;

      &.pending {
        background-color: #fff3cd;
        color: #856404;
      }

      &.in-progress {
        background-color: #cce5ff;
        color: #004085;
      }

      &.completed {
        background-color: #d4edda;
        color: #155724;
      }
    }

    .task-description {
      color: #666;
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }

    .task-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .due-date {
      color: #666;
      font-size: 0.8rem;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.3s ease;

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
export class TasksComponent {
  searchQuery = '';
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Project Documentation',
      description: 'Write comprehensive documentation for the SITA application',
      status: 'in-progress',
      dueDate: new Date('2024-04-01')
    },
    {
      id: 2,
      title: 'Review Code Changes',
      description: 'Review and approve pending pull requests',
      status: 'pending',
      dueDate: new Date('2024-03-28')
    },
    {
      id: 3,
      title: 'Update Dependencies',
      description: 'Update project dependencies to latest versions',
      status: 'completed',
      dueDate: new Date('2024-03-25')
    }
  ];

  get filteredTasks(): Task[] {
    if (!this.searchQuery) return this.tasks;
    
    const query = this.searchQuery.toLowerCase();
    return this.tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  }
} 