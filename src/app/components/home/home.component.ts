import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menus = [
    { title: "Menú del día", elementos: "Elementos del menú(comidas)", precio: 2000, date: '20/12/2024' },
    { title: "Menú del día - Opción Vegana", elementos: "Elementos del menú(comidas)", precio: 2000, date: '20/12/2024' }
  ];
}
