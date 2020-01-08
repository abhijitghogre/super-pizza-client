const API_HOST = '/api/v1';

export default {
  call: ({url, method, body, handleSuccess, handleError}) => {
    let sanitizedUrl = url;
    if (url[0] === '/') {
      sanitizedUrl = url.substr(1)
    }
    fetch(`${API_HOST}/${sanitizedUrl}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest"
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        return response.json().then((err) => {
          throw err;
        });

      })
      .then(handleSuccess)
      .catch(handleError)
  }
}