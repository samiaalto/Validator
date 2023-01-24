const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const error = {
  message: ({ params: { addon, param, element } }) => {
    return str`Additonal service '${addon}' is missing '${param}' property in '${element}' element`;
  },
  params: ({ params: { addon, param, element } }) =>
    _`{addon: ${addon}, path: ${param}, element: ${element}}`,
};

const mandatoryFieldsCheck = {
  keyword: "mandatoryFieldsCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;
    let dataAddons = gen.let("dataAddons", _`${data}.service.addons`);

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validatePath(addon, data, field) {
      let out = gen.let("out", _`true`);
      let paths = gen.let(
        "paths",
        _`[
        { position: "receiver", pointer: "receiver" },
        { position: "sender", pointer: "sender" },
        { position: "dangerousGoods", pointer: "parcels.0.dangerousGoods" }
      ]`
      );
      gen.if(
        _`${field}.position !== "addons"`,
        () => {
          let object = _`${paths}[${paths}.findIndex(e => e.position === ${field}.position)].pointer.split(".").reduce((acc, curr) => acc[curr], ${data})`;

          gen.if(
            _`typeof ${object} === "undefined"`,
            () => {
              gen.code(_`${out} = false`);
            },
            () => {
              gen.if(_`!${object}.hasOwnProperty(${field}.name)`, () => {
                gen.code(_`${out} = false`);
              });
            }
          );
        },
        () => {
          gen.if(_`!${addon}.hasOwnProperty(${field}.name)`, () => {
            gen.code(_`${out} = false`);
          });
        }
      );

      return out;
    }

    function validateAddonFields() {
      gen.assign(valid, true);

      gen.if(_`typeof ${dataAddons} !== "undefined"`, () => {
        const i = gen.let("i", _`${dataAddons}.length`);
        const j = gen.let("j");
        gen.for(_`${j} = ${i}; ${j}--;`, () => {
          let service = _`this.services[this.services.findIndex(item => item.serviceCode === ${dataAddons}[${j}].id)]`;

          gen.if(_`typeof ${service} !== "undefined"`, () => {
            gen.if(_`typeof ${service}.mandatoryFields !== "undefined"`, () => {
              const k = gen.let("k", _`${service}.mandatoryFields.length`);
              const l = gen.let("l");

              gen.for(_`${l} = ${k}; ${l}--;`, () => {
                let valid = validatePath(
                  _`${dataAddons}[${j}]`,
                  _`${data}`,
                  _`${service}.mandatoryFields[${l}]`
                );
                gen.if(_`!${valid}`, () => {
                  let addon = _`${dataAddons}[${j}].id`;
                  let param = _`${service}.mandatoryFields[${l}].name`;
                  let element = _`${service}.mandatoryFields[${l}].position`;
                  cxt.setParams({
                    addon,
                    param,
                    element,
                  });
                  cxt.error();
                  gen.assign(valid, false);
                });
              });
            });
          });
        });
      });
    }

    cxt.block$data(valid, validateAddonFields, _`${schemaCode} === false`);
  },
};

export default mandatoryFieldsCheck;
