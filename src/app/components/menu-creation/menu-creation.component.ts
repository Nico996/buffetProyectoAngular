import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidaService } from '../../Services/comida.service';
import { MenuService } from '../../Services/menu.service';
import { CommonModule } from '@angular/common';  // Necesario para *ngFor
import { ReactiveFormsModule } from '@angular/forms';  // Para formularios reactivos

@Component({
  selector: 'app-menu-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.css']
})
export class MenuCreationComponent implements OnInit {
  menuForm!: FormGroup;  // Definición de formulario reactivo
  comidas: any[] = [];  // Lista de comidas obtenidas del servicio
  listadoComida: any[] = [];
  diasSemana: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  totalPrecio: number = 0;  // Total que se calcula a medida que se seleccionan comidas

  constructor(private fb: FormBuilder, private comidaService: ComidaService, private menuService: MenuService) { }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.menuForm = this.fb.group({
      tipo: [null, Validators.required],  // Incluye `Validators.required`
      entrada: [null],
      platoPrincipal: [null, Validators.required],
      postre: [null],
      bebida: [null],
      dia: [null, Validators.required]
    });


    // Obtener las comidas desde el servicio
    this.comidaService.obtenerComidas().subscribe(comidas => {
      this.comidas = comidas;
      this.listadoComida = comidas;
    });

    // Detectar cambios en el formulario para actualizar el precio total
    this.menuForm.valueChanges.subscribe(() => {
      this.actualizarComidasSeleccionadas();  // Actualiza la lista de comidas seleccionadas
      this.actualizarTotal();  // Actualiza el precio total
    });
  }

  // Actualizar el precio total
  actualizarTotal() {
    this.totalPrecio = 0;
    ['entrada', 'platoPrincipal', 'postre', 'bebida'].forEach(control => {
      const comidaId = this.menuForm.get(control)?.value;
      if (comidaId) {
        const comida = this.comidas[comidaId - 1]
        if (comida) {
          this.totalPrecio += comida.precio;
        }
      }
    });

  }

  // Eliminar las comidas seleccionadas de la lista
  actualizarComidasSeleccionadas() {
    const seleccionados = [
      this.menuForm.get('entrada')?.value,
      this.menuForm.get('platoPrincipal')?.value,
      this.menuForm.get('postre')?.value,
      this.menuForm.get('bebida')?.value
    ].filter(value => value !== null);

    this.listadoComida = this.comidas.filter(comida => !seleccionados.includes(comida.id));
  }

  onSubmit() {
    if (this.menuForm.valid) {
      const menuDTO = {
        tipo: this.menuForm.get('tipo')?.value,
        precio: this.totalPrecio,
        comidas: [
          this.menuForm.get('entrada')?.value,
          this.menuForm.get('platoPrincipal')?.value,
          this.menuForm.get('postre')?.value,
          this.menuForm.get('bebida')?.value
        ].filter(value => value !== null), // Excluir valores null
        dias: this.menuForm.get('dia')?.value
      };

      this.menuService.crearMenu(menuDTO).subscribe({
        next: () => alert('Menú creado con éxito'),
        error: (err) => console.error('Error al crear el menú:', err),
      });
    }
  }
}