# SFTK Airlines - Documentación Técnica

## 🏗️ Arquitectura del Proyecto

### Frontend (Client-Side)
- **Framework**: Next.js 14 con App Router
- **Rendering**: Server Components + Client Components
- **Styling**: TailwindCSS con custom colors y variables CSS
- **Tipografía**: Nunito Sans + Cormorant Garamond + Geist Mono
- **State Management**: React Hooks + Context API (AuthContext)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Lucide React

### Backend (Server-Side)
- **Runtime**: Node.js (Next.js API Routes)
- **Authentication**: Context-based with session storage
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod (client & server)

### Deployment
- **Platform**: Vercel
- **Database**: Prisma Postgres / Neon / Supabase
- **CI/CD**: Automatic on push
- **Environment**: .env.local for local development

## 📚 Stack Completo

```
Frontend Layer:
- Next.js 14 (Framework)
- React 18 (UI Components)
- TypeScript (Type Safety)
- TailwindCSS (Styling)
- Nunito Sans + Cormorant Garamond (Typography)
- Lucide Icons (Icons)
- date-fns (Date Utilities)
- React Hook Form + Zod (Forms & Validation)

Backend Layer:
- Next.js 14 API Routes
- Prisma (Database ORM)
- PostgreSQL (Database)
- Zod (Schema Validation)

Development Tools:
- ESLint (Code Quality)
- TypeScript (Type Checking)
- npm (Package Management)
- Vercel CLI (Deployment)
```

## 📂 Estructura de Carpetas Detallada

```
src/
├── app/                               # Next.js App Router
│   ├── api/                           # API Routes
│   │   ├── auth/
│   │   │   ├── login/route.ts         # Login endpoint
│   │   │   └── signup/route.ts        # Signup endpoint
│   │   ├── flights/search/route.ts    # Search flights
│   │   └── bookings/
│   │       ├── create/route.ts        # Create booking
│   │       ├── my-bookings/route.ts   # Get user bookings
│   │       ├── [confirmationCode]/route.ts      # Get booking details
│   │       └── [confirmationCode]/add-baggage/route.ts
│   ├── booking/page.tsx               # Booking page (steps 2-3)
│   ├── my-bookings/page.tsx           # Bookings list page
│   ├── globals.css                    # Global styles with CSS vars
│   ├── layout.tsx                     # Root layout with fonts
│   └── page.tsx                       # Home page (search hero)
│
├── components/                        # Reusable Components
│   ├── Header.tsx                     # Navigation header
│   ├── auth/
│   │   └── LoginModal.tsx             # Login/Signup modal
│   ├── flights/
│   │   ├── FlightSearch.tsx           # Search form
│   │   ├── AirportAutocomplete.tsx    # Airport autocomplete
│   │   └── FlightList.tsx             # Flight listings
│   ├── booking/
│   │   ├── PassengerForm.tsx          # Passenger info form
│   │   ├── FlightSummary.tsx          # Flight details display
│   │   ├── BookingConfirmation.tsx    # Confirmation page
│   │   ├── BookingDetails.tsx         # Booking details modal
│   │   └── AddBaggageModal.tsx        # Baggage selection modal
│   ├── home/
│   │   └── Hero.tsx                   # Hero with banner
│   └── loyalty/
│       └── MyTripsDrawer.tsx          # My bookings drawer
│
├── context/
│   └── AuthContext.tsx                # Authentication context
├── generated/
│   └── prisma/                        # Prisma Client generated
├── hooks/                             # Custom React Hooks
├── lib/
│   └── validations.ts                 # Zod schemas
├── services/
│   └── flightService.ts               # Mock data & API logic
├── types/
│   └── index.ts                       # TypeScript interfaces
└── utils/
    └── format.ts                      # Utility functions
```

## 🔄 Flujo de Datos - Autenticación

```
User Registration Flow:
1. User clicks "Loyalty Account" → LoginModal opens
2. Selects "Create an account"
3. Completes signup form
4. Form → /api/auth/signup (POST)
5. Server validates + creates user
6. User stored in database
7. Context updated with user session
8. User redirected to home

User Login Flow:
1. User clicks "Loyalty Account"
2. Enters email + password
3. Form → /api/auth/login (POST)
4. Server validates credentials
5. AuthContext updated on success
6. MyTripsDrawer becomes available
7. User can see "My Trips" option
```

## 🔄 Flujo de Datos - Reserva de Vuelos

```
Flight Search Flow:
1. User → FlightSearch Component
2. Enters origin, destination, date
3. FlightSearch → /api/flights/search (POST)
4. API → flightService.searchFlights()
5. Returns FlightList Component
6. Page scrolls to results (smooth)
7. User selects flight

Booking Flow:
1. User clicks "Select" on flight
2. FlightSummary displays details
3. User clicks "Continue"
4. PassengerForm captures info
5. Form validates with Zod
6. Form → /api/bookings/create (POST)
7. Server generates confirmation code
8. Booking stored in database
9. BookingConfirmation displays result
10. Code stored in session
```

## 🔄 Flujo de Datos - Gestión de Equipaje

```
Add Baggage Flow:
1. User views BookingDetails modal
2. Clicks "Add Baggage" button
3. AddBaggageModal opens
4. Selects quantity (1-2 bags)
5. Modal → /api/bookings/[code]/add-baggage (POST)
6. Server updates baggage count
7. Server recalculates total price
8. Booking updated in database
9. Modal closes
10. BookingDetails refreshes with new price
```

## 🔌 API Endpoints

### POST /api/auth/signup
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Response:** (201)
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "Juan",
    "lastName": "Pérez"
  },
  "token": "session-token"
}
```

### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:** (200)
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "Juan",
    "lastName": "Pérez"
  },
  "token": "session-token"
}
```

### POST /api/flights/search
**Request:**
```json
{
  "origin": "MEX",
  "destination": "MIA",
  "departureDate": "2026-01-15",
  "passengers": 1
}
```

**Response:**
```json
[
  {
    "id": "flight-1",
    "flightNumber": "SFTK001",
    "airline": "SFTK Airlines",
    "departureAirport": "MEX",
    "arrivalAirport": "MIA",
    "departureTime": "2026-01-15T10:00:00Z",
    "arrivalTime": "2026-01-15T14:00:00Z",
    "stops": 0,
    "availableSeats": 150,
    "price": 320
  }
]
```

### POST /api/bookings/create
**Request:**
```json
{
  "flightId": "flight-1",
  "passengerName": "Juan Pérez",
  "passengerEmail": "juan@example.com",
  "passengerPhone": "+52 5555555555"
}
```

**Response:** (201)
```json
{
  "confirmationCode": "SFTK1234567890ABC",
  "booking": {
    "id": "booking-123",
    "confirmationCode": "SFTK1234567890ABC",
    "passengerName": "Juan Pérez",
    "flightNumber": "SFTK001",
    "totalPrice": 320,
    "status": "confirmed"
  }
}
```

### POST /api/bookings/[confirmationCode]/add-baggage
**Request:**
```json
{
  "baggageCount": 2,
  "confirmationCode": "SFTK1234567890ABC"
}
```

**Response:** (200)
```json
{
  "booking": {
    "confirmationCode": "SFTK1234567890ABC",
    "baggageCount": 2,
    "baggagePrice": 60,
    "totalPrice": 380
  }
}
```

### GET /api/bookings/my-bookings
**Response:**
```json
[
  {
    "id": "booking-123",
    "confirmationCode": "SFTK1234567890ABC",
    "passengerName": "Juan Pérez",
    "flightNumber": "SFTK001",
    "status": "confirmed",
    "totalPrice": 380
  }
]
```

## 🗄️ Database Schema (Prisma)

## 🛠️ Instalación de Dependencias

### Production Dependencies
```bash
npm install \
  @prisma/client \
  next-auth \
  axios \
  lucide-react \
  date-fns \
  react-hook-form \
  zod
```

### Development Dependencies
```bash
npm install -D \
  prisma \
  @types/node \
  @hookform/resolvers
```

## 🚀 Configuración para Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

### Database Setup (Vercel Postgres)
```bash
npx prisma migrate deploy
npx prisma generate
```

## 🧪 Development Workflow

### Start Development
```bash
npm run dev
# Available at http://localhost:3000
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

## 📦 Component APIs

### FlightSearch
```tsx
<FlightSearch 
  onSearch={(params) => {}} 
  isLoading={false}
/>
```

### FlightList
```tsx
<FlightList 
  flights={[]} 
  onSelectFlight={(flight) => {}}
/>
```

### PassengerForm
```tsx
<PassengerForm 
  onSubmit={(data) => {}} 
  isLoading={false}
/>
```

### FlightSummary
```tsx
<FlightSummary 
  flight={} 
  showAction={true}
/>
```

### BookingConfirmation
```tsx
<BookingConfirmation 
  booking={} 
  flight={}
/>
```

## 🔐 Security Considerations

1. **Input Validation**: All inputs validated with Zod
2. **CORS**: Configured for API routes
3. **Environment Variables**: Sensitive data in .env.local
4. **Type Safety**: TypeScript prevents many errors
5. **SQL Injection**: Prisma prevents SQL injection
6. **HTTPS**: Required in production (Vercel provides it)

## 📊 Performance Optimizations

1. **Image Optimization**: Next.js Image component ready
2. **Code Splitting**: Automatic with Next.js
3. **Lazy Loading**: Components can be lazy-loaded
4. **Caching**: API responses can be cached
5. **Database**: Indexed fields for fast queries

## 🔄 State Management

### Current (Demo)
- sessionStorage for temporary data
- React Hooks for component state
- Props drilling (acceptable for this size)

### Future (Production)
- Redux or Zustand for global state
- React Query for server state
- NextAuth for authentication state

## 📱 Responsive Design Breakpoints

```css
Mobile: 375px - 480px (max-width: 640px)
Tablet: 768px - 1024px (max-width: 1024px)
Desktop: 1024px+ (min-width: 1025px)
```

## 🎨 Custom Tailwind Colors

```js
colors: {
  'sftk-blue': '#003366',
  'sftk-blue-light': '#004a8d',
  'sftk-red': '#C4122E',
}
```

## 📝 Coding Standards

1. **File Naming**: kebab-case for files, PascalCase for components
2. **Component Naming**: PascalCase
3. **Functions**: camelCase
4. **Variables**: camelCase
5. **Constants**: UPPER_SNAKE_CASE
6. **Interfaces**: PascalCase with I prefix (optional)

## 🚀 Next Steps & Enhancements

### Phase 2 (Soon)
- NextAuth.js implementation
- Real database integration
- Email notifications
- Advanced search filters

### Phase 3 (Future)
- Payment integration (Stripe)
- Booking modifications
- Cancellation system
- Admin dashboard
- Analytics

### Phase 4 (Future)
- Mobile app (React Native)
- Multi-language support
- Loyalty program
- Insurance options

---

**For questions or contributions, please refer to GitHub Issues.**
