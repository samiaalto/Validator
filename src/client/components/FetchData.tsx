import axios from "axios";

export const fetchData = (data: string, param: string, format: string) => {
  let url;
  let status = "pending";
  let result: any;
  let config;
  if (param === "validate") {
    url = `/api/validate2`;

    let suspender = axios
      .post(url, {
        headers: {
          "Content-Type": "plain/text",
        },
        params: { format: format },
        data,
      })
      .then((r) => {
        status = "success";
        result = r.data;
      })
      .catch((e) => {
        status = "error";
        result = e;
      });
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  } else if (param === "fileFormats") {
    url = `/api/getFormats`;

    let suspender = axios
      .get(url)
      .then((r) => {
        status = "success";
        result = r.data;
      })
      .catch((e) => {
        status = "error";
        result = e;
      });
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  }
};
