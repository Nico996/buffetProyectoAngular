import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { ComidaComponent } from './components/comida/comida.component';
import { MenuCreationComponent } from './components/menu-creation/menu-creation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginService } from './Services/login.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, CommonModule, RegisterComponent,
    ComidaComponent, MenuCreationComponent, NavbarComponent,
    FooterComponent, HomeComponent, LoginComponent],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,  // Registra el interceptor
      multi: true,  // Permite tener múltiples interceptores
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buffetProyectoAngular';
  isLoggedIn = false; // Cambia esto dependiendo del estado de sesión
  userType: 'admin' | 'user' = 'user'; // Cambia esto dependiendo del tipo de usuario
}