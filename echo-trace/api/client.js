import axios from 'axios';

// Connects to your future Node.js backend
const client = axios.create({
  baseURL: 'http://localhost:3000/api', // Make sure this matches your Backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;