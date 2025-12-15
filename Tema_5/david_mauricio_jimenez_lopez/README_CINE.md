# Diseño y Herramientas

El diseño inicial de esta aplicación fue conceptualizado utilizando **Stitch de Google** (https://stitch.withgoogle.com/), una herramienta de IA para la generación de interfaces web.

## Prompt Utilizado para el Diseño

```
Objetivo: Generar el código HTML y CSS (y si es necesario, JavaScript para 
interactividad básica) para la página principal de la sección de películas 
de un cine, basándose en la identidad de "Cine Colombia".

1. Estructura General y Estilo
   - Estilo: Utiliza un diseño moderno, limpio y responsive (adaptable a 
     móvil y escritorio). El esquema de color debe evocar la estética de 
     un cine (ej. tonos oscuros, rojos, dorados o azules profundos).
   - Tecnologías: Genera el resultado preferiblemente en HTML5, CSS3 y 
     JavaScript vanilla si es necesario.

2. Componentes Fijos (Layout)

   A. Header (Encabezado)
      - Contenido: Debe ser un menú de navegación principal y fijo en la 
        parte superior.
      - Enlaces: Incluye los siguientes 4 enlaces con una separación clara 
        (usar # como destino):
        * Peliculas (Debe estar resaltado como la página actual).
        * Cine Alternativo
        * Comidas
        * Ventas Corporativas
   
   B. Footer (Pie de Página)
      - Contenido: Un pie de página oscuro y ancho.
      - Texto Legal/Enlaces: Debe contener el siguiente texto dividido en 
        secciones claras:
        * @2025 Cine Colombia Todos los derechos reservados
        * Información Legal
        * Acerca de Cineco
        * Contáctenos
        * PQRS
        * Preguntas Frecuentes

3. Vista Principal (MovieList)
   - Diseño: Genera una galería o lista de al menos tres películas en 
     formato de tarjeta (MovieCard). La lista debe ser fácil de navegar 
     y estar centrada en la pantalla.
   
   - Estructura de cada Tarjeta de Película (MovieCard):
     Cada tarjeta debe ser visualmente atractiva y contener la siguiente 
     información:
     * Título: Un título de película ficticio y claro (ej: "Misión Secreta").
     * Imagen: Una imagen placeholder de alta calidad o una URL de Internet 
       que simule el póster de la película.
     * Sinopsis: Una breve sinopsis de dos o tres líneas.
     * Duración: (Ej: "120 min").
     * Género: (Ej: "Ficción / Acción").
     * Puntuación: Una calificación visual (ej: Estrellas o un número, 
       como "4.5 / 5").
     * Botón de Acción: Un botón prominente al pie de la tarjeta que diga 
       "Seleccionar Asientos".
     * Requisito Funcional: Este botón debe ser puramente visual y no tener 
       efecto (sin onclick ni enlace funcional) por el momento.
```
