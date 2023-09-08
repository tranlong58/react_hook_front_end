import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (error) {
                // Xử lý lỗi nếu cần thiết
            }
        };

        fetchData();
    }, [url]);

    console.log(data);

    return data;
}

export default useFetch;