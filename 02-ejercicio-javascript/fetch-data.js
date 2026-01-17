/* Aquí va la lógica para mostrar los resultados de búsqueda */
import { renderJobs } from "./filters.js";

export let containers_resultados
export let allJobs = {}
export async function getJobs() {
    await fetch("./data.json")

        .then(res => res.json())
        .then(jobs => {
            allJobs = jobs
            renderJobs()
        });

    containers_resultados = document.querySelectorAll('.res_busqueda')
}


