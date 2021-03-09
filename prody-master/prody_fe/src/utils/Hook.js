import {useEffect, useState} from "react";

// params structure: {url, header, method, body, dep1, dep2}
export const useFetch = (params) => {
    // console.log(`method ${JSON.stringify(params)}`);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (!params.dep1) {return () => null;}
        setLoading(true);
        fetch(params.url, {
            headers: params.header,
            method: params.method,
            body: params.body
        })
            .then(response => response.json())
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch(() => {setError(true)})
    }, [params.url, params.dep1, params.dep2]);
    return {data, loading, error};
};