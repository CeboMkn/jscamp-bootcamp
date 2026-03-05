import { useEffect, useState } from 'react'
import { showToast } from '../global/toast/toast'

export function useFetchDetails(jobId) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    async function fetchJobDetails() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)

        if (!res.ok) {
          throw new Error('Error al obtener los detalles del empleo')
        }

        const data = await res.json()
        setJob(data)

      } catch (err) {

        setError(err.message)
        showToast('Error al obtener los detalles del empleo', 'error')

      } finally {
        
        setLoading(false)
      }
    }
    fetchJobDetails()
  }, [jobId])

  return { job, loading, error }
}
