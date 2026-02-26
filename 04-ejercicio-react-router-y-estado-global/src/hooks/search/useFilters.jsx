import { useState } from 'react';
import { useFetchJobs } from './useFetchJobs';
import { DEFAULT_FILTERS } from '../../config';

export const useFilters = () => {
    const resultsPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setToFilters] = useState(getInitialFilters()) // Podemos extraer la lógica de la inicialización de los filtros en una función para que no se vea tan cargado el hook y que sea más fácil de leer

    const { jobs, loading, total } = useFetchJobs(currentPage, filters, resultsPerPage)

    const totalPages = Math.ceil(total / resultsPerPage)

    const handleFilters = (filtersAdd) => {
        setToFilters(filtersAdd)
        setCurrentPage(1)
    }

    /* Siempre evitemos devovler setters, lo que podemos hacer es crear una función agregando limitantes al comportamiento que queremos que tenga */
    const handleSetCurrentPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return
        setCurrentPage(page)
    }

    return {
        loading,
        filters,
        currentPage,
        handleSetCurrentPage,
        jobs,
        total,
        totalPages,
        handleFilters

    }
}

const getInitialFilters = () => {
    const readUrl = new URLSearchParams(window.location.search)
    if (readUrl.size > 2) {
        return {
            search: readUrl.get('text') || '',
            tecnologia: readUrl.get('technology') || '',
            ubicacion: readUrl.get('type') || '',
            nivel: readUrl.get('level') || ''
        }
    }

    const saved = localStorage.getItem('jobsFilters')
    if (!saved) {
        return {
            search: '',
            tecnologia: '',
            ubicacion: '',
            nivel: ''
        }
    }

    const params = new URLSearchParams(saved)
    return {
        search: params.get('text') || '',
        tecnologia: params.get('technology') || '',
        ubicacion: params.get('type') || '',
        nivel: params.get('level') || ''
    }
}