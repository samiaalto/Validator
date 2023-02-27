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

const contractCheck: testData = {
  keyword: "contractCheck",
  type: "string",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data, gen } = cxt;
    cxt.pass(_`this.contracts.some((e) => e.contract === ${data})`);
  },
  error: {
    message: ({ data }: any) => str`'${data}' is not a valid contract number`,
  },
};

export default contractCheck;
