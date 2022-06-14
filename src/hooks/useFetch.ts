import { useEffect, useState, DependencyList } from 'react';

const useFetch = <T>(url: string, dependencyList?: DependencyList): {data: T | undefined, loading: boolean, error: any} => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  //* fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await fetch(url)

        if (res.status === 402) setError(true)

        const resData = await res.json()
        setData(resData)

      } catch (err: any) {
        setError(err)

      } finally {
        setLoading(false)
      }
    }

    url && fetchData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList ? [...dependencyList, url] : [url])

  return {data, loading, error}
}

export default useFetch