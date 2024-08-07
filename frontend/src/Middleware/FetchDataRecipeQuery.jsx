
import axios from 'axios';

const FetchDataRecipeQuery = async (url, category) => {
    try {
        const response = await axios.get(`${url}${category}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

export default FetchDataRecipeQuery;

