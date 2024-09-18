import { useEffect, useState } from "react";

// hook to fetch data from the database
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {

        if (!url) {
            setIsLoading(false);
            setStatus(null);
            setData(null);
            setError(null);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                setStatus(response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.message || 'לא הצליח לייבא נתונים');
                }

                const fetchedData = await response.json();
                setData(fetchedData);
                setError(null);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data , isLoading, error, status };
}

export default useFetch;