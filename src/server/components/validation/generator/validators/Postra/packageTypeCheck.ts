import { _, str } from "ajv";
import type { KeywordCxt } from "ajv";

interface testData {
  data?: string;
  keyword: string;
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

const packageTypeCheck: testData = {
  keyword: "packageTypeCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function getServiceData(dataService) {
      let out = gen.let("out", _`{}`);
      gen.code(_`${out}["status"] = true`);
      let service;
      let serviceAddons;

      service = _`this.services[this.services.findIndex(item => item.serviceCode === ${dataService})]`;
      gen.if(
        _`typeof ${service} !== "undefined"`,
        () => {
          //serviceAddons = _`${service}.addons`;
          gen.code(_`${out}["service"] = ${service}.serviceCode`);
          gen.code(_`${out}["types"] = ${service}.packageTypes`);
        },
        () => {
          gen.code(_`${out}["status"] = false`);
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

    function validatePackageType() {
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
                  let service = _`${services}[${l}].service`;
                  let serviceData = getServiceData(service);
                  gen.if(_`${serviceData}.status`, () => {
                    gen.if(
                      _`typeof ${shipment}.GoodsItems.GoodsItem[${l}].PackageQuantity !== "undefined"`,
                      () => {
                        let packageType = _`${data}[${j}].GoodsItems.GoodsItem[${l}].PackageQuantity[0].attr.type`;
                        gen.if(
                          _`!${serviceData}.types.some((e) => e.PackageType === ${packageType})`,
                          () => {
                            const issue = _`${packageType}`;
                            const path = str`${j}/GoodsItems/GoodsItem/${l}/PackageQuantity/0/attr/type`;

                            const message = str`'${packageType}' is not valid package type for service '${service}'`;
                            cxt.setParams({
                              message,
                              issue,
                              path,
                            });
                            cxt.error();
                            gen.assign(valid, false);
                          }
                        );
                      }
                    );
                  });
                });
              });
            }
          );
        });
      });
    }

    cxt.block$data(valid, validatePackageType, _`${schemaCode} === false`);
  },
};

export default packageTypeCheck;
