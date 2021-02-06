import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const getImageWithoutBg = async (imageString) => {
  // console.log({ imageString });
  try {
    const res = await axios.post(
      API_URL,
      { imageString },
      {
        responseType: 'arraybuffer',
        responseEncoding: 'utf8',
      }
    );

    return res;
  } catch (error) {
    return error;
  }
};

export { getImageWithoutBg };
