import axios from "axios";

export function createResource() {
  return {
    fileFormats: wrapPromise(getFileFormats()),
  };
}

export function validatePayload(data, format) {
  return {
    validation: wrapPromise(validate(data, format)),
  };
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      else if (status === "error") throw result;
      else if (status === "success") return result;
    },
  };
}

async function validate(data, format) {
  let url = `/api/validate2`;
  const response = await axios.post(url, {
    headers: {
      "Content-Type": "plain/text",
    },
    params: { format: format },
    data,
  });
  return await response.data;
}

async function getFileFormats() {
  let url = `/api/getFormats`;
  const response = await axios.get(url);
  return await response.data;
}
