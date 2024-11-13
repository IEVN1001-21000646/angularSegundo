import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Pizza {
  size: string;
  ingredients: string[];
  quantity: number;
  subtotal: number;
}

interface Pedido {
  nombreCliente: string;
  direccion: string;
  telefono: string;
  fechaCompra: string;
  pizzas: Pizza[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private pizzas: Pizza[] = [];
  
  private clienteInfo = {
    nombreCliente: '',
    direccion: '',
    telefono: '',
    fechaCompra: ''
  };

  // Subject para gestionar el estado de las pizzas en el detalle
  private pizzasSubject = new BehaviorSubject<Pizza[]>([]);
  pizzas$ = this.pizzasSubject.asObservable();

  constructor() {
    this.cargarPedidos();
  }

  setDatosCliente(nombre: string, direccion: string, telefono: string, fecha: string) {
    this.clienteInfo = { nombreCliente: nombre, direccion: direccion, telefono: telefono, fechaCompra: fecha };
  }

  getDatosCliente() {
    return this.clienteInfo;
  }

  agregarPizza(pizza: Pizza) {
    this.pizzas.push(pizza);
    this.pizzasSubject.next(this.pizzas);
  }

  obtenerPizzas(): Pizza[] {
    return this.pizzas;
  }

  eliminarPizza(pizza: Pizza) {
    this.pizzas = this.pizzas.filter(p => p !== pizza);
    this.pizzasSubject.next(this.pizzas);
  }

  finalizarPedido() {
    const total = this.pizzas.reduce((acc, pizza) => acc + pizza.subtotal, 0);
    const pedido: Pedido = {
      ...this.clienteInfo,
      pizzas: this.pizzas,
      total: total
    };
    this.pedidos.push(pedido);
    this.guardarPedidos();
    this.pizzas = []; // Limpiar pizzas después de finalizar el pedido
    this.pizzasSubject.next(this.pizzas);
  }

  obtenerPedidosPorFecha(fecha: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.fechaCompra === fecha);
  }

  obtenerVentasPorMes(mes: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.fechaCompra.startsWith(mes));
  }

  obtenerVentasTotales(): number {
    return this.pedidos.reduce((total, pedido) => total + pedido.total, 0);
  }

  private guardarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }

  private cargarPedidos() {
    const pedidosGuardados = localStorage.getItem('pedidos');
    if (pedidosGuardados) {
      this.pedidos = JSON.parse(pedidosGuardados);
    }
  }
  
}
