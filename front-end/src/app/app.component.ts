import { Component } from '@angular/core';
import { EncryptionFormComponent } from "./components/encryption-form/encryption-form.component";

@Component({
  selector: 'app-root',
  imports: [EncryptionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){}
  // No se configura aquí, ya tiene componentes hijos.
}
