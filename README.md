# Alana Landing Page - Astro

Landing page profesional para propuestas personalizadas de Alana Dolls, construida con Astro siguiendo el estándar de código enterprise.

## 🚀 Estructura del Proyecto

```
landing-astro/
├── src/
│   ├── layouts/              # Layouts de Astro
│   │   └── BaseLayout.astro
│   ├── pages/                # Páginas de Astro
│   │   └── index.astro
│   ├── ui/                   # Capa de presentación
│   │   ├── components/
│   │   │   ├── atoms/        # Componentes atómicos
│   │   │   │   ├── Badge/
│   │   │   │   ├── Button/
│   │   │   │   ├── DynamicTag/
│   │   │   │   └── PersonalNote/
│   │   │   ├── molecules/    # Componentes compuestos
│   │   │   │   ├── AuditStat/
│   │   │   │   ├── Card/
│   │   │   │   ├── PhoneMockup/
│   │   │   │   └── VSLContainer/
│   │   │   └── organisms/    # Componentes complejos
│   │   │       ├── AuditSection/
│   │   │       ├── FeaturesSection/
│   │   │       ├── Footer/
│   │   │       ├── Hero/
│   │   │       ├── PricingSection/
│   │   │       ├── SyndicateSection/
│   │   │       └── ZombieSection/
│   │   └── styles/           # Sistema de diseño
│   │       ├── tokens/
│   │       │   ├── colors.ts
│   │       │   ├── typography.ts
│   │       │   ├── spacing.ts
│   │       │   └── index.ts
│   │       └── global.css
│   └── env.d.ts
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Comandos

| Comando                   | Acción                                      |
| :------------------------ | :------------------------------------------ |
| `npm install`             | Instala las dependencias                    |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye para producción en `./dist/`      |
| `npm run preview`         | Preview del build antes de deploy           |

## 🎨 Personalización

Para personalizar la landing para un cliente específico, edita las variables en `src/pages/index.astro`:

```astro
const name = 'María'           // Nombre del cliente
const platform = 'OnlyFans'    // Plataforma del cliente
const calLink = 'https://cal.com/tu-link'  // Link de calendario
```

## 📐 Arquitectura

El proyecto sigue los principios de:

- **Atomic Design**: Componentes organizados en atoms, molecules, organisms
- **Design Tokens**: Sistema de diseño centralizado para colores, tipografía y espaciado
- **Arquitectura en Capas**: Separación clara entre UI, estilos y lógica

## 🎯 Estilo Visual

- Inspirado en alanadolls.com
- Paleta de colores: Rosa, rojo (#d90429), dorado (#d4af37)
- Tipografías: Playfair Display, Montserrat, Dancing Script
- Efectos: Glass morphism, gradientes, sombras suaves
