# Portafolio de Alejandro Parra

Portafolio personal de Alejandro Parra, estudiante de Ingeniería de Software. Reúne perfil, proyectos, experiencia, habilidades y contacto en un sitio bilingüe con dos formas de recorrerlo: una página clásica y un escritorio retro interactivo.

**Despliegue:** https://mi-portafolio-rust-pi.vercel.app/

## Tecnologías

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [motion](https://motion.dev) para las animaciones
- Publicación en [Vercel](https://vercel.com)

## Características

- **Modo plano:** página con las secciones Acerca de mí, Proyectos, Testimonios, Experiencia, Mi lado personal, Habilidades y Contacto, con menú fijo, scroll suave y diseño adaptable a móvil, tablet y escritorio.
- **Escritorio retro:** modo opcional para pantallas de escritorio con ratón, con ventanas arrastrables, barra de tareas y una vista compacta de cada sección. Se activa con el botón "Encender PC" y se apaga desde la barra de tareas.
- **Demos en video:** las demos de LULLABY, Vision2Code, ZeroWaste Eats y LuminaWear se presentan en video porque son apps de Godot, Android y escritorio que no se pueden abrir en el navegador. Ganadería 4.0 sí tiene demo en vivo.
- **Asistente Mullis:** gata asistente del escritorio retro que responde preguntas sobre el portafolio. Si el servicio de IA no está disponible, usa respuestas de ejemplo.
- **Bilingüe:** todos los textos están en español e inglés y se cambian desde la barra superior.
- **Modo claro y oscuro:** la preferencia se guarda en el navegador.
- **Accesibilidad:** navegación por teclado, foco visible, etiquetas accesibles y respeto de la preferencia de movimiento reducido.

## Cómo ejecutarlo en local

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Sirve la versión de producción generada |
| `npm run lint` | Revisa el código con ESLint |
| `npx tsc --noEmit` | Comprueba los tipos de TypeScript |

## Variables de entorno

Se definen en un archivo `.env.local` (no se sube al repositorio). En `.env.example` hay una plantilla con los nombres, sin valores.

| Variable | Para qué sirve |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Dirección del servicio que recibe los mensajes del formulario de contacto (por ejemplo, un servicio de formularios). Se publica en el navegador. Si falta, el formulario muestra un aviso y el envío queda desactivado. |
| `AI_API_KEY` | Clave de la API de IA que usa el chat de Mullis. Solo se lee en el servidor y nunca debe llevar el prefijo `NEXT_PUBLIC`. Si falta, el chat responde con textos de ejemplo. |
| `AI_MODEL` | Modelo de IA que usa el chat. Es opcional: si está vacío se usa el modelo por defecto definido en `lib/ai.ts`. |
| `ELEVENLABS_API_KEY` | Clave del servicio de voz (ElevenLabs) con el que Mullis puede leer sus respuestas. Solo se lee en el servidor. La voz es opcional y está apagada por defecto. |
| `ELEVENLABS_VOICE_ID` | Identificador de la voz que se usa para Mullis. Solo servidor. Sin él, la voz no funciona. |
| `NEXT_PUBLIC_MULLIS_VOICE` | Con el valor `1` se muestra el botón de voz y se habilita `/api/mullis-voice`. Si está vacía, la voz queda apagada. Se publica en el navegador. |

## Estructura de carpetas

```text
app/                  Rutas de Next.js, estilos globales y las APIs: chat (app/api/chat) y voz de Mullis (app/api/mullis-voice)
components/
  sections/           Un componente por sección del modo plano
  retro/              Escritorio retro: ventanas, barra de tareas y Mullis
  retro/windows/      Contenido de cada ventana del escritorio retro
data/                 Contenido tipado y bilingüe (es/en); los tipos están en data/types.ts
lib/                  Utilidades: asistente, llamada a la IA, límite de uso y hooks
public/               Imágenes y archivos estáticos
```

El contenido del sitio vive en `data/`: para cambiar un texto, una fecha o un proyecto basta con editar el archivo correspondiente, sin tocar los componentes.
