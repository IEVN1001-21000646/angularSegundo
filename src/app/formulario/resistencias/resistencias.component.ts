import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Resistencia {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: number;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: ``
})
export default class ResistenciasComponent implements OnInit {

  formGroup!: FormGroup;
  resistencias: Resistencia[] = [];
  colores = [
    { nombre: 'Negro', valor: 0 },
    { nombre: 'Café', valor: 1 },
    { nombre: 'Rojo', valor: 2 },
    { nombre: 'Naranja', valor: 3 },
    { nombre: 'Amarillo', valor: 4 },
    { nombre: 'Verde', valor: 5 },
    { nombre: 'Azul', valor: 6 },
    { nombre: 'Morado', valor: 7 },
    { nombre: 'Gris', valor: 8 },
    { nombre: 'Blanco', valor: 9 }
  ];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    
  }

  initForm(): FormGroup {
    return this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: ['']
    });
  }

  // Solo calcula los valores cuando sea necesario mostrarlos, no los almacena.
  calcularValorResistencia(resistencia: Resistencia): { valor: number, valorMaximo: number, valorMinimo: number } {
    const { color1, color2, color3, tolerancia } = resistencia;
    const valor = parseInt(color1 + color2) * Math.pow (10,  parseInt(color3));
    const valorMaximo = valor + (valor * (tolerancia / 100));
    const valorMinimo = valor - (valor * (tolerancia / 100));

    return { valor, valorMaximo, valorMinimo };
  }

  onSubmit(): void {
    const { color1, color2, color3, tolerancia } = this.formGroup.value;

  const resistencia: Resistencia = {
    color1,
    color2,
    color3,
    tolerancia
  };

  const resistenciasGuardadas = localStorage.getItem('resistencias');
  
  if (resistenciasGuardadas) {

    this.resistencias = JSON.parse(resistenciasGuardadas);
  }
    this.resistencias.push(resistencia);

    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));
  }

  subImprime(): void {
    const resistenciasGuardadas = localStorage.getItem('resistencias');
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
    }
  }

  getColor(color: string): string {
    switch (color) {
      case '0': return 'black';
      case '1': return 'brown';
      case '2': return 'red';
      case '3': return 'orange';
      case '4': return 'yellow';
      case '5': return 'green';
      case '6': return 'blue';
      case '7': return 'violet';
      case '8': return 'gray';
      case '9': return 'white';
      default: return 'white';
    }
  }

  getNombreColor(valor: string): string {
    const color = this.colores.find(c => c.valor.toString() === valor);
    return color ? color.nombre : 'Desconocido';
  }

  getClassTolerancia(tolerancia: number): string {
    return tolerancia === 5 ? 'gold' : 'silver';
  }

}
