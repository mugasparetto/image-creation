import axios from 'axios';

const { API_KEY } = process.env;
const API_URL = 'https://api.remove.bg/v1.0/removebg';

const getImageWithoutBg = async (req, res, next) => {
  const { imageString } = req.body;
  // console.log(req.body);
  try {
    const response = await axios.post(
      API_URL,
      {
        image_file_b64: imageString,
        size: 'preview',
        type: 'product',
        type_level: 1,
        format: 'png',
        crop: true,
        channels: 'rgba',
      },
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
        responseType: 'arraybuffer',
        responseEncoding: 'utf8',
      }
    );
    // console.log(response);
    res.send(response.data);
  } catch (error) {
    next(error);
  }
};

export default { getImageWithoutBg };
