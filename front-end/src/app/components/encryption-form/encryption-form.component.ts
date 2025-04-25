import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CallStringComponent } from '../../components/call-string/call-string.component';
import { EncryptionService } from '../../services/encryption.service';
import { EncriptarResponse } from '../../model/encriptador.model';
import { ResultadoReconocimiento } from '../../model/voz-config.model'; // importa el modelo
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encryption-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CallStringComponent,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  templateUrl: './encryption-form.component.html',
  styleUrl: './encryption-form.component.css'
})
export class EncryptionFormComponent {
  
  form: FormGroup;
  resultado: string = '';

  constructor(
    private encriptadorService: EncryptionService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      voz: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  
  enviar(): void {
    const rawValue = this.form.get('voz')?.value;
    const voz = (typeof rawValue === 'string') ? rawValue.trim() : '';
    if (!voz) {
      
      Swal.fire('Error', 'Por favor ingresa o reconoce un texto antes de enviar.', 'error');
      return;      
    }
    this.encriptadorService.encriptarNombre(voz).subscribe({
      next: (res: EncriptarResponse) => {
        this.resultado = res.encriptado;
        console.log('Resultado encriptado:', this.resultado);
        Swal.fire('Éxito', this.resultado, 'success');
      },
      error: (err) => {
        console.error('Error al encriptar el nombre:', err);
        Swal.fire('Error', 'No se pudo encriptar el nombre.', 'error');
      }
    });
  }
  
  
  procesarTextoReconocido(texto: ResultadoReconocimiento): void {
    this.form.get('voz')?.setValue(texto.texto || '');
  }
    
}
