Hola, este ejercicio se me ha hecho más complicado, ya que no pude seguir las pautas que me dabais, ya que mi app en el search no tiene ese rol de searchbox (como le pasa a Midu en el vídeo), y para no romper la estética lo hice buscándolo en su placeholder, también tuve que buscar por clases CSS como en .title_job, y guardar páginas ya que el login redirige a una página dedicada al login, no hace login solo con pulsar en el header, pero creo que lo resolví, y los test pasan. Tampoco tengo un botón siguiente, así que lo hice buscando el link para ir a la página número 2 y buscando si había pasado de página con (await expect(page.getByText(/Mostrando 4 - 6 de/)).toBeVisible()). No sé si me he complicado demasiado y debería de haber cambiado la app para hacerlo exacto.

---

**Respuesta:** Hola! Si, aquí habían diferentes caminos:
Adaptar el test para que funcionen con la app actual
Modificar la app para que funcionen con los tests

Nosotros en la corrección elegimos el segundo camino, por lo siguiente:
Cuando aplicamos tests a una aplicación, lo interesante no es solo que funcione, sino darnos cuenta de que carencias de accesibilidad o usabilidad tiene. En este caso, como no habían ciertos elementos definidos de la mejor manera a nivel de accesibilidad, hemos tenido que adaptar la aplicación para que los tests pasen.