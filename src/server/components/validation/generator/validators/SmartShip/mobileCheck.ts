const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  type: string;
  $data: boolean;
  code: any;
  error: any;
}

const mobileCheck: testData = {
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
    message: ({ data }: any) => str`'${data}' is not a valid phone number`,
  },
};

export default mobileCheck;
