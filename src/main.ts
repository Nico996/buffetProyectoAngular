import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClientModule
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proveer el servicio HttpClient
    provideAnimations(),  // Habilitar animaciones
    provideRouter(routes) // Configura el enrutador con las rutas
  ],
}).catch((err) => console.error(err));
