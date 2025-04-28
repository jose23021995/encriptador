import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncriptarRequest, EncriptarResponse } from '../model/encriptador.model';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private apiUrl = 'http://localhost:3000/encriptar';

  constructor(private http: HttpClient) {}

  encriptarNombre(nombre: string) {
    // Se crea el payload con el dato a encriptar (nombre)
    const payload: EncriptarRequest = { texto: nombre };
    // Se realiza una solicitud POST utilizando el modelo EncriptarRequest
    return this.http.post<EncriptarResponse>(this.apiUrl, payload);
    // Enviar la petición POST con el cuerpo en formato JSON y recibir la respuesta
  }
}