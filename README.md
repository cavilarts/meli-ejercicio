# Bienvenido

Esta prueba fue realizada por Carlos Ávila.

## Versión desplegada

Puede ver el proyecto en modo producción aquí: https://meli-ejercicio-h3sf5r06l-cavilarts-projects.vercel.app/

## Diagrama de componentes

![diagrama de componentes](https://i.postimg.cc/KvkV57kW/components-diagram.jpg)

## Check List

| Tipo          | Status |
| ------------- | ------ |
| Unitarias     | ✅     |
| Accesibilidad | ✅     |
| Integracion   | ✅     |
| Build         | ✅     |

## Reporte lighthouse

![reporte lighthouse](https://i.postimg.cc/6pQszkYw/Screenshot-2025-02-13-at-8-03-02-AM.png)

# Viewports soportados

| viewport | soporte |
| -------- | ------- |
| Moviles  | ✅      |
| Tabletas | ✅      |
| Desktop  | ✅      |

## Tech Stack

- Next.js – Para la interfaz de usuario con React y API routes.
- Tailwind CSS – Para estilos.
- Redux Toolkit (RTK) – Para la gestión de estado en los componentes cliente.
- Vitest – Para pruebas unitarias.
- Playwright – Para pruebas de integración.
- Husky - Para correr rutinas pre-commit
- Github Actions - para asegurarnos que todo este bien en produccion

## Instalación

Se recomienda usar la versión LTS de Node.js o una versión igual o superior a `22.13.1`.

- Clonar el repositorio:

```sh
git clone https://github.com/cavilarts/meli-ejercicio
cd meli-ejercicio
```

- Instalar dependencias

```sh
npm i
```

- Crear el archivo de configuración `.env` en la carpeta root del proyecto

```sh
MELI_ITEMS_SEARCH_URL=AQUI VA LA URL DE SEARCH DE MELI
MELI_ITEM_DETAILS= QUI VA LA URL DE ITEM DE MELI
MELI_ITEM_CATEGORIES=QUI VA LA URL DE CATEGORIA DE MELI
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Modo desarrollo

Para ejecutar el proyecto en modo desarrollo, usa el siguiente comando:

```sh
npm run dev
```

## Modo producción

Para compilar y ejecutar en producción:

```sh
npm run build
npm start
```

## Pruebas

### Pruebas unitarias

Para ejecutar las pruebas una sola vez:

```sh
npm test
npm run test:watch
```

### Pruebas de integración

Para ejecutar las pruebas de integración con Playwright:

```sh
npx playwright test
```
