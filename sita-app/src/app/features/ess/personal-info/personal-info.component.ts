import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="personal-info-container">
          <div class="section-header">
            <h2>Personal Information</h2>
          </div>

          <div class="info-section">
            <div class="info-group">
              <h3>Basic Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Full Name</label>
                  <input type="text" value="John Doe" readonly>
                </div>
                <div class="info-item">
                  <label>Employee ID</label>
                  <input type="text" value="EMP001" readonly>
                </div>
                <div class="info-item">
                  <label>Department</label>
                  <input type="text" value="Information Technology" readonly>
                </div>
                <div class="info-item">
                  <label>Position</label>
                  <input type="text" value="Senior Developer" readonly>
                </div>
              </div>
            </div>

            <div class="info-group">
              <h3>Contact Details</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Email</label>
                  <input type="email" value="john.doe@sita.co.za">
                </div>
                <div class="info-item">
                  <label>Phone</label>
                  <input type="tel" value="+27 123 456 789">
                </div>
                <div class="info-item">
                  <label>Address</label>
                  <textarea rows="3">123 Main Street, Pretoria, Gauteng</textarea>
                </div>
              </div>
            </div>

            <div class="info-group">
              <h3>Emergency Contact</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Contact Name</label>
                  <input type="text" value="Jane Doe">
                </div>
                <div class="info-item">
                  <label>Relationship</label>
                  <input type="text" value="Spouse">
                </div>
                <div class="info-item">
                  <label>Contact Number</label>
                  <input type="tel" value="+27 987 654 321">
                </div>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn-secondary">Cancel</button>
            <button class="btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #1c5ba3;
      --primary-dark: #134a82;
      --primary-light: rgba(28, 91, 163, 0.1);
      --accent-color: #04ac64;
      --accent-light: rgba(4, 172, 100, 0.1);
      --text-color: #2d3748;
      --text-light: #718096;
      --bg-color: #ffffff;
      --border-color: #e2e8f0;
    }

    .page-container {
      padding: 2rem;
      background-color: #f7fafc;
      min-height: calc(100vh - 64px);
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .personal-info-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .section-header {
      background: var(--primary-color);
      color: white;
      padding: 1.5rem;
      border-bottom: 3px solid var(--accent-color);

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
    }

    .info-section {
      padding: 2rem;
    }

    .info-group {
      margin-bottom: 2rem;

      h3 {
        color: var(--text-color);
        font-size: 1.1rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        color: var(--text-light);
        font-size: 0.875rem;
      }

      input, textarea {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.875rem;
        color: var(--text-color);
        background-color: #f8fafc;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-light);
        }

        &[readonly] {
          background-color: #edf2f7;
          cursor: not-allowed;
        }
      }

      textarea {
        resize: vertical;
        min-height: 80px;
      }
    }

    .action-buttons {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background-color: var(--accent-color);
      color: white;
      border: none;

      &:hover {
        background-color: #039d5a;
      }
    }

    .btn-secondary {
      background-color: #edf2f7;
      color: var(--text-color);
      border: 1px solid var(--border-color);

      &:hover {
        background-color: #e2e8f0;
      }
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .info-section {
        padding: 1rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column-reverse;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class PersonalInfoComponent {} 