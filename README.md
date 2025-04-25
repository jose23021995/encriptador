# Prueba tecnica para banco azteca
## Objetivo del Proyecto:

El objetivo de este proyecto es construir una aplicación web que permita a los usuarios dictar su nombre mediante un sistema de reconocimiento de voz, encriptarlo utilizando un algoritmo de encriptación RSA, y mostrar la cadena encriptada en la interfaz de usuario. La aplicación se construirá con Angular Universal para el frontend y Node.js con Express para el backend.
## Herramientas ocupadas:
1. Angular 19.0.6
2. Node.js v20.16.0 
3. Express

## Back End
Para el back end se ocupara en node.js, express
### Ejecutamos en consola los siguientes comandos
```
$ npm init -y
```
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

### Instalar dependencias necesarias
```
npm install express body-parser cors
```

### Generar claves RSA
```
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
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
### La estructura de los archivos son los siguientes 
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----     24/04/2025  05:18 p. m.                node_modules
-a----     24/04/2025  05:18 p. m.          29424 package-lock.json
-a----     24/04/2025  05:18 p. m.            322 package.json
-a----     24/04/2025  05:21 p. m.           1732 private.pem
-a----     24/04/2025  05:21 p. m.            460 public.pem
```
### Ejecutar el servidor
```
node index.js

```
### comprobacion de la ejecucion de los servicios:
```
Servidor Express escuchando en http://localhost:3000
```
### para ejecutarlo y obtener un encriptado de prueba se ejecuta en postman de la siguiente forma
1. post -> http://localhost:3000/encriptar
2. body:
```
{
  "texto": "José Armando Moreno Tolentino"
}
```
3. json rspuesta:
```
{
    "encriptado": "euzAEtBSZq+II2YhT5+oxB17Mj0Qhr1uPDlsM3njHe2pZf1foUW2XPAmNko7m4kazCVsssGQVvxs+ysTqOKzxlCVqGkBcB/Ts7QAKYs3A94f5eOs+NJ3jm5SNdVy+LHBa60ilhrbQokoRa4xBSeU+Slx2q+VII7q9GhSAWtvBby3w37a8i3X3fmKr3/CiqJFojcVi4BztiMSIt+px4oHDuJnUSS7OXVDA66jX6N2uH0UI+ZKLU5JLTlQP2AWPBy3iWyQdtTRTK2MulBGsX4wiYIRo+nBAnV/O87ZH8CQn32hkMmhqu0U1rlTWrvy3+r1azKwdGQ3hmApb4u5H2Zlhg=="
}
```
