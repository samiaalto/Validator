const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  $data: boolean;
  code: any;
  error: any;
}

const swiftCheck: testData = {
  keyword: "swiftCheck",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.fail$data(
      _`!/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/.test(${data})`
    );
  },
  error: {
    message: ({ data }: any) => str`'${data}' is not a valid SWIFT`,
  },
};

export default swiftCheck;
