// Portfolio Data - Cambia aquí tu información personal

export const personalInfo = {
  name: "GONZALO",
  title: "ESTUDIANTE DE INGENIERÍA INFORMÁTICA",
  subtitle: "DESARROLLADOR DE SOFTWARE",
  tagline: "Construyendo el futuro, una línea de código a la vez",
  email: "bustamantegonzalo208@gmail.com",
  github: "https://github.com/GnzaDev",
  githubUsername: "@GnzaDev",
  location: "Chile"
};

export const about = {
  description: `Egresado de Técnico Analista Programador (2023-2024).
Actualmente cursando 3° año de Ingeniería Informática en INACAP.
Apasionado por el desarrollo Frontend y las tecnologías modernas.
Explorando React Native y Expo para aplicaciones móviles.
Aprendiendo desarrollo Backend para ser un desarrollador full-stack.
Me encanta crear interfaces limpias y funcionales con Bootstrap, Tailwind y Next.js.
Abierto a nuevas oportunidades y retos.`,
  status: "SIEMPRE APRENDIENDO"
};


export const stats = [
  { label: "DEVELOPMENT", value: "1+ YEARS" },
  { label: "DATABASES", value: "SQL/NOSQL" },
  { label: "WEB STACK", value: "FULL STACK" },
  { label: "DEVOPS", value: "CI/CD" }
];

export const skills = [
  {
    category: "Front-End",
    skills: ["HTML5", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Back-End",
    skills: ["Firebase", "Supabase", "Node.js", "Python"]
  },
  {
    category: "Mobile",
    skills: ["React Native", "Expo"]
  },
];


export const education = [
  {
    degree: "Técnico Analista Programador",
    institution: "Instituto Profesional INACAP",
    period: "2023 - 2024",
    description: "Formación en programación, fundamentos de software y bases de datos."
  },
  {
    degree: "Ingeniería Informática (En curso — 3° año)",
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
    title: "ForumSpace",
    description: "Foro web desarrollado con Django y MySQL. Permite a los usuarios crear temas, responder, gestionar perfiles y explorar discusiones en una plataforma sencilla y funcional.",
    tech: ["Django", "MySQL", "Python", "HTML"],
    status: "ACTIVO",
    repo: "https://github.com/GnzaDev/ForumSpace-django-mysql"
  },
  {
    title: "StreamBot Discord",
    description: "Bot para Discord que permite gestionar y anunciar transmisiones en vivo de Twitch y YouTube en servidores de Discord. Incluye comandos personalizados y notificaciones automáticas.",
    tech: ["Node.js", "Discord.js", "JavaScript"],
    status: "ACTIVO",
    repo: "https://github.com/GnzaDev/StreamBotDiscord"
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
    title: "Título Profesional",
    description: "Ingeniero en Computación",
    year: "2024"
  }
  // Agrega más certificaciones aquí
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
  linkedin: "", // Agrega tu LinkedIn
  twitter: "",  // Agrega tu Twitter/X
  portfolio: "", // Otro portfolio si tienes
  blog: "" // Blog personal si tienes
};

export const navLinks = [
  { href: '#about-title', label: 'ABOUT' },
  { href: '#skills-title', label: 'SKILLS' },
  { href: '#experience-title', label: 'EXPERIENCE' },
  { href: '#projects-section', label: 'PROJECTS' },
  { href: '#connect-title', label: 'CONTACT' },
];
