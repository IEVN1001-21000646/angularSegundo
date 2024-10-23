import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemapComponent } from './formulario/tem/temap/temap.component';
import { ListMessageComponent } from './formulario/tem/list-message/list-message.component';
import { AddMessageComponent } from './formulario/tem/add-message/add-message.component';
// import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemapComponent, ListMessageComponent, AddMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
