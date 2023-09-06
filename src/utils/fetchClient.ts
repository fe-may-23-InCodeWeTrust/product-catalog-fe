const BASE_URL = 'https://product-catalog-be-lf4l.onrender.com/';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: string,
  credentials?: any, // we can send any data to the server
  data: any = null,
  token: any = null,
  ): Promise<T> {
  const options: RequestInit = { method };

  if (credentials) {
    options.headers = {
      Authorization: credentials,
    }
  }

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  if (token) {
    options.headers = {
      Authorization: token,
    }
  }

  // we wait for testing purpose to see loaders
  return wait(1000)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string, credentials?: any, token?: any) => request<T>(url, 'GET', credentials, token),
  post: <T>(url: string, data: any, token?: any, credentials?: any) =>
    request<T>(url, 'POST', data, token, credentials),
  patch: <T>(url: string, data: any, token?: any) =>
    request<T>(url, 'PATCH', data, token),
  // delete: (url: string) => request(url, 'DELETE'),
};
