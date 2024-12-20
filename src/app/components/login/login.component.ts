import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public dni: number = 0;
  public clave: string = '';

  constructor(private loginService: LoginService) { }

  onSubmit(): void {
    const completeData = {
      dni: this.dni,
      clave: this.clave,
    };
    this.loginService.postAutenticacion(completeData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Inicio de sesión exitoso');
      },
      (error) => {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
      }
    );
  }
}