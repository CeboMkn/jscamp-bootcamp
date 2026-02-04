import { useEffect, useRef, useState } from "react"

export const useInfoFilters = ({ onFilters, filters }) => {
    const [searchUI, setSearchUI] = useState(filters.search || "")
    const debounceRef = useRef(null)

    useEffect(() => {
        setSearchUI(filters.search || "")
    }, [filters.search])

    const handleInfoForm = (e) => {

        const { name, value } = e.target

        if (name === 'search') {
            setSearchUI(value)

            clearTimeout(debounceRef.current)

            debounceRef.current = setTimeout(() => {
                onFilters(prev => ({
                    ...prev,
                    search: value
                }))
            }, 500)

            return
        }

        onFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDellFilters = () => {
        clearTimeout(debounceRef.current)
        setSearchUI("")

        onFilters({
            search: '',
            tecnologia: '',
            ubicacion: '',
            tipo: '',
            nivel: ''
        })
    }

    return { handleInfoForm, handleDellFilters, searchUI }
}