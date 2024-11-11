import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  userService = inject(UserService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  confirmPassword() {
    return this.signupForm.get('password')?.value === this.signupForm.get('confirmPassword')?.value;
  }

  onSubmit() {
    if (!this.confirmPassword()) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.userService.signup(this.signupForm.value.username, this.signupForm.value.password).subscribe({
      next: (response) => {
      },
      error: (error) => {
      }
    })
  }

}
