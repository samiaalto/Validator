const { _, str, Name } = require("ajv");
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
  code: any;
  error: any;
}

const error = {
  message: ({ params: { addon, param, element } }: any) => {
    return str`Additonal service '${addon}' is missing '${param}' property in '${element}' element`;
  },
  params: ({ params: { addon, param, element } }: any) =>
    _`{addon: ${addon}, path: ${param}, element: ${element}}`,
};

const mandatoryFieldsCheck: testData = {
  keyword: "mandatoryFieldsCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function getValue(obj, arrPath) {
      let arrItems = gen.let("arrItems", _`[]`);
      let koe = _`${arrPath}.reduce((x, y) => {
        console.log("TEST");
        console.log(y);
        console.log(x);
        if(${arrItems}.length > 0) {
          let ret = ${arrItems}[${arrItems}.length -1];
          ${arrItems}.pop();
          return ret;
        }
        else if(Array.isArray(x)) {
          for (let item of x) {
            ${arrItems}.push(item);
          }
          let ret = ${arrItems}[${arrItems}.length -1];
          ${arrItems}.pop();
          console.log(ret);
          return ret;
        }
        else if (y in x) {
          return x[y]
          };
        return {};
      }, ${obj})`;
      return koe;
    }

    function getVal(obj, props) {
      if (!props) return obj;

      let propsArr = props.split(".");
      let prop = propsArr.splice(0, 1);
      if (typeof obj === "object") {
        return getVal(obj[prop], propsArr.join("."));
      }
      if (Array.isArray(obj)) {
        for (let item of obj) {
          return getVal(item, propsArr.join("."));
        }
      }
    }

    function validatePath(addon, data, field) {
      let out = gen.let("out", _`true`);

      const getOccurences = new Name("getOccurences");
      const object = gen.name("object");
      const key = gen.name("key");
      let array = gen.name("array");
      let path = gen.name("path");
      gen
        .func(getOccurences, _`${object}, ${key}, ${array}, ${path}`)
        .try(
          () => {
            gen.code(_`${array} = ${array} || []`);
            gen.code(_`${path} = ${path} || ""`);
            gen.if(_`'object' === typeof ${object}`, () => {
              gen.forIn("k", object, (k) =>
                gen.if(
                  _`${k} === ${key}`,
                  () => {
                    gen.code(
                      _`${array}.push({value: ${object}[${k}], path: ${path}.concat(${k})})`
                    );
                  },
                  () => {
                    gen.code(
                      _`allNodes(${object}[${k}], ${key}, ${array}, ${path}.concat(${k} + "."))`
                    );
                  }
                )
              );
            });
            gen.return(_`${array}`);
          },
          (e) => {
            gen.throw(e);
          }
        )
        .endFunc();

      let occurences = _`getOccurences(${data}, ${field}.name)`;
      gen.if(
        _`${occurences}.length < 1`,
        () => {
          gen.code(_`${out} = false`);
        },
        () => {
          gen.if(_`${occurences}.length > 1`, () => {});
        }
      );

      return out;
    }

    function getServices(shipment) {
      let out = gen.let("out", _`[]`);
      const k = gen.let("k", _`${shipment}.GoodsItems.GoodsItem.length`);
      const l = gen.let("l");
      gen.for(_`${l} = ${k}; ${l}--;`, () => {
        let dataService = gen.let(
          "dataService",
          _`${shipment}.GoodsItems.GoodsItem[${l}].Product`
        );
        gen.if(
          _`typeof ${shipment}.GoodsItems.GoodsItem[${l}].Services === "undefined"`,
          () => {
            gen.code(_`${out}.push({service: ${dataService}, addons: []})`);
          },
          () => {
            gen.if(
              _`typeof ${shipment}.GoodsItems.GoodsItem[${l}].Services.Service === "undefined"`,
              () => {
                gen.code(_`${out}.push({service: ${dataService}, addons: []})`);
              },
              () => {
                gen.code(
                  _`${out}.push({service: ${dataService}, addons: ${shipment}.GoodsItems.GoodsItem[${l}].Services.Service})`
                );
              }
            );
          }
        );
      });
      return out;
    }

    function validateAddonFields() {
      gen.assign(valid, true);
      gen.if(_`typeof ${data} !== "undefined"`, () => {
        const i = gen.let("i", _`${data}.length`);
        const j = gen.let("j");
        gen.for(_`${j} = ${i}; ${j}--;`, () => {
          gen.if(
            _`typeof ${data}[${j}].GoodsItems.GoodsItem !== "undefined"`,
            () => {
              let shipment = gen.let("shipment", _`${data}[${j}]`);
              let services = getServices(shipment);

              gen.if(_`typeof ${services} !== "undefined"`, () => {
                const k = gen.let("k", _`${services}.length`);
                const l = gen.let("l");
                gen.for(_`${l} = ${k}; ${l}--;`, () => {
                  gen.if(_`${services}[${l}].addons.length > 0`, () => {
                    const m = gen.let("m", _`${services}[${l}].addons.length`);
                    const n = gen.let("n");
                    gen.for(_`${n} = ${m}; ${n}--;`, () => {
                      let service = _`this.services[this.services.findIndex(item => item.serviceCode === ${services}[${l}].addons[${n}].value)]`;

                      gen.if(_`typeof ${service} !== "undefined"`, () => {
                        gen.if(
                          _`typeof ${service}.mandatoryFields !== "undefined"`,
                          () => {
                            const o = gen.let(
                              "o",
                              _`${service}.mandatoryFields.length`
                            );
                            const p = gen.let("p");

                            gen.for(_`${p} = ${o}; ${p}--;`, () => {
                              let valid = validatePath(
                                _`${services}[${l}].addons[${n}].value`,
                                _`${data}[${j}]`,
                                _`${service}.mandatoryFields[${p}]`
                              );
                              gen.if(_`!${valid}`, () => {
                                let addon = _`${services}[${l}].addons[${n}].value`;
                                let param = _`${service}.mandatoryFields[${p}].name`;
                                let element = _`${service}.mandatoryFields[${p}].position`;
                                cxt.setParams({
                                  addon,
                                  param,
                                  element,
                                });
                                cxt.error();
                                gen.assign(valid, false);
                              });
                            });
                          }
                        );
                      });
                    });
                  });
                });
              });
            }
          );
        });
      });
    }

    cxt.block$data(valid, validateAddonFields, _`${schemaCode} === false`);
  },
};

export default mandatoryFieldsCheck;
