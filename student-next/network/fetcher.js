import axios from "axios";
import useSWR from "swr";

const apiRoot = axios.create({
   baseURL: 'http://localhost:3001/api/v1'
})

const basicFetcher = async (key) => (await axios.get(key, { baseURL: 'http://localhost:3001/api/v1' })).data;
const fetcher = (key) => {
    const { data, error } = useSWR(key, basicFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      })
    return{
        data: data?.reply,
        isLoading: !error && !data,
        isError: error
    }
}
const conditionalFetcher = (key, condition) => {
    const { data, error } = useSWR(condition ? key : null, basicFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    return{
        data: data?.reply,
        isLoading: !error && !data,
        isError: error
    }
}


export {
    fetcher,
    conditionalFetcher
}

export default apiRoot;