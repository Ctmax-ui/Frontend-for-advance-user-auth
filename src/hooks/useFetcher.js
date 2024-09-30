import { useEffect, useState } from 'react';

const useFetcher = (url, method, body, dependec) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, SetFetchedData] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (url !== null) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                            'Content-Type': 'application/json' // Ensure the correct content type for the body
                        },
                        body: JSON.stringify(body) // Convert body to JSON
                    });
                    const result = await response.json();
                    SetFetchedData(result);
                } catch (err) {
                    setErr(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [url, dependec]);

    return { isLoading, fetchedData, SetFetchedData, err };
};

export default useFetcher; // Make sure this is the last line in the file
