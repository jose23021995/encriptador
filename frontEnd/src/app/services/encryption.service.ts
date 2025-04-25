import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncriptarRequest, EncriptarResponse } from '../../model/encriptador.model';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private apiUrl = 'http://localhost:3000/encriptar';

  constructor(private http: HttpClient) {}

  encriptarNombre(nombre: string) {
    const payload: EncriptarRequest = { texto: nombre };
    return this.http.post<EncriptarResponse>(this.apiUrl, payload);
  }
}