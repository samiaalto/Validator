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

const ibanCheck: testData = {
  keyword: "ibanCheck",
  type: "string",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.fail$data(_`!/^FI\\d{16}$/.test(${data})`);
  },
  error: {
    message: ({ data }: any) => str`'${data}' is not a valid IBAN`,
  },
};

export default ibanCheck;
