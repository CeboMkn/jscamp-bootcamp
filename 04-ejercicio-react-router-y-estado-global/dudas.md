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

A la hora de insertar el texto en la página de detalles me he ayudado de chatgpt para convertir el texto que viene de la petición para poder implementarlo
en mi html, no se si será una buen práctica como lo he realizado, ya que he tenido problemas para instalar y ejecutar snarkdown esta la función en useParseJob.js, 
lo tengo todo explicado en ese archivo, se que con eso solo sirve para esta peticion en concreto, si algo cambia en la peticion no lo haría bien, porque me gustaria
mantener los estilos que tengo aplicados con el svg y todo, a ver si me puedes ayudar con esto.
Tambien he cambiado las extensiones de los archivos que no tenian nada de html de jsx a solo js, creo que esta bien. 

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

Increible el añadir los path dinámicamente en en Router con un set, te ahorra muchisimo trabajo.

Tambien he añadido el archivo config.js, nose si es así como me lo comentabas, de momento solo esta esa constante de resultados por página
aunque me gustaria que tambien se pudiera cambiar con un select en la página Search con un mínimo y un máximo para que el usuario pueda elegir
cuantos resultados por página quiere ver, nose si teniendolo en el config esa parte tambien es viable, o incluso he llegado a pensar en añadir
los filtros en el config pero no me convence, a ver si puedes resolver mis dudas. También me surge la duda de como hacer para que si son
muchisimas páginas en el nav, por ejemplo 30 porque hay muchisimos trabajo,  muchisimas gracias por todo :)



Por lo demas he realizado el ejercicio de rutas con lazy, usar Navlink en el header, botón de inicio de sesión, estado global con zustand y los store.
Tambien al iniciar sesión he implementado la página de Login lo más parecido a como viene en stitch, tambien está la página de registro pero esta tiene unos estilos
básicos. 

Tambien he intentado contactar con vosotros por correo pero me salen devueltos, tengo alguna duda con el repo, no se ha actualizado el readme que lleva el check de los ejercicios que llevo realizados, esque creo que e visto a otros alumnos que sí que lo tienen actualizado, y tenia otra duda, cada vez qeu se completa un ejercicio hay que hacer un pr a main para ir montando la aplicación final a main? 

Muchas gracias.
