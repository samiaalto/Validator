const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  type: string;
  code: any;
  error: any;
}

const serviceCheck: testData = {
  keyword: "serviceCheck",
  type: "string",
  code(cxt: KeywordCxt) {
    const { data } = cxt;
    cxt.pass(_`this.services.some((e) => e.serviceCode === ${data})`);
  },
  error: {
    message: ({ data }: any) => str`'${data}' is not a valid service`,
  },
};

export default serviceCheck;
