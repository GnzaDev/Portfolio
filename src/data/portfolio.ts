// Portfolio Data - Cambia aquí tu información personal

export const personalInfo = {
  name: "GONZALO",
  title: "DESARROLLADOR DE SOFTWARE",
  subtitle: "Estudiante de Ingeniería en Informática — INACAP",
  tagline: "Construyendo el futuro, una línea de código a la vez",
  email: "bustamantegonzalo208@gmail.com",
  github: "https://github.com/GnzaDev",
  githubUsername: "@GnzaDev",
  linkedin: "https://linkedin.com/in/gonzalo-bustamante",
  location: "Chile"
};

export const about = {
  description: `Egresado de Técnico Analista Programador (2023-2024).
Actualmente cursando 4° año de Ingeniería en Informática en INACAP.
Especializado en frontend con React, Next.js y TypeScript.
Expandiendo a full-stack y mobile con React Native y Expo.
Abierto a nuevas oportunidades y desafíos.`,
  status: "SIEMPRE APRENDIENDO"
};


export const stats = [
  { label: "PROYECTOS", value: "7+ EN PRODUCCIÓN" },
  { label: "STACK", value: "REACT/NEXT.JS" },
  { label: "FRONTEND", value: "3+ AÑOS" },
  { label: "UBICACIÓN", value: "CHILE" }
];

export const skills = [
  {
    category: "Front-End",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "GSAP", "Framer Motion"]
  },
  {
    category: "Back-End",
    skills: ["Node.js", "Firebase", "Supabase", "InsForge", "Drizzle ORM", "PostgreSQL", "APIs REST"]
  },
  {
    category: "Mobile",
    skills: ["React Native", "Expo"]
  },
  {
    category: "Herramientas",
    skills: ["Git/GitHub", "Vercel", "Cloudflare Workers", "Stripe/Mercado Pago", "Figma"]
  }
];


export const education = [
  {
    degree: "Técnico Analista Programador",
    institution: "Instituto Profesional INACAP",
    period: "2023 - 2024",
    description: "Formación en programación, fundamentos de software y bases de datos."
  },
  {
    degree: "Ingeniería en Informática (En curso — 4° año)",
    institution: "Instituto Profesional INACAP",
    period: "2024 - Presente",
    description:
      "Continuidad de estudios orientada al desarrollo de software, arquitectura de sistemas, web y aplicaciones móviles."
  }
];


export const experience = [
  {
    position: "Desarrollador Frontend",
    company: "Proyectos Freelance / Académicos",
    period: "2024 - Presente",
    responsibilities: [
      "Desarrollo de aplicaciones web con React y Next.js.",
      "Participación en proyectos académicos y personales usando React Native y Expo.",
      "Integración de aplicaciones con servicios como Firebase y Supabase.",
      "Desarrollo de proyectos en paralelo a mis estudios de Ingeniería Informática."
    ]
  }
];



export const projects = [
  {
    title: "GnzaSync",
    description: "Herramienta profesional de traducción universal en tiempo real para PC, optimizada para transmisiones en vivo. Incorpora motor IA en Python, captura de sistema (Loopback), VAD, e IA local (Faster-Whisper) totalmente offline. Interfaz Glassmorphism moderna (React + Tauri) con overlay dinámico (PIP) y atajos globales.",
    tech: ["Python", "React", "Tauri", "Faster-Whisper"],
    status: "ACTIVO",
    featured: true
  },
  {
    title: "DondeComerBAES",
    description: "Mi primer proyecto personal lanzado para todos. Plataforma web para encontrar locales que aceptan la tarjeta BAES (beneficio de alimentación) en Chile. Incluye mapa interactivo, buscador, filtros y datos actualizados de comercios reales.",
    tech: ["React", "Next.js", "Supabase","Tailwind CSS"],
    status: "ACTIVO",
    demo: "https://dondecomerbaes.cl/",
    repo: "https://github.com/GnzaDev/DondeComerBAES",
    featured: true
  },
  {
    title: "Farmacia App",
    description: "Aplicación web para encontrar farmacias disponibles en Chile, ver estadísticas y contactar farmacias de turno. Utiliza datos oficiales del Ministerio de Salud de Chile.",
    tech: ["React", "Tailwind CSS", "Vite"],
    status: "ACTIVO",
    demo: "https://farmacias-app-chile.vercel.app/",
    repo: "https://github.com/GnzaDev/Farmacias-APP-Chile"
  },
  {
    title: "Tinkay",
    description: "Sistema de venta de servicios de belleza, con sistema de pagos con mercadopago y notificaciones",
    tech: ["Nextjs", "Supabase", "Tailwind CSS", "Mercadopago"],
    status: "PRIVATE",
    repo: "https://github.com/GnzaDev/tinkay-mercadopago",
    demo: "https://tinkay.cl"
  },
  {
    title: "StreamBot Discord",
    description: "Bot para Discord que permite gestionar y anunciar transmisiones en vivo de Twitch y YouTube en servidores de Discord. Incluye comandos personalizados y notificaciones automáticas.",
    tech: ["Node.js", "Discord.js", "JavaScript"],
    status: "ACTIVO",
    repo: "https://github.com/GnzaDev/StreamBotDiscord"
  },
  {
    title: "RestioAP",
    description: "Sistema web moderno de carta digital y gestión de pedidos para restaurantes mediante códigos QR. Los clientes escanean, exploran el menú, personalizan productos y piden desde su móvil. El staff administra comandas, mesas y cocina en tiempo real desde un panel web. Proyecto académico — INACAP.",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript", "Cloudflare"],
    status: "ACADEMIC",
    demo: "https://restioapp.gnza.me/"
  },
  {
    title: "DimePiola",
    description: "Plataforma de mensajes anónimos transformados por IA. Los usuarios reciben confesiones de su audiencia y generan imágenes espectaculares para Instagram y WhatsApp. Incluye filtro anti-hate con IA, 6 plantillas Pro, y acceso seguro con PIN.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Groq AI", "Framer Motion"],
    status: "ACTIVO",
    demo: "https://dimepiola.com"
  },
  {
    title: "KeysBot",
    description: "Plataforma SaaS para que dueños de tiendas de licencias digitales (Windows, Office) configuren y gestionen su propio bot de WhatsApp sin tocar código. Dashboard con React, webhooks y pagos integrados.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "InsForge", "Stripe"],
    status: "PRIVATE"
  },
];

// Actualmente aprendiendo
export const learning = [
  "Node.js avanzado",
  "Mejorando arquitectura frontend",
  "Automatización con n8n",
  "APIs REST & Edge Functions",
  "React Native apps"
];

// Intereses y hobbies (opcional)
export const interests = [
  "Open Source",
  "UI/UX Design",
  "Automatización",
  "Nuevas tecnologías",
  "Gaming"
];

// Logros o certificaciones (opcional)
export const achievements = [
  {
    title: "Título Técnico",
    description: "Técnico Analista Programador, INACAP",
    year: "2024"
  }
];

// Servicios que ofreces (opcional)
export const services = [
  {
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas con React y Next.js",
    icon: "code"
  },
  {
    title: "Desarrollo Móvil",
    description: "Apps nativas con React Native y Expo",
    icon: "mobile"
  },
  {
    title: "Consultoría",
    description: "Asesoría técnica y arquitectura de software",
    icon: "consulting"
  }
];

// Testimonios (opcional - para cuando tengas)
export const testimonials = [
  // {
  //   name: "Cliente/Colega",
  //   role: "Cargo",
  //   company: "Empresa",
  //   text: "Testimonio sobre tu trabajo...",
  //   avatar: "/path/to/avatar.jpg"
  // }
];

// Redes sociales adicionales (opcional)
export const socialLinks = {
  github: "https://github.com/GnzaDev",
  linkedin: "https://linkedin.com/in/gonzalo-bustamante",
  twitter: "",
  portfolio: "https://portfolio.gnza.me",
  blog: ""
};

export const navLinks = [
  { href: '#about', label: 'SOBRE MÍ' },
  { href: '#skills', label: 'HABILIDADES' },
  { href: '#experience', label: 'EXPERIENCIA' },
  { href: '#projects', label: 'PROYECTOS' },
  { href: '#contact', label: 'CONTACTO' },
];
