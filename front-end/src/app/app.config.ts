import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Asegúrate de que las rutas estén correctamente importadas
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  //forma de proporcionar dependencias y configuraciones.
  providers: [
    // Proporciona la configuración para la detección de cambios en Angular,
    // activando el 'eventCoalescing', lo cual agrupa múltiples eventos de usuario
    // para reducir la cantidad de ciclos de cambio de detección y mejorar el rendimiento.
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configura el enrutador de la aplicación, utilizando las rutas definidas
    provideRouter(routes), 
    // interceptor que permite realizar solicitudes HTTP utilizando la API Fetch
    provideHttpClient(withFetch()),
    // - 'SweetAlert2Module.forRoot()' configura y proporciona el módulo de SweetAlert2,
    //   que permite mostrar alertas personalizadas con estilo en la UI.
    // - 'ReactiveFormsModule' se importa y se proporciona para habilitar formularios reactivos,
    //   permitiendo una gestión más flexible de formularios complejos.
    importProvidersFrom(SweetAlert2Module.forRoot(), ReactiveFormsModule)
  ]
};