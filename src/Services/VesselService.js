import axios from 'axios';


const API_URL = 'https://api.seavision.volpe.dot.gov/v1/vessels';
const API_KEY = '92Q89qJbO26x2iAF3TRFbJwL66cNoqCAIyUyba00';

export const fetchVessels = async (latitude, longitude, age) => {
    try {
      const response = await axios.get(API_URL, {
        params: { latitude, longitude, age },
        headers: {
          'x-api-key': API_KEY,
          'accept': 'application/json'  
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const vesselService = {
    fetchVessels: fetchVessels,
  };
  
  export default vesselService;