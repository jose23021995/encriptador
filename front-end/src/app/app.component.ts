import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptionFormComponent } from "./components/encryption-form/encryption-form.component";

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, EncryptionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){}
}
