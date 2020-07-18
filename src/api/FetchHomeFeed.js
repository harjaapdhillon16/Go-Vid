import AxiosInstance from "./instance";

const FetchHomeFeed = async() =>{
    const result = await AxiosInstance.get('/homeFeed');
    return result.data;
}
export default FetchHomeFeed;