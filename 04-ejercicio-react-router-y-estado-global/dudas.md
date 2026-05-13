# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->



## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->

## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->


Hola :) aquí las implementaciones de estos ejercicio que he realizado

He completado todos los ejercicios con algunas personalizaciones propias, he creado la página de detalles con los botones de aplicar más un botón que 
añade a favoritos con un corazón, supongo que se entiende, he investigado zustand y he encontrado persistant, para guardar los datos en el localstorage
se guarda si el trbajo esta aplicado o no, si es favorito o no, mas si está la sesión iniciada o no, supongo que la sesión deberia de tener un tiempo límite
pero eso no lo he implementado.

**Respuesta:**
Genial! Muy bien implementado, la función de `localStorage` de zustand es increíble y muy fácil de manejar. Te felicito por hacerlo! Sobre la persistencia, no te preocupes que no se suele guardar la sesión ahí.

---

A la hora de insertar el texto en la página de detalles me he ayudado de chatgpt para convertir el texto que viene de la petición para poder implementarlo
en mi html, no se si será una buen práctica como lo he realizado, ya que he tenido problemas para instalar y ejecutar snarkdown esta la función en useParseJob.js, 
lo tengo todo explicado en ese archivo, se que con eso solo sirve para esta peticion en concreto, si algo cambia en la peticion no lo haría bien, porque me gustaria
mantener los estilos que tengo aplicados con el svg y todo, a ver si me puedes ayudar con esto.

**Respuesta:**
Bien, en el archivo `DetailJob.jsx` tienes la función `DetailJobSection` que usa `snarkdown` para convertir el markdown a HTML. Ahí puedes ver como está implementado con el uso de la librería. Para los estilos, puedes hacer esto:

```jsx
import styles from './DetailJob.module.css';

function DetailJobSection({ title, content }) {
  const htmlContent = snarkdown(content);

  return (
    <section className={styles.detailJobSection}>
      <h2>{title}</h2>
      <div
        className={`prose`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}

```

Y en tu `DetailJob.module.css` podes agregar los estilos que necesites para el section y el h2.

```css
.detailJobSection {
  /* tus estilos aquí */
}

.detailJobSection h2 {
  /* tus estilos aquí */
}

.detailJobSection ul {
  /* tus estilos aquí */
}

.detailJobSection li {
  /* tus estilos aquí */
}

/* etc. */
```

De esta manera vas a estilar todo lo que esté dentro de `dangerouslySetInnerHTML`.

---

Tambien he cambiado las extensiones de los archivos que no tenian nada de html de jsx a solo js, creo que esta bien. 

**Respuesta:**
Excelente! Está muy bien :)

---

En el ejercicio anterior inclui algunas notaciones con correciones que me dieron en el feedback, y lo mande a revisión pero no veo respuesta en algunas preguntas
que hize, seguramente soy yo que no las encuentro pero escribí esto: 

Hola, lo primero muchas gracias por tus palabras, me animan muchismo ^^
He realizado los cambios que me comentas

Grácias al comentario de no pasar setters en useFilters.jsx me dio una idea para mejorar en manejo de cambio de páginas en el nav,
ahora solo con un handle en Pagination.jsx manejo el cambio con las flechas al pulsar los números y me he ahorrado un montón de líneas, que soy 
un poco esquisito con eso, intento invertir el máximo tiempo en la refactorización del código para que con las mínimas líneas se 
haga el comportamiento que necesito.

También he conseguido hacer en Toast, creo que lo he realizado bien, he añadido el componente <ToastContainer/> en app.jsx, entonces está en cualquier página
y simplemente con que lo llames cuando lo necesites y le pases el mensaje funciona, gracias por tus consejos, lo he implementado en useFetchJobs.jsx
y a la hora de rellenar el formulario en Contact.jsx, segun el estado de enviado o error

**Respuesta:**
Sii lo vi y quedó genial! Te felicito porque ha estado muy bien implementado, y gracias por avisarme, ahí revise tus comentarios y estos.

---

Increible el añadir los path dinámicamente en en Router con un set, te ahorra muchisimo trabajo.

Tambien he añadido el archivo config.js, nose si es así como me lo comentabas, de momento solo esta esa constante de resultados por página
aunque me gustaria que tambien se pudiera cambiar con un select en la página Search con un mínimo y un máximo para que el usuario pueda elegir
cuantos resultados por página quiere ver, nose si teniendolo en el config esa parte tambien es viable, o incluso he llegado a pensar en añadir
los filtros en el config pero no me convence, a ver si puedes resolver mis dudas. También me surge la duda de como hacer para que si son
muchisimas páginas en el nav, por ejemplo 30 porque hay muchisimos trabajo,  muchisimas gracias por todo :)

---

**Respuesta:**
En config.js está bien implementar todo lo que sea configuración global del app, como por ejemplo los resultados por página, hasta los filtros si queres: los valores por defecto de los filtros, el mínimo y máximo de elementos a mostrar por página, etc.

Una cosa que podes hacer cuando las páginas son muchas es tener un rango de +5 y -5 respecto a la página actual, por ejemplo si estás en la página 10, mostrar las páginas 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Y luego botones que te lleven a la primera página y a la última página.

---

Por lo demas he realizado el ejercicio de rutas con lazy, usar Navlink en el header, botón de inicio de sesión, estado global con zustand y los store.
Tambien al iniciar sesión he implementado la página de Login lo más parecido a como viene en stitch, tambien está la página de registro pero esta tiene unos estilos
básicos. 

**Respuesta:**
Te quedó muy bien! En el ejercicio anterior ya los había probado y quede muy contento con el resultado :)
---

Tambien he intentado contactar con vosotros por correo pero me salen devueltos, tengo alguna duda con el repo, no se ha actualizado el readme que lleva el check de los ejercicios que llevo realizados, esque creo que e visto a otros alumnos que sí que lo tienen actualizado, y tenia otra duda, cada vez qeu se completa un ejercicio hay que hacer un pr a main para ir montando la aplicación final a main? 

Muchas gracias.

**Respuesta:**
Lo de los correos, ya hemos hablado pero siempre me puedes escribir por mail a mi `hi@madeval.dev`, o por Discord `madeval`.
Sobre tu duda de los ejercicios, sip! Cada vez que completes un ejercicio con nuestro feedback, esta bueno que lo subas a main así queda todo actualizado.
El formato sería así:
- tus ramas **primer-ejercicio**, **segundo-ejercicio**, **tercer-ejercicio**, etc. con los ejercicios.
- tus ramas **correccion-primer-ejercicio**, **correccion-segundo-ejercicio**, **correccion-tercer-ejercicio**, etc. con los cambios que hayamos hecho después del feedback
- tu rama **main** tendría las PRs de las ramas **correccion-***.

Los checks del readme no te preocupes, lo hemos hecho a mano y la verdad, me he olvidado de actualizarlo en unos cuantos repos, lo iré haciendo poco a poco.