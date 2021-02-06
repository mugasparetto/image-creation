import axios from 'axios';

const API_URL = 'http://localhost:8080/password/';

const verifyPassword = async (password) => {
  try {
    const res = await axios.post(API_URL, { password });

    return res;
  } catch (error) {
    return error;
  }
};

export { verifyPassword };
