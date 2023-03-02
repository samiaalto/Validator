const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  $data: boolean;
  code: any;
  error: any;
}

const error = {
  message: ({ params: { message } }: any) => {
    return message;
  },
};

const trackingcodeCheck: testData = {
  keyword: "trackingcodeCheck",
  $data: true,
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validateTrackingcode() {
      gen.code(_`console.log("TÄÄLLÄ")`);
      gen.assign(valid, true);
      gen.if(_`typeof ${data} !== "undefined"`, () => {
        gen.if(
          _`!/^([0-9]{4})/.test(${data})`,
          () => {
            gen.if(
              _`!/^([A-Z]{4})/.test(${data})`,
              () => {
                //CHECK UPU
                gen.code(_`console.log("TÄÄLLÄ")`);
                gen.if(_`!/^[A-Z]{2}\\d{9}[A-Z]{2}$/.test(${data})`, () => {
                  let message = str`'${data}' is not a valid tracking code`;
                  cxt.setParams({
                    message,
                  });
                  cxt.error();
                  gen.assign(valid, false);
                });
              },
              () => {
                //CHECK JJFI
                gen.if(_`!/^JJFI\\d{17}$/.test(${data})`, () => {
                  let message = str`'${data}' is not a valid tracking code`;
                  cxt.setParams({
                    message,
                  });
                  cxt.error();
                  gen.assign(valid, false);
                });
              }
            );
          },
          () => {
            //CHECK SSCC
            gen.if(_`!/^00\\d{18}$/.test(${data})`, () => {
              let message = str`'${data}' is not a valid tracking code`;
              cxt.setParams({
                message,
              });
              cxt.error();
              gen.assign(valid, false);
            });
          }
        );
      });
    }

    cxt.block$data(valid, validateTrackingcode, _`${schemaCode} === false`);
  },
};

export default trackingcodeCheck;
