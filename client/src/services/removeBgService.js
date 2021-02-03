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
    // console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};

// const getImageWithoutBg = async (imageString) => {
//   try {
//     const res = await axios.post(
//       API_URL,
//       {
//         image_file_b64: imageString,
//         size: 'preview',
//         type: 'product',
//         type_level: 1,
//         format: 'png',
//         crop: true,
//         channels: 'rgba',
//       },
//       {
//         headers: {
//           'X-Api-Key': 'AbPzAvH8Wusg8CXR6wcjqBs5',
//         },
//         responseType: 'arraybuffer',
//         responseEncoding: 'utf8',
//       }
//     );
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

export { getImageWithoutBg };
