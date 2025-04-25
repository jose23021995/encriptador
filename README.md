# 🏦 Prueba Técnica - Banco Azteca

## 🎯 Objetivo del Proyecto

El propósito de este proyecto es desarrollar una aplicación web que permita a los usuarios dictar su nombre mediante reconocimiento de voz, encriptarlo con el algoritmo RSA, y visualizar el texto encriptado en la interfaz.
* Frontend: Angular 19 (Angular Universal)
* Backend: Node.js + Express
## 🛠️ Tecnologías Utilizadas
### Frontend
* Angular CLI: 19.0.6

### Backend
* Node.js: v20.16.0

* Express.js

* Body-Parser

* CORS

* Crypto (nativo de Node.js)

## 🚀 Configuración del Backend
Para el back end se ocupara en node.js, express
###  Inicialización del Proyecto
```
$ npm init -y
```
Esto generará el archivo package.json básico.

### Se mostrara el siguiente resultado
```
Wrote to A:\proyectos\angular\examenTecnicoNach\encriptador\back-end\package.json:

{
  "name": "back-end",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

### Instalación de Dependencias
```
npm install express body-parser cors
```

### Generar claves RSA
```
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
Esto crea dos archivos:

* private.pem: clave privada
* public.pem: clave pública (utilizada para la encriptación)
###  Crear el archivo index.js
```
const express = require('express');
// Importa el framework Express para crear el servidor web.
const bodyParser = require('body-parser');
// Importa body-parser, que permite interpretar el cuerpo de las solicitudes en formato JSON.
const fs = require('fs');
// Importa el módulo de sistema de archivos (File System) para leer archivos del disco.
const crypto = require('crypto');
// Importa el módulo de criptografía de Node.js, que se usa para encriptar datos.
const cors = require('cors'); // Importa el paquete cors
// Importa el middleware CORS para permitir solicitudes entre diferentes dominios (por ejemplo, del frontend Angular al backend Express).
const app = express();
// Crea una instancia de la aplicación Express.
// app.use(cors()); 
// Esta línea permitiría CORS desde cualquier origen. Está comentada.
// Habilita CORS pero solo para solicitudes desde 'http://localhost:4200' (donde corre Angular por defecto)
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
// Usa body-parser para poder recibir datos JSON en el cuerpo de las solicitudes POST.
// Carga la llave pública desde el archivo 'public.pem' y la guarda como string en la variable publicKey

const publicKey = fs.readFileSync('public.pem', 'utf8');
// Define una ruta POST en /encriptar

app.post('/encriptar', (req, res) => {
  const texto = req.body.texto;
  // Extrae el campo 'texto' del cuerpo de la solicitud.

  if (!texto) {
    // Si no se recibió 'texto', devuelve un error 400 con un mensaje.
    return res.status(400).json({ error: 'Falta el campo "texto".' });
  }

  const buffer = Buffer.from(texto, 'utf-8');
  // Convierte el texto recibido a un buffer (formato requerido para la encriptación).

  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,// Usa la llave pública cargada.
      padding: crypto.constants.RSA_PKCS1_PADDING,// Define el tipo de relleno RSA.
    },
    buffer // Aplica la encriptación sobre el buffer.
  );

  const resultado = encrypted.toString('base64');
  // Convierte el resultado encriptado a una cadena en formato base64.
  res.json({ encriptado: resultado });
  // Devuelve el texto encriptado en la respuesta como un JSON.
});

app.listen(3000, () => {
   // Inicia el servidor en el puerto 3000.
  console.log('Servidor Express escuchando en http://localhost:3000');
});
```

### 📁 Estructura del Proyecto
```
encriptador-backend/
│
├── node_modules/
├── package.json
├── package-lock.json
├── index.js
├── private.pem
└── public.pem

```

### 🧪 Ejecución del Servidor
```
node index.js
```

### Deberías ver en consola:
```
Servidor Express escuchando en http://localhost:3000
```

### 📬 Prueba del Endpoint /encriptar

Puedes usar Postman para probar la funcionalidad:

1. Método: POST
2. URL: http://localhost:3000/encriptar
3. Body (formato JSON):
```
{
  "texto": "José Armando Moreno Tolentino"
}
```
5. Respuesta esperada:
```
{
  "encriptado": "euzAEtBSZq+II2YhT5+oxB17Mj0Qhr1uPDlsM3njHe2pZf1foUW2XPAmNko7m4kaz..."
}
```

## generar front end 
```
ng new frontEnd
```

### Instalamos todos los paquetes externos 
```
npm i -D
@angular-devkit/build-angular@^19.0.6
@angular/cli@^19.2.9
@angular/compiler-cli@^19.0.0
@types/jasmine@~5.1.0
jasmine-core@~5.4.0
karma@~6.4.0
karma-chrome-launcher@~3.2.0
karma-coverage@~2.2.0
karma-jasmine@~5.1.0
karma-jasmine-html-reporter@~2.1.0
typescript@~5.6.2
```
### genberacion de plantilla y estilos a nivel src\app
```
src\
└── app\
└── index.html                     # Archivo HTML principal (donde se carga la aplicación)
└── styles.css                     # Estilos globales de la aplicación
```
1. index.html
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Ejercicio de encriptación</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="Banco_Azteca_Logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>
```
3. styles.css
```
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; background: #1c1c1c; color:#bababa}
.mat-typography,.container{
    display: flex;
    justify-content: center;
    flex-direction: row;
}
```
### Generar carpetas dentro del proyecto "src\app"
1. src\app\model
2. src\app\components
3. src\app\services
```
/frontEnd
└── src
    └── app
        ├── app.component.css
        ├── app.component.html
        ├── app.component.spec.ts
        ├── app.component.ts
        ├── app.config.ts
        ├── app.routes.ts
        ├── components/
        ├── services/
        └── model/
```
### Creamos los modelos del proyecto
```
frontEnd\
└── src\
    └── app\
        ├── app.component.css
        ├── app.component.html
        ├── app.component.spec.ts
        ├── app.component.ts
        ├── app.config.ts
        ├── app.routes.ts
        ├── components\
        ├── services\
        └── model\
            ├── encriptador.model.ts
            └── voz-config.model.ts

```
#### encriptador.model.ts
```
export interface EncriptarRequest {
    texto: string;
  }
  
  export interface EncriptarResponse {
    encriptado: string;
  }
```
#### voz-config.model.ts
```
export interface VozConfig {
    pregunta: string;
    textbox: string;
    length: number;
  }
  
export interface ResultadoReconocimiento {
    texto: string;
    fecha: Date;
    idioma: string;
  }
```
## configuracion de app.config.ts
```
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// Importa:
// - `ApplicationConfig`: interfaz para la configuración global de la app.
// - `importProvidersFrom`: permite importar módulos como proveedores.
// - `provideZoneChangeDetection`: configura cómo Angular detecta los cambios en la zona de ejecución.

import { provideRouter } from '@angular/router';
// Importa `provideRouter`, que configura el enrutador usando las rutas definidas.

import { routes } from './app.routes';
// Importa el arreglo de rutas de tu aplicación desde el archivo `app.routes.ts`.

import { provideHttpClient, withFetch } from '@angular/common/http';
// Importa:
// - `provideHttpClient`: registra el cliente HTTP como proveedor.
// - `withFetch()`: configura que el `HttpClient` utilice `fetch` en lugar de `XMLHttpRequest`.

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// Importa el módulo para usar SweetAlert2 con Angular.

import { ReactiveFormsModule } from '@angular/forms';
// Importa el módulo para usar formularios reactivos (Reactive Forms).

// Define la configuración de la aplicación como un objeto de tipo `ApplicationConfig`.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Habilita la detección de cambios en Angular y agrupa múltiples eventos para optimizar el rendimiento.

    provideRouter(routes),
    // Configura el sistema de rutas de Angular usando el arreglo `routes`.

    provideHttpClient(withFetch()),
    // Provee el cliente HTTP con soporte para `fetch` en vez de `XMLHttpRequest`.

    importProvidersFrom(
      SweetAlert2Module.forRoot(), 
      // Importa el módulo de SweetAlert2 como proveedor global.

      ReactiveFormsModule
      // Importa el módulo de formularios reactivos.
    )
  ]
};
```
## app.routes.ts
```
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
```
## generamos servicios y componentes
```
ng g s services/Encryption --skip-tests
ng g c components/EncryptionForm --skip-tests
ng g c components/CallString --skip-tests
```
## Estructura de componentes y servicios
```
src\
└── app\
    ├── components\                  # Carpeta que contiene los componentes
    │   ├── encryption-form\         # Componente EncryptionForm
    │   │   ├── encryption-form.component.ts
    │   │   ├── encryption-form.component.html
    │   │   ├── encryption-form.component.css
    │   │   └── encryption-form.component.spec.ts  (archivo de pruebas, pero será omitido con --skip-tests)
    │   └── call-string\              # Componente CallString
    │       ├── call-string.component.ts
    │       ├── call-string.component.html
    │       ├── call-string.component.css
    │       └── call-string.component.spec.ts  (archivo de pruebas omitido)
    ├── services\                     # Carpeta que contiene los servicios
    │   └── encryption.service.ts     # Servicio Encryption
```

### Estructura de todos los archivos que se ocuparan:
```
src\
└── app\
    ├── components\
    │   ├── encryption-form\
    │   │   ├── encryption-form.component.ts
    │   │   ├── encryption-form.component.html
    │   │   ├── encryption-form.component.css
    │   └── call-string\
    │       ├── call-string.component.ts
    │       ├── call-string.component.html
    │       ├── call-string.component.css
    ├── services\
    │   └── encryption.service.ts
    ├── model\
    │   ├── encriptador.model.ts
    │   └── voz-config.model.ts
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app.config.ts
    ├── app.routing.ts
└── styles.css
└── index.html
```
### se desarrollo desde la capa superficial, hasta la capa raiz
#### Configuracion de los servicios
```
src\
└── app\
    ├── services\
    │   └── encryption.service.ts
```
##### Codigo encryption.service.ts
```
import { HttpClient } from '@angular/common/http';  // Importa la clase HttpClient de Angular para hacer solicitudes HTTP.
import { Injectable } from '@angular/core';  // Importa el decorador Injectable, que se utiliza para hacer que el servicio sea inyectable.
import { EncriptarRequest, EncriptarResponse } from '../../model/encriptador.model';  // Importa los modelos EncriptarRequest y EncriptarResponse definidos en la carpeta 'model'.

@Injectable({
  providedIn: 'root'  // Este decorador hace que el servicio esté disponible en toda la aplicación (incluso en el módulo raíz).
})
export class EncriptadorService {  // Define la clase 'EncriptadorService', que maneja la lógica de encriptación.
  private apiUrl = 'http://localhost:3000/encriptar';  // Define la URL base para hacer la solicitud de encriptación al backend.

  constructor(private http: HttpClient) {}  // El constructor inyecta HttpClient en el servicio, permitiendo realizar solicitudes HTTP.

  encriptarNombre(nombre: string) {  // Método para encriptar el nombre recibido como parámetro.
    const payload: EncriptarRequest = { texto: nombre };  // Se crea un objeto 'payload' con la estructura de EncriptarRequest, con el nombre como texto.
    return this.http.post<EncriptarResponse>(this.apiUrl, payload);  // Realiza una solicitud HTTP POST al backend con el 'payload', esperando una respuesta de tipo EncriptarResponse.
  }
}
```
#### Configuracion de los component`s`
##### Codigo call-string
```
src\
└── app\
    ├── components\
    │   └── call-string\
    │       ├── call-string.component.ts
    │       ├── call-string.component.html
    │       ├── call-string.component.css
```
###### call-string.component.ts
```
// Importación de módulos y decoradores necesarios desde Angular y otros paquetes
import { Component, NgZone, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo común que incluye directivas como *ngIf, *ngFor, etc.
import { FormsModule } from '@angular/forms'; // Módulo necesario para usar [(ngModel)] y otras funcionalidades de formularios.
import { MatIconModule } from '@angular/material/icon'; // Módulo de Angular Material para usar iconos.
import { MatTooltipModule } from '@angular/material/tooltip'; // Módulo de tooltips de Angular Material.
import { MatFormFieldModule } from '@angular/material/form-field'; // Módulo para usar campos de formularios con estilo Material.
import { MatInputModule } from '@angular/material/input'; // Módulo de entradas de texto con estilo Material.
import { VozConfig, ResultadoReconocimiento } from '../../model/voz-config.model'; // Importa interfaces definidas en el modelo.

@Component({
  selector: 'app-call-string', // Selector que identifica al componente en los templates HTML.
  standalone: true, // Permite que este componente funcione de forma independiente sin necesidad de un módulo Angular.
  imports: [ // Importación de los módulos necesarios para este componente.
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './call-string.component.html', // Ruta al archivo de template HTML asociado al componente.
  styleUrl: './call-string.component.css' // Ruta al archivo de estilos CSS del componente.
})
export class CallStringComponent implements OnInit { // Clase del componente que implementa la interfaz OnInit.
  @Input() config!: VozConfig; // Recibe un objeto de configuración desde el componente padre.

  @Output() reconocimientoFinalizado = new EventEmitter<ResultadoReconocimiento>(); 
  // Evento que emite el resultado del reconocimiento de voz hacia el componente padre.

  textoReconocido: string = ''; // Texto reconocido por el micrófono.
  escuchando: boolean = false; // Indica si se está escuchando (true) o no (false).

  private reconocimiento: any; // Instancia de reconocimiento de voz (Web Speech API).

  constructor(private zone: NgZone) {} 
  // Se inyecta NgZone para ejecutar actualizaciones de UI dentro del contexto Angular.

  ngOnInit(): void { // Hook de ciclo de vida que se ejecuta al inicializar el componente.
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    // Intenta usar la API de reconocimiento de voz nativa o la versión de WebKit (para compatibilidad con navegadores como Chrome).

    if (!SpeechRecognition) {
      console.error('El navegador no soporta Web Speech API'); // Muestra un error si el navegador no soporta la API.
      return;
    }

    this.reconocimiento = new SpeechRecognition(); // Crea una nueva instancia del reconocimiento de voz.
    this.reconocimiento.lang = 'es-MX'; // Idioma configurado para el reconocimiento de voz.
    this.reconocimiento.continuous = true; // Escucha de forma continua hasta que se detenga manualmente.
    this.reconocimiento.interimResults = true; // Obtiene resultados parciales mientras se está hablando.

    // Evento que se dispara cuando hay un resultado del reconocimiento de voz.
    this.reconocimiento.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript; // Se concatena el texto reconocido.
      }

      // Angular detecta el cambio en la zona y actualiza la UI.
      this.zone.run(() => {
        this.textoReconocido = transcript.slice(0, this.config.length); // Limita el texto al máximo definido en la configuración.
      });
    };

    // Evento que se dispara cuando se detiene el reconocimiento de voz.
    this.reconocimiento.onend = () => {
      this.escuchando = false; // Cambia el estado de escucha a falso.
      this.reconocimientoFinalizado.emit({
        texto: this.textoReconocido.trim(), // Emite el texto reconocido, sin espacios iniciales/finales.
        fecha: new Date(), // Fecha y hora actuales.
        idioma: 'es-MX' // Idioma usado durante el reconocimiento.
      });
    };
  }

  toggleEscucha(): void { // Función que alterna entre iniciar o detener la escucha.
    if (!this.reconocimiento) return; // Si no se inicializó el reconocimiento, sale de la función.

    if (this.escuchando) {
      this.reconocimiento.stop(); // Si ya está escuchando, detiene el reconocimiento.
    } else {
      this.reconocimiento.start(); // Si no está escuchando, lo inicia.
    }
    this.escuchando = !this.escuchando; // Cambia el estado de escucha (true ↔ false).
  }
}
```
##### call-string.component.html
```
<div class="container"> <!-- Contenedor principal con estilos aplicados por la clase 'container' -->

  <!-- Muestra la pregunta configurada dinámicamente desde el componente -->
  <label for="nombre" class="pregunta">{{ config.pregunta }}</label>

  <section class="input-section"> <!-- Agrupa el input y el botón del micrófono -->

    <!-- Campo de entrada estilo Angular Material con fondo lleno -->
    <mat-form-field appearance="fill" class="input-field">

      <!-- Etiqueta que aparece dentro del input (placeholder), viene del modelo VozConfig -->
      <mat-label>{{ config.textbox }}</mat-label>

      <!-- Input deshabilitado que muestra el texto reconocido por voz -->
      <input matInput id="nombre" [value]="textoReconocido" disabled />
    </mat-form-field>

    <!-- Botón con ícono para activar o detener el reconocimiento de voz -->
    <button mat-icon-button
            (click)="toggleEscucha()" <!-- Llama a la función que inicia o detiene el reconocimiento -->
            [class.active]="escuchando" <!-- Aplica la clase 'active' si está escuchando -->
            [attr.aria-label]="escuchando ? 'Detener reconocimiento de voz' : 'Iniciar reconocimiento de voz'" <!-- Accesibilidad: cambia el texto del lector según el estado -->
            matTooltip="{{ escuchando ? 'Detener audio' : 'Habla ahora' }}" <!-- Tooltip que cambia según el estado -->
            class="mic-button"> <!-- Clase para aplicar estilos al botón -->
      
      <!-- Icono que cambia entre micrófono (inactivo) y pausa (activo) -->
      <mat-icon>{{ escuchando ? 'pause' : 'mic' }}</mat-icon>
    </button>
  </section>

  <div class="char-count"> <!-- Muestra el conteo de caracteres reconocidos -->
    <p [ngClass]="{ 
          'completo': textoReconocido.length === config.length, 
          'incompleto': textoReconocido.length < config.length 
        }"> <!-- Cambia de color o estilo según si se alcanzó la longitud máxima -->

      <!-- Muestra la cantidad de caracteres reconocidos vs. la cantidad esperada -->
      {{ textoReconocido.length }}/{{ config.length }} caracteres
    </p>
  </div>
</div>
```
##### call-string.component.css
```
/* Estilo para campos incompletos */
.incompleto {
    color: #bababa !important;
  }
  
  /* Estilo para campos completos */
  .completo {
    color: red;
  }
  
  /* Estilo para etiquetas de Angular Material */
  mat-form-field,
  mat-label,
  mat-icon,
  input[matInput] {
    color: #bababa !important;
  }
  
  /* Input de texto (Angular Material) */
  input[matInput] {
    border-bottom: 1px solid #bababa !important;
  }
  
  /* Botón del micrófono */
  #toggleEscucha {
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  /* Secciones de ancho completo */
  section,
  .char,
  .input-section,
  .container,
  .char-count,
  .char-count p
   {
    width: 100%;
    display: flex;
  }
  section{
    align-items: center;
  }
  
  .char {
    
    justify-content: flex-end;
    font-size: 0.9rem;
  }
  
  .container{
    flex-direction: column;
  }
  
  .input-section,.char-count,.char-count p{
    flex-direction: row;
  }
  
  button{
    background: none;
    border: none;
  
  }
  
  .char-count p{
    justify-content: end;
    padding: 0;
    margin-top: 0;
    margin-bottom: 50px;
  }
```
##### Codigo encryption-form
```
src\
└── app\
    ├── components\
    │   ├── encryption-form\
    │   │   ├── encryption-form.component.ts
    │   │   ├── encryption-form.component.html
    │   │   ├── encryption-form.component.css
```
##### encryption-form.component.ts
```
// Importa el decorador @Component para declarar un componente Angular
import { Component } from '@angular/core';

// Importa funcionalidades comunes necesarias para los componentes
import { CommonModule } from '@angular/common';

// Importa módulos para manejar formularios reactivos y template-driven
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Permite usar enrutamiento dentro del componente (ngIf, ngSwitch, routerLink, etc.)
import { RouterOutlet } from '@angular/router';

// Importa botón y iconos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Importa el módulo de SweetAlert2 para usar mensajes emergentes bonitos
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Componente personalizado para reconocimiento de voz
import { CallStringComponent } from '../../components/call-string/call-string.component';

// Servicio que hace la lógica de encriptación (backend)
import { EncryptionService } from '../../services/encryption.service';

// Funciones para configurar el cliente HTTP en Angular (no se usan aquí directamente)
import { provideHttpClient, withFetch } from '@angular/common/http';

// Modelo que representa la respuesta del backend al encriptar
import { EncriptarResponse } from '../../model/encriptador.model';

// Modelo que representa el resultado del reconocimiento de voz
import { ResultadoReconocimiento } from '../../model/voz-config.model';

// Librería para mostrar mensajes (alertas) emergentes
import Swal from 'sweetalert2';

// Decorador para declarar el componente
@Component({
  selector: 'app-encryption-form', // Nombre de la etiqueta HTML del componente
  imports: [ // Módulos importados necesarios en el template
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    CallStringComponent, // componente hijo que se usará en el HTML
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  templateUrl: './encryption-form.component.html', // HTML asociado al componente
  styleUrl: './encryption-form.component.css'      // CSS del componente
})
export class EncryptionFormComponent {
  // Define el formulario reactivo con un grupo de controles
  form: FormGroup;

  // Variable para guardar el texto encriptado del backend
  resultado: string = '';

  // Constructor del componente, inyecta el servicio de encriptación y el formBuilder
  constructor(
    private encriptadorService: EncryptionService, // Servicio que llama al backend
    private fb: FormBuilder // Utilidad para crear formularios
  ) {
    // Crea el formulario con un campo "voz", que es requerido y de al menos 1 carácter
    this.form = this.fb.group({
      voz: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  // Método que se llama al hacer clic en "enviar"
  enviar(): void {
    const voz = this.form.get('voz')?.value.trim(); // Obtiene el valor del campo y le quita espacios

    if (!voz) { // Valida que haya texto
      Swal.fire('Error', 'Por favor ingresa o reconoce un texto antes de enviar.', 'error'); // Muestra error
      return;
    }

    // Llama al servicio para encriptar el nombre
    this.encriptadorService.encriptarNombre(voz).subscribe({
      next: (res: EncriptarResponse) => { // Si la respuesta es exitosa
        this.resultado = res.encriptado; // Guarda el texto encriptado
        console.log('Resultado encriptado:', this.resultado); // Muestra en consola
        Swal.fire('Éxito', this.resultado, 'success'); // Muestra alerta de éxito
      },
      error: (err) => { // Si ocurre un error en la petición
        console.error('Error al encriptar el nombre:', err); // Muestra error en consola
        Swal.fire('Error', 'No se pudo encriptar el nombre.', 'error'); // Muestra alerta de error
      }
    });
  }

  // Método que se llama cuando se recibe texto desde el componente de voz
  procesarTextoReconocido(texto: ResultadoReconocimiento): void {
    this.form.get('voz')?.setValue(texto); // Establece el texto reconocido en el campo del formulario
  }
}
```
##### encryption-form.component.html
```
<!-- Formulario con clase 'mic-container' y asociado al formulario reactivo 'form' definido en el TypeScript -->
<form class="mic-container" [formGroup]="form">

  <!-- Componente personalizado para capturar texto por voz o manualmente -->
  <app-call-string
    [config]="{                                <!-- Se le pasa una configuración como input -->
      length: 15,                              <!-- Longitud máxima esperada del texto -->
      pregunta: '¿Cómo prefiere que te llamemos?',  <!-- Pregunta que se muestra sobre el campo -->
      textbox: 'Escribe tu nombre'             <!-- Etiqueta del campo de entrada -->
    }"
    (reconocimientoFinalizado)="procesarTextoReconocido($event)"> <!-- Evento personalizado que emite el texto reconocido -->
  </app-call-string>

  <!-- Botón para enviar el formulario, de tipo "button" para que no haga submit automático -->
  <button
    type="button"
    (click)="enviar()"            <!-- Llama al método enviar() al hacer clic -->
    [disabled]="form.invalid"     <!-- Desactiva el botón si el formulario no es válido -->
    mat-button>                   <!-- Usa estilo de botón de Angular Material -->
    Comenzar                      <!-- Texto del botón -->
  </button>
</form>
```
##### encryption-form.component.css
```
button{
    background: #bababa;
    width: 100%;
}
.mat-mdc-button:not(:disabled) {
    background: green;
    border: none;
    color: aliceblue;
}
```
