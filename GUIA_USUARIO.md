# SFTK Airlines - Guía del Usuario

Bienvenido a **SFTK Airlines**, el sistema moderno de reserva de vuelos con autenticación.

## 🚀 Empezando

### 1. Acceder a la Aplicación

- Abre tu navegador en `http://localhost:3000`
- Verás la página principal con el formulario de búsqueda de vuelos

### 2. Crear una Cuenta (Loyalty Account)

#### Opción A: Registrarse
1. Haz clic en **"Loyalty Account"** en el header
2. En el modal de login, haz clic en **"Create an account"**
3. Completa:
   - Nombre
   - Apellido  
   - Email
   - Contraseña
4. Haz clic en **"Sign Up"**

#### Opción B: Usar Demo Account
- Email: `demo@example.com`
- Contraseña: `password123`

### 3. Buscar un Vuelo

#### Paso 1: Completa los datos de búsqueda
- **Origen**: Ingresa el código del aeropuerto (ej: MEX, MIA, NYC)
- **Destino**: Ingresa el código de destino (ej: MIA, NYC, LAX)
- **Fecha de Salida**: Selecciona una fecha futura
- El autocomplete te sugerirá códigos válidos
- Haz clic en **"Search"**

#### Paso 2: Visualiza los Resultados
Se mostrarán todos los vuelos disponibles con:
- ✈️ Número de vuelo
- 🕐 Horario de salida y llegada
- ⏱️ Duración del viaje
- 🛫 Número de escalas
- 💰 Precio por pasajero
- 👥 Asientos disponibles

La página hará scroll automático a los resultados.

### 4. Seleccionar un Vuelo

- Haz clic en el botón **"Select"** (azul con ícono de avión)
- Se mostrará un resumen detallado del vuelo seleccionado
- Verifica toda la información antes de continuar

### 5. Información del Pasajero

Completa el formulario con tus datos:
- **Nombre**: Tu nombre completo
- **Apellido**: Tu apellido
- **Email**: Tu dirección de email
- **Teléfono**: Tu número de contacto

Todos los campos son obligatorios. El sistema validará automáticamente tu información.

**Paso 2 de 3**: Verás un indicador de progreso en la parte superior.

### 6. Confirmación de Reserva

Una vez completes el formulario de pasajero:
- El sistema generará automáticamente un **Código de Confirmación Único**
- Verás una pantalla de confirmación con todos los detalles
- **Información importante** (con ícono ⓘ): Información sobre políticas y cambios
- Puedes descargar tu boleto o volver a buscar otros vuelos

**Paso 3 de 3**: Completado

## 👜 Gestión de Equipaje

### Agregar Equipaje a tu Reserva

En la pantalla de confirmación de detalles:
1. Haz clic en **"Add Baggage"** (botón rojo)
2. Se abrirá un modal para seleccionar equipaje
3. Elige cantidad: 1 o 2 maletas
4. Cada maleta cuesta **$30**
5. Verifica el precio total
6. Haz clic en **"Confirm"**

El sistema actualizará automáticamente tu reserva con el nuevo costo.

## 📋 Mis Reservas

Para consultar tus reservas (debe estar autenticado):
1. Haz clic en **"My Trips"** en el header (solo visible si estás logueado)
2. Se abrirá un drawer lateral con tus reservas
3. Cada reserva muestra:
   - Código de confirmación
   - Estado (Confirmed)
   - Información de vuelo básica
   - Botón **"View Details"**

### Ver Detalles Completos de una Reserva

1. En el drawer "My Trips", haz clic en **"View Details"**
2. Se abrirá un modal con:
   - Código de confirmación
   - **Información del Vuelo**: Número, aeropuertos, horarios
   - **Información del Pasajero**: Nombre, email, teléfono
   - **Equipaje**: Cantidad y precio
   - **Resumen de Precio**: Desglose de costos
   - Botón para agregar más equipaje

## 🎨 Interfaz de Usuario

### Navegación Principal
- **Logo SFTK Airlines**: Lleva a la página principal
- **Book**: Ir a búsqueda de vuelos
- **My Trips**: Consultar tus reservas (solo logueado)
- **Loyalty Account**: Login/Logout

### Indicadores de Paso
Durante el booking verás 3 pasos:
1. ✈️ Flight - Seleccionar itinerario
2. 👤 Passenger - Llenar información
3. 📋 Confirmation - Resumen final

### Colores de la Interfaz
- **Azul Oscuro (#11172b)**: Elementos primarios
- **Azul (#1f2f5c)**: Acciones principales y botones
- **Rojo (#8B1E3F)**: Información importante y precios
- **Gris (#f2f3f5)**: Fondos neutros
- **Blanco**: Fondos principales

### Modales
- **LoginModal**: Para crear cuenta o login
- **AddBaggageModal**: Para agregar equipaje
- **BookingDetails**: Detalles completos de reserva
- **MyTripsDrawer**: Lista de tus viajes

## 💡 Tips y Trucos

- **Vuelos Directos**: Busca vuelos con 0 escalas para viajes más rápidos
- **Mejores Precios**: Usa la búsqueda para comparar precios de diferentes horarios
- **Código de Confirmación**: Es tu prueba de reserva, guárdalo
- **Responsive**: Puedes usar la app en tu móvil, tablet o desktop
- **Validación**: El sistema te avisará si hay errores en tus datos
- **Smooth Scroll**: La app automáticamente scrollea a los resultados cuando buscas

## 🔐 Seguridad

- Todos tus datos son validados en tiempo real
- Las contraseñas se mantienen privadas y encriptadas
- Las reservas se guardan de forma segura
- Los datos de sesión se mantienen seguros

## ❓ Preguntas Frecuentes

### ¿Puedo cambiar mi reserva?
Sí, en la pantalla de detalles de la reserva puedes agregar o modificar equipaje.

### ¿Qué pasa si me olvido mi contraseña?
Actualmente no hay recuperación de contraseña. En futuras versiones se implementará.

### ¿Cuánto cuesta el equipaje?
Cada maleta de equipaje (checked bag) cuesta **$30**.

### ¿Cuántas maletas puedo agregar?
Puedes agregar hasta 2 maletas por reserva.

### ¿Puedo hacer múltiples búsquedas?
Sí, puedes hacer tantas búsquedas como desees. Los resultados se cargarán automáticamente.

### ¿Puedo cancelar mi vuelo?
El sistema de cancelación llegará pronto. Por ahora contacta con soporte.

### ¿Cuándo recibiré confirmación por email?
En el sistema actual, recibirás confirmación inmediatamente. En producción, llegará dentro de minutos.

### ¿Cuál es el código de confirmación?
Es un código único que identifica tu reserva. Úsalo en el check-in y consultas.

### ¿Qué debo llevar al aeropuerto?
- Tu código de confirmación
- Documento de identidad válido
- Llega 2 horas antes del vuelo

## 📞 Contacto y Soporte

Para reportar problemas o sugerencias:
- Email: support@sftk-airlines.com
- Teléfono: 1-800-SFTK-AIR
- Web: www.sftk-airlines.com

---

**¡Que disfrutes tu vuelo con SFTK Airlines! ✈️**
