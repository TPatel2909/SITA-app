import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [AuthService]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: () => {
          this.success = 'Password reset instructions have been sent to your email.';
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error.message || 'An error occurred while processing your request';
          this.loading = false;
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
} 