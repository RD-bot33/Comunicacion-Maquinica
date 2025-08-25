# Cómo Añadir una Nueva Entrada al Blog

Este documento explica el proceso para añadir una nueva entrada al blog del sitio "Comunicación Maquínica". El sistema está diseñado para ser sencillo, centralizando la gestión de los posts en un único archivo.

**No necesitas editar `index.html` para añadir un post.**

---

### Paso 1: Crear el Archivo HTML del Post

Primero, crea el archivo que contendrá tu artículo.

1.  En la carpeta principal del proyecto, puedes duplicar el archivo `plantilla-post.html` para tener una base.
2.  Renombra la copia con un nombre descriptivo, por ejemplo: `mi-nuevo-post.html`.
3.  Abre este nuevo archivo y edita el contenido (título, texto, etc.) a tu gusto.

---

### Paso 2: Añadir el Post a la Lista Maestra

El corazón del sistema es el archivo `script.js`, que contiene la lista de todas las entradas del blog.

1.  Abre el archivo `script.js`.
2.  Al principio del archivo, verás una lista (un array) llamada `posts`. Tiene este aspecto:

    ```javascript
    const posts = [
      {
        // ...datos de un post
      },
      {
        // ...datos de otro post
      }
    ];
    ```

3.  Para añadir tu nuevo post, simplemente agrega un nuevo objeto a esta lista. Copia y pega el siguiente bloque y rellena tus datos. Puedes añadirlo al principio o al final de la lista (dentro de los `[]`).

    **Plantilla para copiar:**
    ```javascript
    {
      href: "mi-nuevo-post.html", // El nombre de tu archivo HTML
      thumb_aria_label: "Descripción de la imagen para accesibilidad", // Describe la imagen/idea visual
      tag: "etiqueta", // Por ejemplo: campo, laboratorio, manifiesto
      title: "El Título de Tu Nuevo Post", // El título que aparecerá en la tarjeta
      description: "Un resumen corto y atractivo que se mostrará en la tarjeta del blog." // El texto del resumen
    },
    ```

---

### Paso 3: Verificar

1.  Guarda los cambios en `script.js`.
2.  Abre `index.html` en tu navegador (o recarga la página si ya estaba abierta).
3.  Tu nueva entrada de blog debería aparecer en la lista.

¡Listo! Has añadido un nuevo post al sistema.
