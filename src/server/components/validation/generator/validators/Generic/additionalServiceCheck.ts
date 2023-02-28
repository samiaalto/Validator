const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  type: string;
  schema: boolean;
  code: any;
  error: any;
}

const additionalServiceCheck: testData = {
  keyword: "additionalServiceCheck",
  type: "string",
  schema: false,
  code(cxt: KeywordCxt) {
    const { data, gen } = cxt;
    cxt.pass(_`this.services.some((e) => e.serviceCode === ${data})`);
  },
  error: {
    message: ({ data }: any) =>
      str`'${data}' is not a valid additional service`,
    params: ({ data }: any) => _`{param: ${data}}`,
  },
};

export default additionalServiceCheck;
