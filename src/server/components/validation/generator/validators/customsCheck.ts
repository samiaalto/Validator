const { _, str } = require("ajv");
import type { KeywordCxt } from "ajv";

const error = {
  message: ({ params: { message } }) => {
    return message;
  },
  params: ({ params: { type, field } }) => _`{type: ${type}, field: ${field}}`,
};

const customsCheck = {
  keyword: "customsCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;
    let destination = gen.let("destination", _`${data}.receiver.country`);

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validatePath(data) {
      let output = gen.let("output", _`[]`);
      let paths = gen.let(
        "paths",
        _`[{ type: "CN23POSTI", field: "printSet", pointer: "" },
        { type: "CN23POSTI", field: "currencyCode", pointer: "" },
        { type: "CN23POSTI", field: "importExportType", pointer: "" },
        { type: "CN23POSTI", field: "parcelCount", pointer: "" },
        { type: "CN23POSTI", field: "copies", pointer: "lines" },
        { type: "CN23POSTI", field: "value", pointer: "lines" },
        { type: "CN23POSTI", field: "valuesPerItem", pointer: "lines" },
        { type: "CN23POSTI", field: "contents", pointer: "lines" },
        { type: "CN23POSTI", field: "netWeight", pointer: "lines" },
        { type: "CN23POSTI", field: "sourceCountryCode", pointer: "lines" }]`
      );
      let object = _`${data}.service.customsDeclaration`;

      gen.if(
        _`typeof ${object} === "undefined"`,
        () => {
          let type = str``;
          let field = str``;
          let message = str`Customs declaration is required when destination is '${destination}'`;
          cxt.setParams({
            type,
            field,
            message,
          });
          cxt.error();
          gen.assign(valid, false);
        },
        () => {
          const i = gen.let("i", _`${paths}.length`);
          const j = gen.let("j");
          let type = gen.let("type", _`${object}.printSet`);
          gen.for(_`${j} = ${i}; ${j}--;`, () => {
            gen.if(
              _`typeof ${type} === "undefined"`,
              () => {
                gen.code(_`${output}.push({type: "", field: "printSet"})`);
              },
              () => {
                gen.if(
                  _`${paths}[${j}].type === ${type} && ${paths}[${j}].pointer !== "lines" && !${object}.hasOwnProperty(${paths}[${j}].field)`,
                  () => {
                    gen.code(
                      _`${output}.push({type: ${type}, field: ${paths}[${j}].field})`
                    );
                  },
                  () => {
                    gen.if(
                      _`${paths}[${j}].type === ${type} && ${paths}[${j}].pointer === "lines"`,
                      () => {
                        gen.if(
                          _`typeof ${object}.lines === "undefined"`,
                          () => {
                            gen.code(
                              _`${output}.push({type: ${type}, field: ${paths}[${j}].field})`
                            );
                          },
                          () => {
                            const k = gen.let("k", _`${object}.lines.length`);
                            const l = gen.let("l");
                            gen.for(_`${l} = ${k}; ${l}--;`, () => {
                              gen.if(
                                _`!${object}.lines[${l}].hasOwnProperty(${paths}[${j}].field)`,
                                () => {
                                  gen.code(
                                    _`${output}.push({type: ${type}, field: ${paths}[${j}].field})`
                                  );
                                }
                              );
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          });
        }
      );

      return output;
    }

    function validateCustomsFields() {
      gen.assign(valid, true);

      gen.if(_`!this.euCountries.includes(${destination})`, () => {
        let notValid = validatePath(_`${data}`);
        gen.if(_`typeof ${valid} !== "undefined"`, () => {
          const i = gen.let("i", _`${notValid}.length`);
          const j = gen.let("j");

          gen.for(_`${j} = ${i}; ${j}--;`, () => {
            let type = _`${notValid}[${j}].type`;
            let field = _`${notValid}[${j}].field`;
            let message = str`Customs declaration '${type}' is missing '${field}' property`;
            cxt.setParams({
              type,
              field,
              message,
            });
            cxt.error();
            gen.assign(valid, false);
          });
        });
      });
    }

    cxt.block$data(valid, validateCustomsFields, _`${schemaCode} === false`);
  },
};

export default customsCheck;
