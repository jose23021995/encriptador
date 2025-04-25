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
