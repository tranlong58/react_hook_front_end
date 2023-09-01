import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    async function fetchData() {
        let res = await axios.get(url);
        let data_fetch = res.data;

        setData(data_fetch);
    }
    //DidMount
    useEffect(() => {
        fetchData();
    }, [url]);

    return data;
}

export default useFetch;