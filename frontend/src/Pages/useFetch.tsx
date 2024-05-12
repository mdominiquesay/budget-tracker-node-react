import { useState, useEffect } from "react";

interface FetchData {
    fetchedData: any; // Adjust the type as per your data structure
    loading: boolean;
    error: any; // Adjust the type as per your error structure
}

const useFetch = (route: string, param: string): FetchData => {
    const [fetchedData, setData] = useState<any>(null); // Adjust the type as per your data structure
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null); // Adjust the type as per your error structure

    useEffect(() => {
        if (route ) {
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${param}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [route, param]);

    return { fetchedData, loading, error };
};

export default useFetch;
