import axios from 'axios';

const request = async (method, baseUrl, pathname, {
  data
} = {}) => {
  const response = await axios({
    method,
    url: pathname ?? '',
    baseURL: baseUrl ?? '/',
    data,
  });
  return response;
}

export default {
  request
};
