import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {
  @Input() menu!: { title: string, elementos: string, precio: number, date: string };
}