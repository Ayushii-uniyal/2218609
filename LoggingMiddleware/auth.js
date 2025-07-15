const axios = require('axios');

async function getAuthToken() {
  const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';

  const credentials = {
    email: "AYUSHIUNIYAL.220122355@gehu.ac.in",
    name: "Ayushi Uniyal",
    rollNo: "2218609",
    accessCode: "QAhDUr",
    clientID: "ecef3fe1-ffd8-4408-8d72-7563bfebf06c",
    clientSecret: "dbEnGcqNCeYSNaHq"
  };

  try {
    const response = await axios.post(AUTH_URL, credentials);
    console.log("Access Token Received:");
    console.log({
      token: response.data.access_token,
      type: response.data.token_type
    });
  } catch (error) {
    console.error("AUTH FAILED:", error.response?.data || error.message);
  }
}

getAuthToken();
