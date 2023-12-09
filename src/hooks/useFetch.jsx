import { useEffect, useState } from "react"

const useFetch = ({url, method}) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok) throw new Error("Response Failed")
            return res.json()
        })
        .then(data => setResponse(data))
        .catch(err => setError(err))
        .finally(() => setLoading(false))

        return () => {
            setError(null)
            setResponse(null)
            setLoading(false)
        }
    }, [url, method])

    return {response, loading, error}
}

export default useFetch