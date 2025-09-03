const request = async ({ url, method = "GET", headers = {}, body }) => {
  const options = {
    method,
    headers: { ...headers },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, opts);

    if (!response.ok) throw new Error("Request Error");

    return await response.json();
  } catch {
    throw new Error("Request Error");
  }
};

request.get = (url, headers) => request({ url, method: "GET", headers });

request.post = (url, headers, body) => request({ url, method: "POST", body, headers });

request.put = (url, headers, body) => request({ url, method: "PUT", body, headers });

request.delete = (url, headers) => request({ url, method: "DELETE", headers });

export default request;
