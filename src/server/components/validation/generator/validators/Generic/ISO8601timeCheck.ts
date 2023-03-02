const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  $data: boolean;
  code: any;
  error: any;
}

const ISO8601timeCheck: testData = {
  keyword: "ISO8601timeCheck",
  $data: true,
  code(cxt: KeywordCxt) {
    const { data } = cxt;

    cxt.fail$data(
      _`!/^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:Z|-0[1-9]|-1\\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\\d)|\\+[01]\\d|\\+2[0-3])(?:|:?[0-5]\\d)$/.test(${data})`
    );
  },
  error: {
    message: ({ data }: any) => str`'${data}' is not a valid ISO8601 time`,
  },
};

export default ISO8601timeCheck;
