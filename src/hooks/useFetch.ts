import { useEffect, useState } from 'react';

const useFetch = <T = any>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;
        async function fecthData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: T = await response.json();
                setData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(`Fetch error: ${error}`);
                }
            } finally {
                setLoading(false);
            }
        }

        fecthData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
