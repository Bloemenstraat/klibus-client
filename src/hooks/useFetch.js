import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setPending(false);
        });
    }, [url]);

    return {data, setData, isPending};
}
 
export default useFetch;