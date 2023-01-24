const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const additionalServiceCheck = {
  keyword: "additionalServiceCheck",
  type: "string",
  schema: false,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.pass(_`this.services.some((e) => e.serviceCode === ${data})`);
  },
  error: {
    message: ({ data }) => str`'${data}' is not a valid additional service`,
    params: ({ data }) => _`{param: ${data}}`,
  },
};

export default additionalServiceCheck;
