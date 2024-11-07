import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  userService = inject(UserService);
  message: string = '';

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(){
    if(this.loginForm.value) {
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (response) => {
          this.message = 'Inicio de sesión exitoso';
        },
        error: (error) => {
          this.message = error.error?.msg
        }
      })
    }
    else {
      this.message = 'Por favor, complete todos los campos';
    }
  }
}
