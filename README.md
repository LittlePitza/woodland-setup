# Woodland Setup

Pagina : https://woodland-setup.vercel.app/

> Asistente open-source para preparar partidas balanceadas de [Root](https://ledergames.com/products/root-a-game-of-woodland-might-and-right) (Leder Games).

Una webapp mobile-first hecha para ayudar a grupos de jugadores de Root a:

- **Sortear facciones de forma balanceada** usando el sistema oficial de _Reach_.
- **Hacer drafts por turnos** con un pool ampliado.
- **Validar selecciones manuales** en tiempo real (Reach, militantes, exclusiones).
- **Guardar historial** de partidas en el dispositivo.

Soporta las **14 facciones oficiales** (Base + Riverfolk + Underworld + Marauder + Homeland).

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** con paleta otoñal personalizada
- **Framer Motion** para microanimaciones
- **Zustand** para estado del wizard
- **Vitest** para tests del algoritmo de balance
- **localStorage** para persistencia (sin backend)

---

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:3000
npm run test      # tests del algoritmo de balance
npm run build     # build de producción
```

---

## El sistema de Reach

Cada facción tiene un valor numérico de _Reach_ (oficial del Law of Root). Para un setup balanceado, la suma debe alcanzar:

| Jugadores | Reach mínimo |
| --------- | ------------ |
| 2         | 17           |
| 3         | 18           |
| 4         | 21           |
| 5         | 25           |
| 6         | 28           |

Además, partidas de 2 jugadores requieren **2 militantes**, y reglas oficiales como la exclusión _Knaves of the Deepwood ↔ Vagabond_ son respetadas por el generador.

---

## Licencia

MIT. Ver [`LICENSE`](LICENSE).

**Root** y sus expansiones son marcas registradas de [Leder Games](https://ledergames.com). Este proyecto es una herramienta fan-made no afiliada ni respaldada por Leder Games. No incluye ningún arte, texto o material propietario de la editorial.

---


- [ ] Modo guiado por nivel de experiencia más fino
- [ ] PWA installable
- [ ] i18n (Español/Inglés)
- [ ] Estadísticas por facción
- [ ] Soporte para Hirelings y Landmarks
