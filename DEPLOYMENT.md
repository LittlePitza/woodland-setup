# 🚀 Cómo correr y deployar Woodland Setup

## 1. Correr localmente (5 minutos)

```bash
# Descomprimir el proyecto
unzip woodland-setup.zip
cd woodland-setup

# Instalar dependencias (requiere Node 18+)
npm install

# Correr en modo desarrollo
npm run dev
# → Abre http://localhost:3000

# Correr los tests del algoritmo (23 casos)
npm run test:run

# Build de producción
npm run build
npm start
```

---

## 2. Subir a GitHub

```bash
cd woodland-setup
git init
git add .
git commit -m "Initial commit: Woodland Setup MVP"

# Crea un repo nuevo en github.com/new (público, sin README ni .gitignore)
# Luego:
git remote add origin https://github.com/TU_USUARIO/woodland-setup.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy a Vercel (literal 2 clics)

### Opción A — Desde la web (recomendado)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Conecta tu cuenta de GitHub
3. Importa el repo `woodland-setup`
4. Vercel detecta Next.js automáticamente — **no necesitas configurar nada**
5. Click "Deploy"
6. En ~60 segundos tendrás una URL tipo `woodland-setup-tu-usuario.vercel.app`

### Opción B — Vercel CLI

```bash
npm i -g vercel
cd woodland-setup
vercel
# Sigue las preguntas, todas las defaults funcionan
```

---

## 4. Dominio personalizado (opcional)

En Vercel:
- Settings → Domains → Add Domain
- Compra un dominio o conecta uno que ya tengas
- Vercel maneja el HTTPS automáticamente

Sugerencias de dominio:
- `woodlandsetup.app`
- `woodland.gg`
- `rootbalance.app`

---

## 5. Estructura del repo (referencia rápida)

```
woodland-setup/
├── app/                    # Rutas Next.js App Router
│   ├── page.tsx            # Landing /
│   ├── setup/page.tsx      # Wizard /setup
│   ├── factions/page.tsx   # Glosario /factions
│   ├── history/page.tsx    # Historial /history
│   ├── layout.tsx          # Layout root con fonts
│   └── globals.css         # Estilos globales
├── components/
│   ├── setup/              # 4 pasos del wizard
│   ├── factions/           # FactionCard
│   └── shared/             # Button, ReachMeter
├── lib/
│   ├── data/               # Dataset de las 14 facciones
│   ├── balance/            # ❤️ Algoritmo y validador
│   ├── storage/            # localStorage
│   ├── store.ts            # Zustand state
│   └── utils.ts
├── tests/
│   └── balance.test.ts     # 23 tests
├── types/
│   └── index.ts            # Tipos TypeScript
└── ...
```

---

## 6. Cosas que querrás hacer después

### Crear el favicon
Pon un PNG/SVG en `app/favicon.ico` o `app/icon.png`. Next.js lo detecta automáticamente.

### Cambiar el dominio del Open Graph
Edita `app/layout.tsx` para añadir `metadataBase`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://tu-dominio.com"),
  title: "...",
  // ...
};
```

### Agregar Analytics (sin tracking invasivo)
Vercel Analytics es gratis hasta cierto tráfico:

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

<body>
  {children}
  <Analytics />
</body>
```

### Customizar la paleta
Todo está en `tailwind.config.ts` → `theme.extend.colors`.

### Agregar más facciones (fan-made)
Solo edita `lib/data/factions.ts`. El algoritmo y la UI las recogerán automáticamente.

---

## 7. Roadmap sugerido

- [ ] **Esta semana**: Deploy a Vercel, comparte el link con amigos
- [ ] **Próxima**: Agregar Vercel Analytics, customizar dominio
- [ ] **Más tarde**:
  - i18n (Inglés)
  - PWA installable (manifest + service worker)
  - Estadísticas: facción más jugada, win rate (requiere agregar campo "ganador" al historial)
  - Compartir setup vía URL única
  - Soporte para Hirelings y Landmarks
  - Modo torneo

---

## 8. Cómo contribuir

Es tu repo, tú decides el flujo. Sugerencia básica:

1. Issues etiquetados (`good-first-issue`, `bug`, `feature`)
2. PR template simple
3. CONTRIBUTING.md cuando empiece a haber contribuciones

---

**¡Disfrútalo y que el bosque decida por ustedes!** 🍂
