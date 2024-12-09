export const baseURL = 'https://192.168.1.27:7125/api/Student';

export const callAPI = async (url, options = {}) => {
  return await fetch(url, options).then(handleResponse).catch(handleError);
};

export const handleResponse = async response => {
  if (response.ok) {
    const resp = await response.json();
    if (resp?.STATUS_CODE === '200' || resp?.STATUS_CODE === 200) {
      return resp.DATA;
    } else {
      throw new Error(resp.ERROR_MESSAGE || 'Unexpected Error');
    }
  } else {
    let message = '';
    switch (response.status.toString()) {
      case '400':
        message = 'Bad Request: Invalid request syntax.';
        break;
      case '401':
        message = 'Unauthorized: Authentication failed.';
        break;
      case '403':
        message = 'Forbidden: Access is not allowed.';
        break;
      case '404':
        message = 'Not Found: Resource does not exist.';
        break;
      case '500':
        message = 'Internal Server Error: Something went wrong on the server.';
        break;
      default:
        message = 'An unknown error occurred.';
    }
    throw new Error(message);
  }
};

export const handleError = error => {
  console.error('API Error:', error.message);
  throw error;
};
