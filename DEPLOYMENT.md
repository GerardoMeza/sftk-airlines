# 🚀 Deployment Guide - SFTK Airlines

## Troubleshooting: Prisma Client Build Error

Si experimentas el error: **"Module not found: Can't resolve '@/generated/prisma/client'"**

### Solución Rápida:

1. **Clear Vercel Cache**
   - Ve a tu proyecto en Vercel
   - Settings → Deployments
   - Haz clic en los tres puntos (…) en el deployment
   - Selecciona "Redeploy"
   - **Importante**: Unchecka "Use existing Build Cache"
   - Haz clic en "Redeploy"

2. **Alternativa - Full Clean Redeploy**
   - Settings → General
   - Scroll a "Build & Development Settings"
   - Verifica que Build Command es: `npx prisma generate && npm run build`
   - Haz un nuevo push a main
   ```bash
   git add .
   git commit -m "Trigger rebuild"
   git push origin main
   ```

3. **Si sigue fallando - Rebuild Node Modules**
   - Borra `.next` localmente
   - Borra `node_modules` y `package-lock.json`
   - Reinstala dependencias:
   ```bash
   npm install
   ```
   - Push nuevamente a GitHub

## Environment Variables en Vercel

Asegúrate que tienes estas variables en Vercel:

### Opción A: Vercel Postgres (Recomendado)
```
DATABASE_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
```

### Opción B: Neon o Supabase
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

## Build Command

Verifica que el Build Command en Vercel es:
```
npx prisma generate && npm run build
```

**NO uses:**
- ❌ `npm run build` (solo)
- ❌ `prisma migrate deploy && npm run build`

## Migraciones en Vercel

Las migraciones se corren automáticamente con la primera connection a la base de datos. 

Si necesitas correr migraciones manualmente:

```bash
DATABASE_URL="tu-url-produccion" npx prisma migrate deploy
```

## Verificar Deployment

1. Ve a https://tu-url.vercel.app
2. Prueba las funcionalidades:
   - Búsqueda de vuelos
   - Login/Signup
   - Crear reserva
   - Agregar equipaje

3. Si hay error en API:
   - Ve a Vercel Dashboard
   - Deployments → Click en último
   - Functions → Ver logs

## Common Issues

| Error | Solución |
|-------|----------|
| Module not found: @/generated/prisma/client | Clear cache y redeploy sin cache |
| Database connection failed | Verifica DATABASE_URL en variables |
| 404 en rutas API | Verifica que rutas están en `src/app/api/` |
| Prisma Client generation timeout | Aumenta timeout en Build Settings |

## Next Steps

Una vez deployado exitosamente:

1. ✅ Configura dominio personalizado (opcional)
2. ✅ Configura moniteo/alertas
3. ✅ Backup automático de BD
4. ✅ Considera agregar autenticación con NextAuth
5. ✅ Implementar pagos con Stripe

---

**¿Necesitas ayuda?** Revisa los logs en Vercel Dashboard o abre un issue en GitHub.
