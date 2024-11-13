import { Component } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detalle-pedido.component.html',
  styles: ``
})
export class DetallePedidoComponent {

  pizzas: any[] = [];
  totalPedido = 0

  constructor(public pedidoService: PedidoService) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener las pizzas
    this.pedidoService.pizzas$.subscribe(pizzas => {
      this.pizzas = pizzas;  // Almacenar las pizzas en la variable
    });
  }

  quitarPizza(pizza: any) {
    this.pedidoService.eliminarPizza(pizza);
  }

  finalizarPedido() {
    if (window.confirm(`El total del pedido es $${this.totalPedido}. ¿Deseas confirmar el pedido?`)) {
      this.pedidoService.finalizarPedido();
      alert('Pedido guardado con éxito');
    } else {
      alert('Puedes editar tu pedido');
    }
  }

  
}
