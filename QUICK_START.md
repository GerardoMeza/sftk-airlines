# 🚀 SFTK Airlines - Quick Start Guide

## Inicio Rápido (5 minutos)

### Opción 1: Desarrollo Local

#### 1. Instalar y ejecutar
```bash
# Ya está instalado, solo ejecuta:
npm run dev
```

#### 2. Abrir en navegador
```
http://localhost:3001 (o el puerto mostrado)
```

#### 3. ¡Prueba la aplicación!
- Busca vuelos de MEX a MIA
- Selecciona un vuelo
- Completa la información del pasajero
- ¡Recibe tu código de confirmación!

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado
- [x] Búsqueda de vuelos (Search)
- [x] Filtrado por fecha, origen y destino
- [x] Visualización de resultados con información completa
- [x] Selección de vuelo
- [x] Resumen detallado del vuelo
- [x] Formulario de información del pasajero
- [x] Validación de campos (Zod)
- [x] Generación de código de confirmación
- [x] Pantalla de confirmación
- [x] Página de "Mis Reservas"
- [x] Almacenamiento temporal (sessionStorage)
- [x] Diseño responsivo
- [x] Colores corporativos (Delta Airlines inspired)
- [x] API Routes para búsqueda y booking
- [x] Prisma ORM configurado
- [x] TypeScript en todo el proyecto

### 🔜 Próximas Fases
- [ ] NextAuth.js para autenticación
- [ ] Base de datos real (PostgreSQL)
- [ ] Persistencia de datos (Base de datos)
- [ ] Email confirmations
- [ ] Modificación de reservas
- [ ] Cancelación de reservas
- [ ] Sistema de pagos (Stripe)
- [ ] Admin dashboard

---

## 🧪 Datos de Prueba

### Vuelos Disponibles (Mock)
```
Origen: MEX (México)
Destino: MIA (Miami)
Fecha: Mañana (automático)

Vuelos:
1. SFTK001 - 10:00 AM - 2:00 PM (0 escalas) - $320
2. SFTK015 - 12:00 PM - 4:00 PM (0 escalas) - $380
3. SFTK028 - 2:00 PM - 6:00 PM (1 escala) - $280
4. SFTK042 - Día siguiente - $350
```

### Información de Prueba para Pasajero
```
Nombre: Juan
Apellido: Pérez
Email: juan@ejemplo.com
Teléfono: +52 5555555555
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor local

# Build
npm run build           # Crea versión producción
npm start              # Inicia servidor producción

# Validación
npm run lint           # Ejecuta ESLint
npx tsc --noEmit       # Type checking

# Base de datos
npx prisma studio     # Abre Prisma Studio
npx prisma migrate dev # Crea migraciones

# Limpiar
rm -rf .next node_modules
npm install
```

---

## 📁 Archivos Importantes

```
Configuración:
- .env.local              # Variables de entorno
- tsconfig.json           # Configuración TypeScript
- next.config.ts          # Configuración Next.js
- package.json            # Dependencias

Código Principal:
- src/app/page.tsx        # Página de inicio
- src/app/booking/page.tsx # Página de booking
- src/components/          # Componentes React
- src/services/            # Lógica de negocio

Documentación:
- README.md               # Documentación principal
- GUIA_USUARIO.md         # Guía para usuarios
- DOCUMENTACION_TECNICA.md # Documentación técnica
```

---

## 🎯 Flujo de Uso

```
1. HOME PAGE
   ├─ Mostrar formulario de búsqueda
   └─ Usuario ingresa datos

2. SEARCH RESULTS
   ├─ Mostrar vuelos disponibles
   └─ Usuario selecciona vuelo

3. FLIGHT SUMMARY
   ├─ Confirmar detalles del vuelo
   └─ Proceder a información del pasajero

4. PASSENGER FORM
   ├─ Capturar información personal
   ├─ Validar datos
   └─ Proceder a confirmación

5. CONFIRMATION
   ├─ Mostrar código de confirmación
   ├─ Mostrar resumen completo
   └─ Opción de descargar o volver a buscar

6. MY BOOKINGS
   └─ Ver todas las reservas realizadas
```

---

## 💻 Requisitos Mínimos

- **Node.js**: 18+
- **npm**: 8+
- **Navegador**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **SO**: Windows, macOS, Linux

---

## 🌐 URLs Principales

```
Home (Búsqueda):    http://localhost:3001/
Booking:            http://localhost:3001/booking
Mis Reservas:       http://localhost:3001/my-bookings

API Endpoints:
- Buscar vuelos:    POST /api/flights/search
- Crear reserva:    POST /api/bookings/create
```

---

## 🐛 Troubleshooting

### Puerto 3000/3001 en uso
```bash
# Buscar proceso en puerto 3000
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Dependencias faltando
```bash
npm install
npm install @hookform/resolvers
```

### Build fallando
```bash
rm -rf .next
npm run build
```

### TypeScript errors
```bash
npx tsc --noEmit
```

---

## 🎓 Estructura de Componentes

```
App
├── Header (Navigation)
├── FlightSearch (Form)
├── FlightList (Results)
└── [Pages]
    ├── Home
    ├── Booking
    │   ├── FlightSummary
    │   └── PassengerForm
    └── MyBookings
        └── BookingList
```

---

## 📈 Estadísticas del Proyecto

- **Líneas de Código**: ~3000+
- **Componentes**: 8
- **Páginas**: 3
- **API Routes**: 2
- **Tipos TypeScript**: 10+
- **Validaciones Zod**: 2+

---

## 📚 Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Zod Docs](https://zod.dev)

---

## 🚀 Deployment

### Vercel (Recomendado)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automático

### Otros Servicios
- Netlify + Supabase
- Railway
- Heroku
- AWS Amplify

---

## 🎉 ¡Listo!

Tu aplicación SFTK Airlines está lista para usar. 

**Próximos pasos:**
1. Prueba la búsqueda de vuelos
2. Completa una reserva
3. Consulta en "Mis Reservas"
4. Explora el código
5. Personaliza según tus necesidades

¡Que disfrutes! ✈️

---

**Para más información, revisa:**
- GUIA_USUARIO.md (Guía para usuarios)
- DOCUMENTACION_TECNICA.md (Documentación técnica)
- README.md (Documentación completa)
