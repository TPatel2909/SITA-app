import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="print-button" (click)="printPage()">
      <i class="material-icons">print</i>
    </button>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    
    .print-button {
      position: fixed;
      top: 140px; /* Adjusted to be below the navbar */
      right: 30px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color, #1c5ba3);
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
        background: var(--primary-dark, #04AC64);
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .material-icons {
        font-size: 24px;
      }
    }

    @media print {
      .print-button {
        display: none;
      }
    }
  `]
})
export class PrintButtonComponent {
  printPage() {
    window.print();
  }
} 