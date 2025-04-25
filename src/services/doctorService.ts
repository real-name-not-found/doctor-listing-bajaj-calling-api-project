import axios from 'axios';
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    console.log('Fetching doctors from API...');
    const response = await axios.get(API_URL);
    console.log('API response:', response);
    
    // Use actual API data
    if (response.data && Array.isArray(response.data)) {
      console.log(`Successfully fetched ${response.data.length} doctors`);
      return response.data as Doctor[]; 
    } else {
      console.error('Unexpected API response format or empty data:', response.data);
      console.log('Returning empty array due to API format error');
      return []; // Return empty array on format error
    }

  } catch (error) {
    console.error('Error fetching doctors:', error);
    console.log('Returning empty array due to fetch error');
    return []; // Return empty array on fetch error
  }
}; 