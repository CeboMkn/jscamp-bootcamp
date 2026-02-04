import { useState } from 'react';
import { useFetchJobs } from './useFetchJobs';

export const useFilters = (RESULTS_PER_PAGE) => {


    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setToFilters] = useState(() => {
        
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
    })

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    useFetchJobs(setJobs, setTotal, setLoading, currentPage, filters, RESULTS_PER_PAGE)

    const handleFilters = (filtersAdd) => {
        setToFilters(filtersAdd)
        setCurrentPage(1)
    }

    return {
        loading,
        filters,
        currentPage,
        setCurrentPage,
        jobs,
        total,
        totalPages,
        handleFilters

    }
}