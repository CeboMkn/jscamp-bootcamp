import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { DEFAULT_FILTERS } from "../../config.js";
import { saveFilters } from "./saveFiltersLocalStorage.js"
import { showToast } from "../global/toast/toast.js";

/* 
Siempre hay que evitar pasar setters a los custom hooks, eso los hace muy dependientes de otro hook o estado.
Si vemos `useFilters`, ese hook estaba creando los estados de jobs, total y loading, pero sus setters SOLO se usaban en el `useFetchJobs`. 
Esto nos da una pauta de que podemos extraer esos estados de `useFilters` y que `useFetchJobs` se encargue de pedir los datos y de actualizar los estados.
Ahora el hook no recibe setters y además devuelve la data que queremos.
Esto lo hace más limpio y más fácil de usar.
*/
export function useFetchJobs(currentPage, filters) {
    const resultPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        async function fetchJobs() {
            /* const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)) */
            try {
                setLoading(true)

                /* await sleep(500) */
                const urlParams = new URLSearchParams()
                if (filters.search) urlParams.append('text', filters.search)
                if (filters.tecnologia) urlParams.append('technology', filters.tecnologia)
                if (filters.ubicacion) urlParams.append('type', filters.ubicacion)
                if (filters.nivel) urlParams.append('level', filters.nivel)

                const apiParams = new URLSearchParams(urlParams)
                apiParams.append('limit', resultPerPage)
                const offset = (currentPage - 1) * resultPerPage
                apiParams.append('offset', offset)

                const queryParams = apiParams.toString()
                const name = 'jobsFilters'
                setSearchParams(urlParams, { replace: true })
                saveFilters(name, queryParams)

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)

                }

                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)

            } catch (error) {
                showToast('Error al pedir los trabajos', 'error')
                console.log('Error al pedir los trabajos')

            } finally {

                setLoading(false)
            }
        }
        fetchJobs()
    }, [filters, currentPage])

    return {
        jobs, total, loading
    }
}