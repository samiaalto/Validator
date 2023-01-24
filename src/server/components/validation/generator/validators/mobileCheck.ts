const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const mobileCheck = {
  keyword: "mobileCheck",
  type: "string",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.fail$data(
      _`!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(${data})`
    );
  },
  error: {
    message: ({ data }) => str`'${data}' is not a valid phone number`,
  },
};

export default mobileCheck;
