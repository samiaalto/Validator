const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const contractCheck = {
  keyword: "contractCheck",
  type: "string",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data, gen } = cxt;
    cxt.pass(_`this.contracts.some((e) => e.contract === ${data})`);
  },
  error: {
    message: ({ data }) => str`'${data}' is not a valid contract number`,
  },
};

export default contractCheck;
