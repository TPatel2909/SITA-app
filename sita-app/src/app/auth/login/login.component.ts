import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { AppworksDataService } from '../../dashboard/service/appworks-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgOptimizedImage],
  providers: []  // Remove AuthService from providers to use root instance
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appworksService: AppworksDataService
  ) {
    this.loginForm = this.fb.group({
      email: ['testuser@email.com', [Validators.required, Validators.email]],  // Pre-fill test email
      password: ['Password01', [Validators.required, Validators.minLength(6)]]  // Pre-fill test password
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/epmds/dashboard']);
        },
        error: (err) => {
          this.error = err.message || 'Invalid email or password';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.error = 'Please enter valid credentials';
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/auth/signup']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  // Basic fetch with default parameters
loadData() {
  this.appworksService.fetchResultItems().subscribe({
    next: (data) => console.log('Results:', data),
    error: (err) => console.error('Error:', err)
  });
}

// Search with criteria
searchData() {
  const criteria = { 
    // Your search criteria, for example:
    DocumentType: 'Invoice',
    Status: 'Active'
  };
  
  this.appworksService.searchResultItems(criteria, 10, 1).subscribe({
    next: (data) => console.log('Search results:', data),
    error: (err) => console.error('Search error:', err)
  });
}
} 