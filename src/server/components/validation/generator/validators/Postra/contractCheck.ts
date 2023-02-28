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

const error = {
  message: ({ params: { message } }: any) => {
    return message;
  },
  params: ({ params: { issue, path } }: any) =>
    _`{issue: ${issue}, path: ${path}}`,
};

const contractCheck: testData = {
  keyword: "contractCheck",
  type: "array",
  $data: true,
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validateContract() {
      gen.assign(valid, true);

      gen.if(_`typeof ${data} !== "undefined"`, () => {
        const i = gen.let("i", _`${data}.length`);
        const j = gen.let("j");
        gen.for(_`${j} = ${i}; ${j}--;`, () => {
          gen.if(
            _`${data}[${j}].attr && ${data}[${j}].attr.type === "CONTRACT" && !this.contracts.some((e) => e.contract === ${data}[${j}].value)`,
            () => {
              const issue = _`${data}[${j}].value`;
              const path = str`${j}/value`;
              let message = str`'${issue}' is not a valid contract number`;
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
      });
    }

    cxt.block$data(valid, validateContract, _`${schemaCode} === false`);
  },
};

export default contractCheck;
