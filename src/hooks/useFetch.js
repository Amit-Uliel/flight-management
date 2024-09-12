import { useEffect, useState } from "react";

// hook to fetch data from the database
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.message || 'לא הצליח לייבא נתונים');
                }

                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

        }

        fetchData();
    }, [url]);

    return { data , isLoading, error };
}

export default useFetch;