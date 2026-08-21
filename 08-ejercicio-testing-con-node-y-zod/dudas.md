<!-- Aquí puedes poner tus dudas del ejercicio -->

Holaa, me ha resultado un poco confuso hacer el ejercico, porque habia cosas que se explican en las siguientes clases, como el tema de los middleware, y calro yo hago los ejercicios pensando que tengo todos los conocimientos necesariso para hacerlos en el punto en el que estoy del curso, pero creo que al final esta todo bien, ya ví las siguientes lecciones. Gracias :)

**Respuesta:** Hola! Gracias por avisarnos, la verdad que no caímos en eso cuando programamos el ejercicio. Y genial que lo hayas podido implementar!

<!-- AÑADIDO A LA CORRECCIÓN -->

Hola, me gustó mucho lo de añadir const json = await res.json(). De hecho, cambié GET para que solo devuelva json, ya que siempre tiene body, y POST igual. A PUT, PATCH y DELETE los dejé devolviendo solo res, porque devuelven 204 y no tienen body (aunque en 404 sí lo tienen, en los tests solo verifico el status). No sé si para futuros tests sería buena práctica que todos devolvieran siempre res y json, pero no le veo mucho sentido, así que lo dejé así.

Me centré en hacerlo todo como enseña en los ejercicios, no tuve ese pensamiento lateral de crear los helpers, fallo mio, aprendí mucho en este ejercicio muchas gracias :)