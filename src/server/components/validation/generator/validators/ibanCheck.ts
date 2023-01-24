const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const ibanCheck = {
  keyword: "ibanCheck",
  type: "string",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.fail$data(_`!/^FI\\d{16}$/.test(${data})`);
  },
  error: {
    message: ({ data }) => str`'${data}' is not a valid IBAN`,
  },
};

export default ibanCheck;
