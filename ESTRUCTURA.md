# 📁 Estructura del Portfolio - Guía de Uso

## 🎯 Para cambiar tu información personal

**Edita solo este archivo:** `src/data/portfolio.ts`

```typescript
// Cambia aquí tu información
export const personalInfo = {
  name: "GONZALO",              // Tu nombre
  title: "INGENIERO EN COMPUTACIÓN",
  subtitle: "DESARROLLADOR DE SOFTWARE",
  tagline: "Construyendo el futuro...",
  email: "tu@email.com",        // Tu email
  github: "https://github.com/tu-usuario",
  githubUsername: "@tu-usuario",
  location: "Chile"
};

// Agrega o edita proyectos
export const projects = [
  {
    title: "Mi Proyecto",
    description: "Descripción del proyecto...",
    tech: ["React", "TypeScript"],
    status: "ACTIVO",
    demo: "https://...",
    repo: "https://github.com/..."
  }
];

// Edita skills, experiencia, educación, etc.
```

## 📂 Estructura de archivos

```
src/
├── components/              # Componentes reutilizables
│   ├── Navbar.tsx          # Barra de navegación
│   ├── ScrollToTop.tsx     # Botón scroll to top
│   ├── LoadingSpinner.tsx  # Pantalla de carga
│   ├── TypingEffect.tsx    # Efecto de escritura
│   └── index.ts            # Exporta todos
│
├── sections/               # Secciones del portfolio
│   ├── HeroSection.tsx     # Sección principal
│   ├── AboutSection.tsx    # Sobre mí
│   ├── SkillsSection.tsx   # Habilidades
│   ├── ExperienceSection.tsx # Experiencia y educación
│   ├── ProjectsSection.tsx # Proyectos
│   ├── ContactSection.tsx  # Contacto
│   └── index.ts            # Exporta todas
│
├── data/
│   └── portfolio.ts        # 🎯 TODA TU INFORMACIÓN AQUÍ
│
├── App.tsx                 # Componente principal (limpio)
├── index.css               # Estilos globales
└── main.tsx                # Punto de entrada
```

## ✅ Ventajas de esta estructura

1. **Fácil de mantener** - Cada componente en su archivo
2. **Datos centralizados** - Todo en `portfolio.ts`
3. **Reutilizable** - Componentes independientes
4. **Escalable** - Fácil agregar nuevas secciones
5. **TypeScript** - Todo tipado

## 🚀 Cómo agregar una nueva sección

1. Crea un archivo en `src/sections/MiSeccion.tsx`
2. Agrega los datos en `src/data/portfolio.ts`
3. Exporta en `src/sections/index.ts`
4. Importa y usa en `src/App.tsx`

## 🎨 Estilos

- **Tailwind CSS** - Para layouts, spacing, responsive
- **CSS custom** - Para animaciones complejas (`.retro-card`, `.retro-terminal`)
- **Framer Motion** - Para animaciones de componentes
- **GSAP** - Para animaciones avanzadas y scroll

## 📝 Comandos útiles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de producción
```

## 🔧 Para personalizar estilos

- **Cards retro**: Edita `src/index.css` (clases `.retro-card`, `.retro-terminal`)
- **Colores**: Usa clases de Tailwind o edita `tailwind.config.js`
- **Animaciones**: Ajusta en cada componente o en `src/index.css`

## 📦 Estructura de datos

Todos los datos están en `src/data/portfolio.ts`:

- `personalInfo` - Información personal
- `about` - Descripción sobre ti
- `stats` - Estadísticas (años de experiencia, etc.)
- `skills` - Habilidades técnicas
- `education` - Educación
- `experience` - Experiencia laboral
- `projects` - Proyectos
- `navLinks` - Links del menú de navegación

---

**¿Necesitas ayuda?** Revisa los comentarios en cada archivo o pregunta en GitHub.
