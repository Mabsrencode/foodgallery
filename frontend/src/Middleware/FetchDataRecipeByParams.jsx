import axios from 'axios';

const FetchDataRecipeByParams = async (url, paramsObject) => {
    try {
        const response = await axios.get(url, { params: paramsObject });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

export default FetchDataRecipeByParams;
