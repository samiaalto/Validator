const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const serviceCheck = {
  keyword: "serviceCheck",
  type: "string",
  code(cxt: KeywordCxt) {
    const { data } = cxt;
    cxt.pass(_`this.services.some((e) => e.serviceCode === ${data})`);
  },
  error: {
    message: ({ data }) => str`'${data}' is not a valid service`,
  },
};

export default serviceCheck;
