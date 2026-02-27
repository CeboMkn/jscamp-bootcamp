import { useEffect, useState } from 'react'

export function useFetchDetails(jobId) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobId) return

    setLoading(true)
    setError(null)

    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then(res => {
        if (!res.ok) throw new Error('Job not found')
        return res.json()
      })
      .then(setJob)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [jobId])

  return { job, loading, error }
}
