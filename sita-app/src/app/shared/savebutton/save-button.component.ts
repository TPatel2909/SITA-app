import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="save-button" (click)="saveForm()">
      <i class="material-icons">save</i>
    </button>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    
    .save-button {
      position: fixed;
      top: 200px; /* Positioned below the print button */
      right: 30px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color, #04AC64);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-dark, #134a82);
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .material-icons {
        font-size: 24px;
      }
    }

    @media print {
      .save-button {
        display: none;
      }
    }
  `]
})
export class SaveButtonComponent {
  @Output() saveClicked = new EventEmitter<void>();

  saveForm() {
    this.saveClicked.emit();
  }
} 