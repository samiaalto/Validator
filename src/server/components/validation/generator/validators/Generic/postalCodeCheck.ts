const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  type: string;
  code: any;
  error: any;
}

const error = {
  message: ({ params: { message } }: any) => {
    return message;
  },
  params: ({ params: { issue, path } }: any) =>
    _`{issue: ${issue}, path: ${path}}`,
};

const postalCodeCheck: testData = {
  keyword: "postalCodeCheck",
  type: "object",
  code(cxt: KeywordCxt) ,
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validatePostalcode() {
      gen.assign(valid, true);

      gen.if(_`typeof ${data} !== "undefined"`, () => {
          gen.if(
             _`${data}.Country === "FI" && !this.postalCodes.includes(${data}.Postcode)`,
            () => {
              const issue = _`${data}.Postcode`;
              const path = str`Postcode`;
              let message = str`'${issue}' is not a valid postal code in 'FI'`;
              cxt.setParams({
                issue,
                path,
                message,
              });
              cxt.error();
              gen.assign(valid, false);
            }
          );
        });
    }

    cxt.block$data(valid, validatePostalcode, _`${schemaCode} === false`);
  },
};

export default postalCodeCheck;
