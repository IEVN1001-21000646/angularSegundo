import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemapComponent } from './formulario/tem/temap/temap.component';
import { ListMessageComponent } from './formulario/tem/list-message/list-message.component';
import { AddMessageComponent } from './formulario/tem/add-message/add-message.component';
import { CapturaPedidoComponent } from "./formulario/pizzas/captura-pedido/captura-pedido.component";
import { DetallePedidoComponent } from "./formulario/pizzas/detalle-pedido/detalle-pedido.component";
import { VentasDiaComponent } from "./formulario/pizzas/ventas-dia/ventas-dia.component";
import { NavbarComponent } from "./navbar/navbar.component";
// import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
