# SFTK Airlines - Flight Booking System

Un demo moderno de sistema de reserva de vuelos para la aerolínea SFTK Airlines, construido con **Next.js 14**, **React**, **TypeScript**, **TailwindCSS** y **Prisma**.

## 🚀 Características Principales

### User Story 1: Search & Book a Flight

#### 1. Búsqueda de Vuelos
- ✅ Sistema permite ingresar origen, destino y fechas
- ✅ Autocomplete para códigos de aeropuertos
- ✅ Se despliegan múltiples opciones de itinerarios disponibles
- ✅ Cada itinerario muestra: precio, horarios, duración y escalas
- ✅ Smooth scroll a resultados después de buscar

#### 2. Selección de Vuelo
- ✅ El usuario puede seleccionar un itinerario de la lista
- ✅ El sistema muestra un resumen detallado del vuelo seleccionado
- ✅ Información del vuelo con icono de avión

#### 3. Información del Pasajero
- ✅ Formulario captura: nombre, apellido, email y teléfono
- ✅ Validación básica de campos obligatorios con Zod
- ✅ Mensajes de error en tiempo real
- ✅ Indicadores de progreso (3 pasos)

#### 4. Confirmación de Compra
- ✅ El sistema genera un número de confirmación único
- ✅ Se muestra pantalla de confirmación con detalles del vuelo
- ✅ El viaje queda almacenado en la BD y disponible para consulta posterior (API-backed)
- ✅ Botón para descargar boleto

### User Story 2: Loyalty Account & Authentication

#### 1. Loyalty Account
- ✅ Botón "Loyalty Account" en el header
- ✅ Modal de login/signup con campos email, password y datos personales
- ✅ Validación de credenciales
- ✅ Almacenamiento seguro de sesión (localStorage + BD)
- ✅ Toggle entre login y signup

#### 2. Acceso a Reservas
- ✅ MyTripsDrawer para ver reservas del usuario autenticado (fetches from API)
- ✅ Muestra código de confirmación y estado
- ✅ Botón para ver detalles completos
- ✅ Sign Out para cerrar sesión

#### 3. Gestión de Equipaje
- ✅ Modal para agregar equipaje a la reserva
- ✅ Selección de cantidad de maletas
- ✅ Precio por maleta ($30)
- ✅ Cálculo automático del total
- ✅ Resumen de precio en BookingDetails (persisted to BD)

### User Story 3: Baggage Management (Add Baggage)

#### 1. Acceso a equipaje
- ✅ Accede al viaje desde My Trips o My Bookings
- ✅ Selecciona opción "Add Baggage"

#### 2. Configuración de equipaje
- ✅ Elige cantidad: 1 o 2 bolsas
- ✅ Precio visible: $30 por bolsa
- ✅ Cálculo en tiempo real

#### 3. Confirmación y persistencia
- ✅ Botón "Confirm & Add" completa la transacción
- ✅ Feedback visual (checkmark + confirmación)
- ✅ Detalles se actualizan automáticamente en BD

## 🛠️ Stack Tecnológico

- **Frontend Framework**: Next.js 14 con App Router
- **UI Library**: React 18
- **Lenguaje**: TypeScript
- **Styling**: TailwindCSS
- **Form Management**: React Hook Form
- **Validación**: Zod
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL (Neon, Vercel Postgres, Supabase)
- **Icons**: Lucide React
- **Utility Libraries**: date-fns, axios
- **Linting**: ESLint
- **Deployment**: Vercel (con CI/CD automático)
- **State Management**: React Context (Auth) + SessionStorage (temporal flight selection)

## 📁 Estructura del Proyecto

```
sftk-airlines/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── signup/
│   │   │   │       └── route.ts
│   │   │   ├── flights/
│   │   │   │   └── search/
│   │   │   │       └── route.ts
│   │   │   └── bookings/
│   │   │       ├── create/
│   │   │       ├── my-bookings/
│   │   │       ├── [confirmationCode]/
│   │   │       │   └── add-baggage/
│   │   │       │       └── route.ts
│   │   │       └── [confirmationCode]/
│   │   │           └── route.ts
│   │   ├── booking/
│   │   │   └── page.tsx
│   │   ├── my-bookings/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── auth/
│   │   │   └── LoginModal.tsx
│   │   ├── flights/
│   │   │   ├── FlightSearch.tsx
│   │   │   ├── AirportAutocomplete.tsx
│   │   │   └── FlightList.tsx
│   │   ├── booking/
│   │   │   ├── PassengerForm.tsx
│   │   │   ├── FlightSummary.tsx
│   │   │   ├── BookingConfirmation.tsx
│   │   │   ├── BookingDetails.tsx
│   │   │   └── AddBaggageModal.tsx
│   │   ├── home/
│   │   │   └── Hero.tsx
│   │   └── loyalty/
│   │       └── MyTripsDrawer.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── generated/
│   │   └── prisma/ (Prisma Client)
│   ├── hooks/
│   ├── lib/
│   │   └── validations.ts
│   ├── services/
│   │   └── flightService.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── format.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🎨 Diseño UI/UX

- **Tipografía**:
  - Body: Nunito Sans (400-800 weights)
  - Display: Cormorant Garamond (400-700 weights)
  - Monospace: Geist Mono (code)

- **Colores**: Sistema de paleta coherente
  - Azul Primario: `#11172b`
  - Azul Secundario: `#1f2f5c`
  - Rojo Corporativo: `#8B1E3F` (hover: `#731836`)
  - Gris Neutral: `#f2f3f5`
  - Blanco: `#FFFFFF`

- **Responsividad**: Totalmente responsive
  - Mobile first approach
  - Breakpoints optimizados para tablet y desktop
  - Smooth scroll behavior en búsqueda de resultados

- **Componentes Principales**:
  - Header con branding y Loyalty Account
  - Hero con banner filtrado en azul
  - Search form con validación y autocomplete
  - Flight list con cards interactivas
  - Passenger form con validación en tiempo real
  - Booking confirmation con detalles completos
  - Baggage management modal
  - MyTripsDrawer para consultar reservas
  - Modales para login y agregar equipaje

## ⚙️ Instalación y Setup

### Requisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

3. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Build
npm run build        # Crea la build de producción
npm start           # Inicia el servidor de producción

# Validación
npm run lint        # Ejecuta ESLint
```

## 🗄️ Modelos de Base de Datos

### Schema Prisma Completo

Todos los modelos usan relaciones con validación de integridad referencial.

### User
- `id`: String (ID único)
- `email`: String (Email del usuario, único)
- `password`: String (Hasheada con SHA-256)
- `firstName`: String
- `lastName`: String
- `phone`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Relaciones**: bookings (One-to-Many)

### Flight
- `id`: String (ID único)
- `flightNumber`: String (único)
- `departureAirport`: String (formato "City (CODE)")
- `arrivalAirport`: String (formato "City (CODE)")
- `departureTime`: DateTime
- `arrivalTime`: DateTime
- `airline`: String
- `stops`: Int
- `availableSeats`: Int
- `price`: Float
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Relaciones**: bookings (One-to-Many)

### Booking
- `id`: String (ID único)
- `confirmationCode`: String (único, generado automáticamente)
- `userId`: String (FK → User)
- `flightId`: String (FK → Flight)
- `passengerName`: String
- `passengerEmail`: String
- `passengerPhone`: String
- `status`: String (default: "confirmed")
- `baggageCount`: Int (default: 0)
- `baggagePrice`: Float (default: 0)
- `totalPrice`: Float
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Relaciones**: user (Many-to-One), flight (Many-to-One)

## 🚀 Deployment en Vercel

1. Crear repositorio en GitHub
2. Conectar a Vercel en [vercel.com](https://vercel.com)
3. Configurar variables de entorno
4. Configurar base de datos PostgreSQL (Vercel Postgres, Neon, Supabase, etc.)
5. Deploy automático en cada push a `main`

## 🔐 Seguridad

- ✅ Validación de inputs con Zod (frontend + backend)
- ✅ Type-safe con TypeScript en toda la aplicación
- ✅ Variables de entorno protegidas (DATABASE_URL en .env.local)
- ✅ API routes protegidas con validación de User-Id header
- ✅ Contraseñas hasheadas con SHA-256
- ✅ Transacciones atómicas en Prisma (seat decrement + booking creation)

## 📱 Responsividad

- ✅ Mobile (375px - 480px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1024px+)

## 📝 Funcionalidades Futuras

### Priodad Alta
- NextAuth.js para autenticación más robusta
- Integración con Stripe/PayPal para pagos reales
- Cambio y cancelación de reservas
- Sistema de notificaciones por email (transaccionales)
- Búsqueda avanzada de vuelos (filtros, ordenamiento)

### Prioridad Media
- PDF de boletos descargables
- Sistema de reviews de vuelos
- Programa de millas/puntos de lealtad
- Búsqueda de vuelos de retorno (round trip)
- Selección de asientos

### Prioridad Baja
- Upgrades de clase de vuelo
- Seguros de viaje
- Servicio de traslado (ground transport)

---

**Hecho con ❤️ usando Next.js 14, React 18, TypeScript y Prisma**
