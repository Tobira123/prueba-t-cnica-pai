# Módulo de Suscripciones (Vue 3 + Vuetify + Pinia)

Interfaz para visualizar y gestionar una suscripción: datos del usuario, plan actual y historial de pagos. Los datos se consumen desde mocks que simulan un backend real.

##  Requisitos

- Node.js 18+
- npm 9+

##  Ejecución

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev
# abre http://localhost:5173

# Build de producción
npm run build

# Previsualizar build
npm run preview

# Ejecutar pruebas unitarias
npm run test

# UI interactiva de Vitest
npm run test:ui

# Cobertura
npm run test:cov
# abre coverage/index.html
```

## Tecnologías utilizadas
```bash
- **Vue 3 (`<script setup>` + Composition API)**  
  Framework principal para la interfaz; favorece componentes declarativos, reactividad simple y tipado opcional.

- **Vuetify 3**  
  Librería UI con componentes accesibles y sistema de temas; acelera el desarrollo y mantiene consistencia visual.

- **Pinia**  
  Manejo de estado centralizado, tipado amigable y devtools; facilita pruebas y escalabilidad.

- **Vite**  
  Empaquetador rápido con HMR y build optimizado; ideal para Vue 3.

- **Vitest + Vue Test Utils**  
  Pruebas unitarias de funciones, stores y componentes; soporte para snapshots y mocks.

- **Intl API (`Intl.NumberFormat`, `Intl.DateTimeFormat`)**  
  Formateo de moneda/fechas localizado (es-MX), sin dependencias externas.

- **Inversión de Dependencias (DI)**  
  Contenedor simple para alternar repositorios (mock ↔︎ HTTP) sin tocar consumidores.

- **Lighthouse**  
  Auditoría de Performance, Accesibilidad, Best Practices y SEO para orientar mejoras.
```

  ## Breve explicación técnica
```bash
- **Arquitectura por capas**
  - **Vistas** (routing con lazy loading) → **Componentes presentacionales** → **Store Pinia** → **Repositorio de datos** → **Mocks JSON**.
- **SOLID**
  - **SRP:** cada componente cumple una función (PlanCard, PaymentItem, UserSummary).
  - **OCP/LSP:** la store depende de una **abstracción** de repositorio; se puede sustituir por HTTP sin tocar consumidores.
  - **DIP:** inyección de dependencias vía `container` para alternar **mock ↔︎ real** y facilitar pruebas.
- **Estado global**
  - Pinia maneja **usuario, plan, pagos, flags de loading/error** y un arreglo de errores globales.
- **Formateo y utilidades**
  - `Intl.NumberFormat` y `Intl.DateTimeFormat` para **moneda y fecha** localizadas (es-MX).
- **Accesibilidad (A11y)**
  - Roles/`aria-label`, `aria-live` en cargas/errores y `scope="col"` en encabezados de tabla.
- **Pruebas**
  - Vitest + Vue Test Utils: pruebas de componentes, store con **repositorio mockeado** y **snapshots**.
```

## Notas de mejora futura
```bash
- **Performance**
  - Servir **Brotli/Gzip** en prod.
  - **Reducir JS/CSS no usado**; minificar y revisar dependencias pesadas (Vuetify, `@mdi/font` → `@mdi/js` o `unplugin-icons`).
  - Mejorar **LCP** (preload del recurso LCP, optimizar imagen/fuente) y evitar **layout shifts**.
  - Añadir **treemap de bundle** (rollup-plugin-visualizer) y presupuestos de tamaño.
- **Accesibilidad**
  - Asegurar **nombres accesibles** en todos los inputs.
  - Corregir jerarquía de **headings** y verificar **contrastes** con tokens del tema.
  - Revisar roles que requieren **hijos con roles específicos**.
- **SEO**
  - Agregar **meta description** y **robots.txt** válido.
  - Títulos únicos por ruta y `lang="es"` en `<html>`.
- **Seguridad**
  - Configurar en despliegue: **CSP**, **HSTS**, **X-Frame-Options / frame-ancestors**, **COOP/COEP** si aplica.
- **Escalabilidad**
  - Separar repos en **User/Subscription/Payment** si el dominio crece.
  - Añadir **caché** y política de revalidación en el repo HTTP.
- **DX / CI**
  - Pipeline de **CI** con lint + test + build + lighthouse-ci.
  - Reportes de cobertura mínimos (por ejemplo, ≥80% en `services` y store).
```