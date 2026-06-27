# Sistema de Diseño e Interacciones (Portfolio v2)

Este documento detalla la estructura visual, arquitectónica y las interacciones programadas que componen este portfolio Frontend. Está construido bajo una filosofía de **Brutalismo Minimalista**, priorizando la tipografía extrema, el contraste puro y el deleite táctil mediante micro-interacciones a 60fps.

---

## 🎨 1. Estética y Sistema Visual

### Colores (Modo Oscuro Nativo)
El sitio emplea una paleta monocromática estricta para reducir el ruido cognitivo y dejar que el trabajo (y el código) hablen por sí mismos.
- **Fondo Primario (`--bg`)**: `#0a0a0a` (Negro casi puro, evita la fatiga visual del #000).
- **Texto Principal (`--text`)**: `#ffffff` (Blanco puro para contraste máximo).
- **Texto Secundario (`--text-secondary`)**: `#a1a1aa` (Gris para jerarquía menor).
- **Texto Muted (`--text-muted`)**: `#71717a` (Gris profundo para metadatos o etiquetas).
- **Bordes (`--border-color`)**: `#27272a` (Sutil separación de secciones).

### Tipografía Dual
- **Headings (`font-heading`)**: *Inter* (en pesos Black y Bold). Escala masivamente usando la función CSS `clamp()` para ser impactante en Desktop y no desbordar en Mobile. Letras hiper-ajustadas (`tracking-tighter`).
- **Cuerpo (`font-body`)**: *Inter*. Alta legibilidad, márgenes respirables y leading amplio.
- **Detalles (`font-mono`)**: *Familia Monospace*. Utilizada exclusivamente para etiquetas técnicas, números de sección y botones ("Stack", "01", "Ver Código"). Le da un toque crudo de ingeniería.

### Interfaz Transparente
- **Scrollbars Aniquilados**: Las barras nativas del navegador están ocultas vía CSS en todos los dispositivos.
- **Selección de Texto Invertida**: Resaltar el texto invierte sus colores automáticamente (`selection:bg-[var(--text)] selection:text-[var(--bg)]`).

---

## ⚡ 2. Motor de Animación (GSAP & Lenis)

Todo el sitio corre sobre **GSAP 3** con el plugin `ScrollTrigger`, asegurando animaciones optimizadas por hardware que reaccionan al Scroll. Esto se complementa con **Lenis** para sobreescribir la fricción nativa del ratón y crear un desplazamiento suave como mantequilla.

### Animaciones Core
1. **Fluid Smooth Scroll (Lenis)**: Intercepta el scroll de la rueda del ratón y le añade una física de inercia suave para dar sensación premium (Componente `SmoothScroll.tsx`).
2. **View Transitions API**: Implementado nativamente. En la navegación entre páginas futuras, el DOM hace cross-fade gestionado por el navegador en lugar de recargar de golpe.
3. **Background Shader Asimétrico**: Un gradiente radial CSS (`radial-gradient`) masivo y desenfocado (`blur-[120px]`) atado a una animación infinita asimétrica. Se mueve sutilmente por el fondo dando la ilusión de volumen volumétrico (Componente `BackgroundShader.tsx`).

---

## 🎮 3. Interacciones Específicas por Sección

### Hero Section (Portada)
- **Proximity Rubber-Band (El Imán de Letras)**: El título "GONZALO" está cortado letra por letra usando `SplitText`. Al mover el ratón (`mousemove`), el código calcula la distancia pitagórica entre el cursor y cada letra. Las letras debajo del ratón **se estiran verticalmente (ScaleY 1.6)** y se vuelven nítidas. Las letras lejanas se **desenfocan dinámicamente (`filter: blur`)** y se reducen. Todo orquestado por `gsap.utils.mapRange`. *Desactivado inteligentemente en móviles para evitar bugs táctiles.*
- **Efecto Scramble (Decodificador Hacker)**: El subtítulo de la carrera se revela como si estuviera siendo decodificado en tiempo real (Componente `ScrambleText.tsx`).
- **Parallax Negativo**: Al hacer scroll hacia abajo, el título completo desaparece y sube mucho más lento que el resto de la página (`scrub: 1`).

### About Section (Sobre Mí)
- **Scroll Scrubbing (Lectura Táctil)**: El párrafo principal no aparece de la nada. Usando `ScrollTrigger` atado al contenedor, la opacidad de las palabras individuales está ligada milimétricamente a la rueda del ratón. Al bajar, el texto se "pinta" de blanco; al subir, se borra (Componente `ScrubText.tsx`).

### Projects Section (Proyectos)
- **Sticky Blur Reveal (Paginación de Cartas)**: El contenedor principal tiene `position: sticky`. Cuando bajas a un proyecto nuevo, este se sobrepone al anterior. Mientras el proyecto anterior queda atrás, sufre un oscurecimiento y un **desenfoque progresivo** (`scale(0.95)`, `blur(4px)`). Se siente como apartar carpetas en un escritorio 3D de cristal.
- **Magnetic Buttons**: Los botones de "Ver Demo" o "Ver Código" detectan el cursor. Si te acercas, el botón "salta" atraído magnéticamente hacia tu ratón en un radio corto (Componente `MagneticButton.tsx`).

### Footer / Contact Section
- **Curtain Reveal (Efecto Telón)**: El Main general tiene un margen inferior de `100vh`. El Footer está fijado (`fixed`) detrás de la página. Al llegar al final del scroll, parece que levantas la página web como una alfombra para revelar los enlaces de contacto escondidos debajo.
- **Reloj Local en Vivo**: Un pequeño reloj Monospace inyectado que calcula la hora local exacta del huso horario del autor (`es-CL`) a 60 fps (Componente `LocalTime.tsx`).

---

## 📱 4. Responsive & Performance

- **Zero-Layout Shift**: Los textos escalables con `clamp` evitan que en dispositivos móviles las palabras se corten, manteniendo siempre el diseño geométrico intacto.
- **Performance**: Todos los desenfoques, transformaciones y escalados actúan exclusivamente sobre propiedades CSS aceleradas por la GPU (`transform`, `opacity`, `filter`). Se evitan mutaciones costosas del DOM (como cambiar width, height o top/left).
- **Media Queries Hardware**: El código previene animaciones de *Hover/Mousemove* en pantallas táctiles (`@media (hover: none)`) para entregar FPS limpios al hacer Swipe.
