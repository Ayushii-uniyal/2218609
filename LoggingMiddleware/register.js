const axios = require('axios');

async function register() {
  const REGISTER_URL = 'http://20.244.56.144/evaluation-service/register';
  
  const registrationData = {
    email: "AYUSHIUNIYAL.220122355@gehu.ac.in",            
    name: "Ayushi Uniyal",                
    mobileNo: "8791989877",                
    githubUsername: "Ayushii-uniyal",           
    rollNo: "2218609",                     
    accessCode: "QAhDUr"                   
  };

  try {
    const response = await axios.post(REGISTER_URL, registrationData);
    console.log("REGISTRATION SUCCESS! Save these credentials:");
    console.log({
      clientID: response.data.clientID,
      clientSecret: response.data.clientSecret
    });
  } catch (error) {
    console.error(" REGISTRATION FAILED:", error.response?.data || error.message);
  }
}

register();
