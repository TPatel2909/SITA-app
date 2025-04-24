import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../auth/services/api.service';

@Component({
  selector: 'app-appworks-test',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ApiService],
  template: `
    <div class="test-container">
      <h2>AppWorks API Test</h2>
      
      <div class="input-group">
        <label for="elementId">Element ID:</label>
        <input type="text" id="elementId" [(ngModel)]="elementId" placeholder="Enter Element ID">
      </div>
      
      <button (click)="testGetTrainingElements()">Get Training Elements</button>
      <button (click)="testGetElementResultItems()">Get Element Result Items</button>
      
      <div *ngIf="loading" class="loading">Loading...</div>
      
      <div *ngIf="error" class="error">
        Error: {{ error }}
      </div>
      
      <div *ngIf="response" class="response">
        <h3>Response:</h3>
        <pre>{{ response | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .input-group {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .loading {
      margin: 20px 0;
      color: #666;
    }
    .error {
      margin: 20px 0;
      padding: 10px;
      background-color: #ffebee;
      color: #c62828;
      border-radius: 4px;
    }
    .response {
      margin: 20px 0;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class AppWorksTestComponent implements OnInit {
  loading = false;
  error: string | null = null;
  response: any = null;
  elementId = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  testGetTrainingElements() {
    this.loading = true;
    this.error = null;
    this.response = null;

    this.apiService.getTrainingElements().subscribe({
      next: (response) => {
        this.loading = false;
        this.response = response;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message;
      }
    });
  }

  testGetElementResultItems() {
    if (!this.elementId) {
      this.error = 'Please enter an Element ID';
      return;
    }

    this.loading = true;
    this.error = null;
    this.response = null;

    this.apiService.getElementResultItems(this.elementId).subscribe({
      next: (response) => {
        this.loading = false;
        this.response = response;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message;
      }
    });
  }
} 