import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncriptadorService } from './utilidades/services/encriptador.service';
import { EncryptionFormComponent } from "./components/encryption-form/encryption-form.component"; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EncryptionFormComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){}
}
