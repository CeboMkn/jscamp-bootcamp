import { useDocumentTitle } from "../global/useDocumentTitle"

function parseText(text) {

    /* Parseamos el texto en un array de strings separando por salto de línea, 
       quitamos las barras  */
    if (!text) return []
    return text
        .split('\n')
        .map(t => t.replace(/^- /, '').trim())
        .filter(Boolean)
}

export function useParseJob(job) {

    /* Una vez obtenemos el trabajo con la peción personalizamos el title de la página */
    useDocumentTitle(job ? `${job.empresa} | ${job?.titulo}` : "Cargando empleo")

    /* Si el trabajo no tiene contenido, retornamos arrays vacíos */
    if (!job?.content) {
        return { responsibilities: [], requirements: [] }
    }

    /* Pasamos los textos a arrays con una función personalizada segun como viene el texto */
    const responsibilities = parseText(job.content.responsibilities)
    const requirements = parseText(job.content.requirements)

    /* Retornamos los arrays parseados para poder insertarlos en el componente */
    return { responsibilities, requirements }
}