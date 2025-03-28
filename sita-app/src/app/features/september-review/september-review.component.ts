import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-september-review',
  templateUrl: './september-review.component.html',
  styleUrls: ['./september-review.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SeptemberReviewComponent {
  // Array for KRAs and GAFs rows
  kras = Array(5).fill(null);
  gafs = Array(5).fill(null);
} 