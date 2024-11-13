import { Component } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captura-pedido',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './captura-pedido.component.html',
  styles: ``
})
export class CapturaPedidoComponent {

  
    nombreCliente = '';
    direccion = '';
    telefono = '';
    fechaCompra = '';
    tamanoPizza = '';
    ingredientes = { jamon: false, pina: false, champinones: false };
    cantidadPizzas = 1;
  
    constructor(private pedidoService: PedidoService) {}
  
    agregarPizza() {
      const ingredientesSeleccionados = Object.keys(this.ingredientes)
        .filter(key => this.ingredientes[key as keyof typeof this.ingredientes])
        .map(key => key.charAt(0).toUpperCase() + key.slice(1));
      
      const subtotal = this.calcularSubtotal();
      const pizza = {
        size: this.tamanoPizza,
        ingredients: ingredientesSeleccionados,
        quantity: this.cantidadPizzas,
        subtotal: subtotal
      };
  
      this.pedidoService.agregarPizza(pizza);
      this.pedidoService.setDatosCliente(this.nombreCliente, this.direccion, this.telefono, this.fechaCompra);
    }
  
    calcularSubtotal(): number {
      const precioBase = this.tamanoPizza === 'Chica' ? 40 : this.tamanoPizza === 'Mediana' ? 80 : 120;
      const ingredientesPrecio = (this.ingredientes.jamon ? 10 : 0) + 
                                 (this.ingredientes.pina ? 10 : 0) + 
                                 (this.ingredientes.champinones ? 10 : 0);
      return (precioBase + ingredientesPrecio) * this.cantidadPizzas;
    }
}
