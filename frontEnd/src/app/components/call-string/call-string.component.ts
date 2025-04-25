import { Component, NgZone, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VozConfig, ResultadoReconocimiento} from '../../model/voz-config.model';

@Component({
  selector: 'app-call-string',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './call-string.component.html',
  styleUrl: './call-string.component.css'
})
export class CallStringComponent implements OnInit{
  @Input() config!: VozConfig;

  @Output() reconocimientoFinalizado = new EventEmitter<ResultadoReconocimiento>();

  textoReconocido: string = '';
  escuchando: boolean = false;

  private reconocimiento: any;

  constructor(private zone: NgZone) {}
  ngOnInit(): void {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('El navegador no soporta Web Speech API');
      return;
    }

    this.reconocimiento = new SpeechRecognition();
    this.reconocimiento.lang = 'es-MX';
    this.reconocimiento.continuous = true;
    this.reconocimiento.interimResults = true;

    this.reconocimiento.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }

      this.zone.run(() => {
        this.textoReconocido = transcript.slice(0, this.config.length);
      });
    };

    this.reconocimiento.onend = () => {
      this.escuchando = false;
      this.reconocimientoFinalizado.emit({
        texto: this.textoReconocido.trim(),
        fecha: new Date(),
        idioma: 'es-MX'
      });
    };
  }

  toggleEscucha(): void {
    if (!this.reconocimiento) return;

    if (this.escuchando) {
      this.reconocimiento.stop();
    } else {
      this.reconocimiento.start();
    }
    this.escuchando = !this.escuchando;
  }
}
