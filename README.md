```markdown
# Aplicación de Gestión de Tareas

Esta es una aplicación de gestión de tareas construida con **React** y **Firebase**, que permite a los usuarios autenticar su sesión con Google y gestionar sus tareas de forma eficiente. Está desplegada en Netlify para un acceso sencillo.

## Enlace de Producción

[https://comforting-kringle-835b51.netlify.app/](https://comforting-kringle-835b51.netlify.app/)

## Funcionalidades Principales

- **Autenticación con Google**: Utiliza Firebase Authentication para un inicio de sesión seguro.
- **Rutas protegidas**: Solo los usuarios autenticados pueden acceder a páginas como el Dashboard o la vista de tareas.
- **Gestión de tareas**: Los usuarios pueden ver y gestionar sus tareas personales.

## Estructura del Proyecto

- `src/components`: Componentes reutilizables como rutas protegidas.
- `src/pages`: Vistas principales como Home, Dashboard y VerTask.
- `src/context/AuthContext.js`: Contexto para manejar la autenticación del usuario con Firebase.
- `src/firebase/firebaseConfig.js`: Configuración de Firebase para la autenticación y el almacenamiento de datos.

## Cómo Funciona la Protección de Rutas

- **ProtectedRoute**: Un componente que verifica si el usuario está autenticado antes de permitirle acceder a ciertas páginas. Si no está autenticado, es redirigido a la página de inicio.

## Instalación Local

1. Clona este repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura Firebase en el archivo `src/firebase/firebaseConfig.js`.
4. Inicia el servidor local:
   ```bash
   npm start
   ```
5. Abre el navegador en [http://localhost:3000](http://localhost:3000).

## Configuración de Producción

- Asegúrate de agregar tu dominio de Netlify como un dominio autorizado en Firebase Console.
- Despliega la aplicación en Netlify utilizando la carpeta `dist` generada.

## Créditos

Este proyecto fue desarrollado utilizando tecnologías modernas como **React**, **Firebase** y **Netlify**. ¡Espero que lo encuentres útil para gestionar tus tareas!

Creado por: Geraldhy Messú

```