
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const createSecretGist = async (title, content) => {
  try {
    const token = process.env.REACT_APP_GIST_TOKEN;
    console.log('Using token:', token); 
    
    const response = await axios.post(
      'https://api.github.com/gists',
      {
        files: {
          [`${title}.md`]: { content },
        },
        public: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating secret gist:', error.response || error.message);
    throw error;
  }
};


export default api;