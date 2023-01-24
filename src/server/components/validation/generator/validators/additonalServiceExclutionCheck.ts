const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const error = {
  message: ({ params: { addon, addon2 } }) =>
    str`Additional service '${addon2}' cannot be used together with '${addon}'`,
  params: ({ params: { addon, path } }) => _`{issue: ${addon}, path: ${path}}`,
};

const additonalServiceExclutionCheck = {
  keyword: "additonalServiceExclutionCheck",
  type: "array",
  schema: false,
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;
    const exclusions = _`${data}.reduce((acc, curr) => {
      const index = this.services.findIndex(item => item.serviceCode === curr.id);
      if(index > -1) {
        curr.id = this.services[index].serviceCode;
      }   
      acc.push(this.services[index]);
      return acc;
    }, [])`;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validateExclusion(): void {
      const i = gen.let("i", _`${exclusions}.length`);
      const j = gen.let("j");

      gen.assign(valid, true);
      gen.for(_`${j} = ${i}; ${j}--;`, () =>
        gen.if(_`typeof ${exclusions}[${j}] !== "undefined"`, () =>
          gen.if(_`${exclusions}[${j}].excludedAddons.length > 0`, () => {
            const k = gen.let(
              "k",
              _`${exclusions}[${j}].excludedAddons.length`
            );

            const l = gen.let("l");
            gen.for(_`${l} = ${k}; ${l}--;`, () => {
              const m = gen.let("m", _`${exclusions}.length`);
              const n = gen.let("n");
              gen.for(_`${n} = ${m}; ${n}--;`, () =>
                gen.if(_`typeof ${exclusions}[${n}] !== "undefined"`, () =>
                  gen.if(
                    _`${exclusions}[${j}].excludedAddons[${l}] === ${exclusions}[${n}].serviceCode`,
                    () => {
                      const addon: string = _`${exclusions}[${j}].serviceCode`;
                      const addon2: string = _`${exclusions}[${j}].excludedAddons[${l}]`;
                      const path = str`${j}/id`;
                      cxt.setParams({ addon, addon2, path });
                      cxt.error();
                      gen.assign(valid, false);
                    }
                  )
                )
              );
            });
          })
        )
      );
    }

    cxt.block$data(valid, validateExclusion, _`${schemaCode} === false`);
  },
};

export default additonalServiceExclutionCheck;
