# Documentación del Proyecto: Comunicación Maquínica

Este documento sirve como guía central para mantener la consistencia, estructura y estilo del proyecto. Su propósito es alinear el desarrollo futuro y evitar errores comunes.

---

## 1. Filosofía del Proyecto

"Comunicación Maquínica" es un prototipo de sitio web estático que funciona como un proyecto educativo experimental. Explora la intersección entre el lenguaje humano, el arte y la computación. La estética es deliberadamente "tech", oscura, con acentos de neón, evocando una terminal o una interfaz de ciencia ficción.

---

## 2. Estructura de Archivos Clave

-   `index.html`: La página principal. Actúa como el contenedor de las diferentes secciones (Home, Proyecto, Blog, Contacto).
-   `style.css`: La única hoja de estilos del proyecto. Contiene todas las reglas visuales, variables de color y media queries.
-   `script.js`: El cerebro dinámico del sitio. Gestiona la renderización del blog, el menú móvil y otras interacciones.
-   `post-*.html`: Archivos individuales para cada entrada del blog.
-   `plantilla-post.html`: Una plantilla base para crear nuevas entradas de blog.
-   `COMO_AÑADIR_POSTS.md`: Guía paso a paso para añadir nuevo contenido al blog.

---

## 3. Guía de Estilo (CSS)

La consistencia visual es clave.

-   **Variables de Color:** Todos los colores principales están definidos como variables CSS en `:root` al inicio de `style.css`. **Siempre** usa estas variables (ej. `color: var(--accent);`) en lugar de códigos de color hexadecimales para mantener la paleta unificada.
-   **Selectores Específicos:** Para evitar errores como el del "header pegajoso", **evita usar selectores de etiqueta genéricos** (como `header`, `p`, `article`) para estilos importantes. En su lugar, usa:
    -   **Clases:** Es el método preferido (ej. `.post-header`, `.card`).
    -   **Selectores de hijo directo:** `body > header` para apuntar a un elemento específico.
-   **Clases Estructurales:**
    -   `.container`: Centra el contenido y le da un ancho máximo.
    -   `.panel`: Un contenedor genérico con fondo y borde estilizado.
    -   `.card`: Para las tarjetas del blog.

---

## 4. Arquitectura JavaScript

El sitio, aunque estático, usa JavaScript para funcionalidades dinámicas.

-   **Blog Data-Driven:** El blog no está codificado en `index.html`. Se genera a partir de un array de objetos llamado `posts` al inicio de `script.js`.
-   **Objeto Post:** Cada objeto en el array `posts` debe tener la siguiente estructura:
    ```javascript
    {
      href: "url-del-post.html",
      thumb_aria_label: "Descripción de la imagen",
      tag: "etiqueta",
      title: "Título del Post",
      description: "Resumen para la tarjeta"
    }
    ```
-   **Renderizado:** La función `renderBlogPosts()` se encarga de leer el array y generar el HTML.
-   **Scripts Defensivos:** Las funciones deben, en la medida de lo posible, comprobar si un elemento existe antes de intentar manipularlo. Ejemplo de la función `toggleMenu()`:
    ```javascript
    const m = document.getElementById('mobile');
    if (m) { // Esta comprobación evita errores en páginas sin el menú
      // ...código...
    }
    ```

---

## 5. Gestión de Contenido

Para añadir nuevas entradas al blog, sigue **estrictamente** la guía en `COMO_AÑADIR_POSTS.md`. El proceso siempre es:
1.  Crear el nuevo archivo `.html` del post.
2.  Añadir el objeto correspondiente al array `posts` en `script.js`.

---

Adherirse a estas directrices asegurará que el proyecto crezca de forma coherente y estable.

---

## 6. Flujo de Trabajo Automatizado para Creación de Posts

Este apartado detalla el proceso optimizado para la creación y publicación de nuevas entradas de blog, diseñado para ser eficiente y mantener la integridad del proyecto. Este flujo está pensado para ser ejecutado con la asistencia de la IA (EsquizoAI).

### 6.1. Principios Clave

-   **Automatización:** Maximizar el uso de herramientas para reducir el esfuerzo manual y minimizar errores.
-   **Consistencia:** Asegurar que cada nuevo post y su contenido visual se adhieran a las convenciones de estilo y estructura del proyecto.
-   **Estabilidad:** Implementar cambios de forma que no rompan funcionalidades existentes ni el diseño del sitio.

### 6.2. Proceso Paso a Paso (Asistido por IA)

1.  **Inicio de la Idea:** El usuario proporciona el concepto central, el título provisional y cualquier texto inicial para el nuevo post. Puede ser un borrador, una idea vaga o un prompt detallado.
2.  **Generación de Prompt para Imagen:**
    -   La IA, basándose en el contenido del post y la guía de estilo visual del proyecto, creará un prompt optimizado para la generación de imágenes.
    -   **Guía de Estilo Visual (Reforzada):**
        -   **Estilo General:** Dibujo animado retro-cósmico-cyberpunk de los 90s/2000s.
        -   **Elementos Clave:** Computadoras CRT antiguas, pantallas negras con texto verde brillante (efecto "lluvia de Matrix" si aplica), teclados mecánicos, cables, neones.
        -   **Atmósfera:** Nostálgica, misteriosa, tecnológica, con toques de asombro o inquietud.
        -   **Composición:** Líneas definidas, colores contrastantes, cel-shading.
        -   **Texto en Imagen:** **Estrictamente prohibido** texto legible como palabras. Solo se permiten letras o binarios como elementos gráficos abstractos o "tokens" si el concepto del post lo requiere (ej. terminal, código).
        -   **Formato de Salida:** PNG.
3.  **Generación de la Imagen:**
    -   La IA utilizará el script `generate_image.py` con el prompt generado y un nombre de archivo descriptivo (ej. `slug-del-post-visual.png`).
    -   La imagen se guardará automáticamente en `manifestaciones_visuales/`.
4.  **Creación del Archivo HTML del Post:**
    -   La IA tomará la `plantilla-post.html`.
    -   Insertará el contenido proporcionado por el usuario (o generado por la IA) en el `div.post-body`.
    -   Añadirá la etiqueta `<img>` con la ruta de la imagen generada (`manifestaciones_visuales/slug-del-post-visual.png`) justo después del `<header class="post-header">` y antes del `div.post-body`, con la clase `post-header-image`.
    -   Actualizará el `<title>`, `<meta name="description">`, `<h1>`, `<span class="tag">` y `<p class="meta">` (fecha y autor) según la información del post.
    -   Guardará el nuevo archivo HTML con un nombre de archivo consistente (ej. `post-slug-del-post.html`).
5.  **Actualización de `script.js`:**
    -   La IA localizará el array `posts` en `script.js`.
    -   Añadirá un nuevo objeto al array con la estructura definida en la sección "4. Arquitectura JavaScript", incluyendo el `href` al nuevo archivo HTML y la propiedad `image` con la ruta de la imagen generada.
6.  **Verificación y Confirmación:**
    -   La IA confirmará al usuario que todos los pasos se han completado.
    -   Se recomienda al usuario verificar el nuevo post en el sitio web localmente.

### 6.3. Rol de la IA (EsquizoAI)

-   **Automatización:** Ejecutar los comandos de generación de imágenes, creación de archivos y modificación de scripts.
-   **Consistencia:** Asegurar la adherencia a las guías de estilo y convenciones de nomenclatura.
-   **Sugerencia:** Proponer prompts, estructuras de contenido y soluciones técnicas.
-   **Depuración:** Identificar y resolver problemas durante el proceso.

### 6.4. Rol del Usuario

-   **Iniciación:** Proporcionar la idea inicial y el contenido del post.
-   **Revisión:** Evaluar los prompts generados y las imágenes resultantes.
-   **Aprobación:** Dar el visto bueno para la ejecución de los pasos automatizados.
-   **Feedback:** Proporcionar retroalimentación para refinar el proceso y el estilo.

### 6.5. Mantenimiento de la Estabilidad

-   **Herramienta `replace`:** Siempre que sea posible, se utilizará la herramienta `replace` para modificar archivos existentes, garantizando cambios atómicos y controlados.
-   **Contexto:** Antes de cualquier modificación, la IA leerá el contexto relevante del archivo para asegurar que los cambios se integren de forma idiomática.
-   **Pruebas:** Aunque automatizadas, se recomienda una revisión manual del sitio después de cada adición importante.
