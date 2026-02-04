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

## Séptima parte

<!-- Dudas de la séptima parte del ejercicio -->

## Ejercicio extra

<!-- Dudas del ejercicio extra -->

 Hola :), he añadido varias cosas que he aprendido en el curso y algunas que he investigado por mi cuenta

    1.- Se puede buscar desde el input de la página de HOME
    2.- Se puede copiar una busqueda ya realizada copiando la URL de la página Empleos con los filtros aplicados
    3.- Añadido el botón para resetear los filtros que solo aparece cuando los filtros están aplicados
    4.- Aparte de mostrar los resultados en el title, debajo de la paginación de Empleos tambien se muestran
    5.- Los filtros se quedan guardados en el localstorage
    6.- A la hora de entrar en la página de emprleos primero se comprueba si:
        - En la url hay filtros
        - En el localstorage hay filtros
        - Si no hay filtros entonces los filtros vacíos
    7.- Añadido el spiner de carga
    8.- El color del texto cambia en el Header para saber en la página en la que se encuentra el usuario
    9.- He añadido una página de Contacto, donde hay un formulario, el formulario tiene manejo de errores básico
        - Comprueba si en los inputs hay texto antes de enviar, y en el de correo comprueba si es un correo con una comprobación
          básica que me dio mi colega ChatGpt (emailRegexp)
        - Solo deja enviar si todos están bien, si no, los campos se ponen en rojo y en verde dependiendo de si están bien o mal y 
          tiene un mensaje debajo de cada campo
        - Tiene validación en tiempo real, cuando rellenas un campo que estaba en rojo y cambias a otro se pone en verde para que el 
          usuario vea que ya está bien
        - No envia nada a ningun sitio solo tiene un retardo para que se vea el mensaje de enviando, y cambia a enviado cuando termina,
          tambien cambia el title según el estado del formulario
    10.- Lo que se me ha torcido un poco es el manejo de errores en el fetch y global, si que hay una página 404 cuando introduces una 
         URL que no existe, hay un helper con varios mensajes segun el tipo de error pero solo esta implementado el 404, y un error en consola
         si el fetch falla, me puse a implementar un toastr personal pero no me gustaba como quedaba el código, ya que chtgpt al cual le pregunto
         me daba mucha basura y se liaba mucho, supongo que react tendra algun hook para hacerlo más facil, empecé envolviendo la app con un customhook
         que tenia visibilidad o no segun un estado global de error, pero no se no me parecia buena práctica, lo mismo si, no lo sé, seguro que me podeis
         ayudar con eso
    11.- Copie el favicon de JSCamp, perdon por robarlo :) 
    
    No se si mi codigo es un lio o no, intenté organizarlo lo mejor posible por carpetas, no se si sobran o faltan, espero no darte mucho trabajo para
    saber donde esta cada cosa, a veces peco de organización de más y la gente se lia, nunca he estado en un proyecto conjunto y no se si es buena práctica
    o no organizarlo así, muchas gracias por todo estoy muy contento y he aprendido muchisimo hasta ahora con el curso, sois un equipazo :)
    
    Perdón, hize los cambios y los subí a main en vez de a una rama aparte