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
  imports: [],
  templateUrl: './call-string.component.html',
  styleUrl: './call-string.component.css'
})
export class CallStringComponent {

}
