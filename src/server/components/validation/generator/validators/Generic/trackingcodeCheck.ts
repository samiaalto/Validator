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

    function mod11CD(input) {
      let out = gen.let("out", _`{}`);
      let sum = gen.let("sum", _`0`);
      let splitInput = gen.let("splitInput", _`${input}.split("")`);

      const i = gen.let("i", _`${splitInput}.length`);
      const j = gen.let("j");
      gen.for(_`${j} = ${i}; ${j}--;`, () => {
        _`${sum} += parseInt(${splitInput}[${j}], 10) * ((${j} % 6) + 2)`;
      });

      var sumMod11 = gen.let("sumMod11", _`${sum} % 11`);

      gen.if(
        _`${sumMod11} === 0`,
        () => {
          gen.code(_`${out}["result"] = "0"`);
        },
        () => {
          gen.if(
            _`${sumMod11} === 1`,
            () => {
              gen.code(_`${out}["result"] = "-"`);
            },
            () => {
              gen.code(_`${out}["result"] = 11 - ${sumMod11} + ""`);
            }
          );
        }
      );
      return out;
    }

    function ssccCD(input) {
      let out = gen.let("out", _`{}`);
      let sum = gen.let("sum", _`0`);
      let splitInput = gen.let("splitInput", _`${input}.split("")`);

      const i = gen.let("i", _`${splitInput}.length`);
      const j = gen.let("j");
      let l = gen.let("l", _`1`);
      gen.for(_`${j} = ${i}; ${j}--;`, () => {
        let number = gen.let("number", _`parseInt(${splitInput}[${j}])`);
        gen.if(
          _`${l} % 2 === 0`,
          () => {
            gen.code(_`${sum} += ${number}`);
          },
          () => {
            gen.code(_`${sum} += ${number} * 3`);
          }
        );
        gen.code(_`${l}++`);
      });
      gen.code(_`${out}["result"] = Math.ceil(${sum} / 10) * 10 - ${sum}`);
      return out;
    }

    function validateTrackingcode() {
      gen.assign(valid, true);
      gen.if(_`typeof ${data} !== "undefined"`, () => {
        gen.if(
          _`!/^([0-9]{4})/.test(${data})`,
          () => {
            gen.if(
              _`!/^([A-Z]{4})/.test(${data})`,
              () => {
                //CHECK UPU
                gen.if(
                  _`!/^[A-Z]{2}\\d{9}[A-Z]{2}$/.test(${data})`,
                  () => {
                    let message = str`'${data}' is not a valid tracking code`;
                    cxt.setParams({
                      message,
                    });
                    cxt.error();
                    gen.assign(valid, false);
                  },
                  () => {
                    //CHECK UPU CHECK DIGIT
                    let testCD = gen.let(
                      "testCD",
                      _`${data}.substring(2, ${data}.length - 3)`
                    );
                    let calculatedCD = mod11CD(testCD);
                    let cd = gen.let("cd", _`${calculatedCD}.result`);
                    let dataCD = gen.let(
                      "dataCD",
                      _`${data}.substring(${data}.length - 3, ${data}.length - 2)`
                    );
                    gen.if(_`${dataCD} !== ${cd}`, () => {
                      let message = str`'${dataCD}' is not a valid check digit. Excpected to get '${cd}'`;
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
            gen.if(
              _`!/^00\\d{18}$/.test(${data})`,
              () => {
                let message = str`'${data}' is not a valid tracking code`;
                cxt.setParams({
                  message,
                });
                cxt.error();
                gen.assign(valid, false);
              },
              () => {
                //CHECK SSCC CHECK DIGIT
                let testCD = gen.let(
                  "testCD",
                  _`${data}.substring(2, ${data}.length - 1)`
                );
                gen.code(_`console.log(${testCD})`);
                let calculatedCD = ssccCD(testCD);
                let cd = gen.let("cd", _`${calculatedCD}.result.toString()`);
                let dataCD = gen.let(
                  "dataCD",
                  _`${data}.substring(${data}.length - 1, ${data}.length)`
                );
                gen.if(_`${dataCD} !== ${cd}`, () => {
                  let message = str`'${dataCD}' is not a valid check digit. Excpected to get '${cd}'`;
                  cxt.setParams({
                    message,
                  });
                  cxt.error();
                  gen.assign(valid, false);
                });
              }
            );
          }
        );
      });
    }

    cxt.block$data(valid, validateTrackingcode, _`${schemaCode} === false`);
  },
};

export default trackingcodeCheck;
