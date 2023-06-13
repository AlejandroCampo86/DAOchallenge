import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Fetch all proposals
export const getProposals = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/proposals`);
        //console.log('response ', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching proposals:', error);
        return error;

    }
};


