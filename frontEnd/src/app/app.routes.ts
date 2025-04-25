import { Routes } from '@angular/router';
// Importa el tipo `Routes` desde el módulo de enrutamiento de Angular.
// `Routes` es un alias para un arreglo de objetos que definen las rutas de tu aplicación.

import { AppComponent } from './app.component'; 
// Importa el componente principal `AppComponent` desde el archivo `app.component.ts`.
// Este es el componente que se renderiza cuando se accede a la ruta por defecto.

export const routes: Routes = [
  { path: '', component: AppComponent } 
  // Define una ruta en el arreglo `routes`.
  // `{ path: '' }` indica que esta ruta es la ruta por defecto de la aplicación (la raíz, `/`).
  // Cuando un usuario accede a la URL base de la aplicación, se renderiza `AppComponent`.
];