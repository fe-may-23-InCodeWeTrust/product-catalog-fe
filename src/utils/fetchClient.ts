const BASE_URL = 'https://product-catalog-be-lf4l.onrender.com/';

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: string,
  credentials?: any,
  data: any = null,
  token: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (credentials) {
    options.headers = {
      Authorization: credentials,
    };
  }

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token,
    };
  }

  if (token) {
    options.headers = {
      Authorization: token,
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string, credentials?: any, token?: any) =>
    request<T>(url, 'GET', credentials, token),
  post: <T>(url: string, data: any, token?: any, credentials?: any) =>
    request<T>(url, 'POST', data, token, credentials),
  patch: <T>(url: string, data: any, token?: any) =>
    request<T>(url, 'PATCH', data, token),
};
