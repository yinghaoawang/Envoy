import axios from 'axios';
import config from '../config';

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      case 404:
        message = 'Sorry! the data you are looking for could not be found';
        break;
      case 413:
        message = 'File too large';
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params = {}) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  post = (url, data = {}) => {
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  put = (url, data = {}) => {
    return axios.put(url, data);
  };

  /**
   * Delete
   */
  delete = (url, config = {}) => {
    return axios.delete(url, { ...config });
  };

  /*
   file upload update method
   */
  updateWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        'content-type': 'multipart/form-data'
      }
    };
    return axios.put(url, formData, config);
  };

  /*
   file upload post method
   */
  createWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post(url, formData, config);
  };
}

const api = new APIClient();

export { api };
