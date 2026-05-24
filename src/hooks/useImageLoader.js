import { useState, useEffect } from 'react'

export function useImageLoader(urls) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!urls?.length) {
      setLoaded(true)
      return
    }

    let cancelled = false
    setLoaded(false)
    setError(null)

    const load = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = () => reject(new Error(`Failed to load: ${url}`))
        img.src = url
      })

    Promise.all(urls.map(load))
      .then(() => {
        if (!cancelled) setLoaded(true)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoaded(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [urls.join('|')])

  return { loaded, error }
}
