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

    function getPackageTypes(type, serviceData, service) {
      let out = gen.let("out", _`{}`);
      let types = gen.let("types", _`[]`);
      const k = gen.let("k", _`${serviceData}.types.length`);
      const l = gen.let("l");
      gen.for(_`${l} = ${k}; ${l}--;`, () => {
        gen.if(_`${serviceData}.types[${l}].PackageType === ${type}`, () => {
          gen.code(_`${types}.push(${serviceData}.types[${l}])`);
        });
      });

      gen.if(
        _`${types}.length === 1`,
        () => {
          gen.code(_`${out} = ${types}[0]`);
        },
        () => {
          const m = gen.let("m", _`${types}.length`);
          const n = gen.let("n");
          gen.for(_`${n} = ${m}; ${n}--;`, () => {
            gen.if(
              _`(${types}[${n}].AdditionalServiceCode !== null && ${service}.addons.some(e => e.value === ${types}[${n}].AdditionalServiceCode.Addon)) || (${types}[${n}].DeliveryLocation === "LOCKER" && ${service}.addons.some(e => e.value.substring(0,2) === "32"))`,
              () => {
                gen.code(_`${out} = ${types}[${n}]`);
              },
              () => {
                gen.if(
                  _`${types}[${n}].AdditionalServiceCode === null && (${service}.addons.length === 0 || ${service}.addons.some(e => e.value.substring(0,2) !== "32" || e.value !== "3174"))`,
                  () => {
                    gen.code(_`${out} = ${types}[${n}]`);
                  }
                );
              }
            );
          });
        }
      );

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
                            const allowed = _`${serviceData}.types.map(e => e.PackageType).join(", ")`;

                            const message = str`'${packageType}' is not valid package type for service '${service}'. Allowed types: '${allowed}'`;
                            cxt.setParams({
                              message,
                              issue,
                              path,
                            });
                            cxt.error();
                            gen.assign(valid, false);
                          },
                          () => {
                            let dimensions = gen.let(
                              "dimensions",
                              _`{"GrossWeight": null, "Volume": null, "Length": null, "Width": null, "Height": null}`
                            );
                            let packageDimensions = getPackageTypes(
                              _`${packageType}`,
                              _`${serviceData}`,
                              _`${services}[${l}]`
                            );
                            let object = _`${data}[${j}].GoodsItems.GoodsItem[${l}]`;
                            gen.forIn("o", object, (o) => {
                              gen.if(
                                _`${dimensions}.hasOwnProperty(${o})`,
                                () => {
                                  gen.code(
                                    _`${dimensions}[${o}] = ${object}[${o}]`
                                  );
                                }
                              );
                            });
                            gen.if(
                              _`${dimensions}.GrossWeight > ${packageDimensions}.MaxWeight_kg || ${dimensions}.GrossWeight < ${packageDimensions}.MinWeight_kg`,
                              () => {
                                const issue = _`${dimensions}.GrossWeight`;
                                const minWeight = _`${packageDimensions}.MinWeight_kg`;
                                const maxWeight = _`${packageDimensions}.MaxWeight_kg`;
                                const path = str`${j}/GoodsItems/GoodsItem/${l}/GrossWeight`;

                                const message = str`GrossWeight '${issue}' kg is not within the package type '${packageType}' weight range '${minWeight}-${maxWeight}' kg`;
                                cxt.setParams({
                                  message,
                                  issue,
                                  path,
                                });
                                cxt.error();
                                gen.assign(valid, false);
                              }
                            );

                            gen.if(
                              _`${dimensions}.Height > ${packageDimensions}.MaxHeight_cm || ${dimensions}.Height < ${packageDimensions}.MinHeight_cm`,
                              () => {
                                const issue = _`${dimensions}.Height`;
                                const minHeight = _`${packageDimensions}.MinHeight_cm`;
                                const maxHeight = _`${packageDimensions}.MaxHeight_cm`;
                                const path = str`${j}/GoodsItems/GoodsItem/${l}/Height`;

                                const message = str`Height '${issue}' cm is not within the package type '${packageType}' height range '${minHeight}-${maxHeight}' cm`;
                                cxt.setParams({
                                  message,
                                  issue,
                                  path,
                                });
                                cxt.error();
                                gen.assign(valid, false);
                              }
                            );

                            gen.if(
                              _`${dimensions}.Width > ${packageDimensions}.MaxWidth_cm || ${dimensions}.Width < ${packageDimensions}.MinWidth_cm`,
                              () => {
                                const issue = _`${dimensions}.Width`;
                                const minWidth = _`${packageDimensions}.MinWidth_cm`;
                                const maxWidth = _`${packageDimensions}.MaxWidth_cm`;
                                const path = str`${j}/GoodsItems/GoodsItem/${l}/Width`;

                                const message = str`Width '${issue}' cm is not within the package type '${packageType}' width range '${minWidth}-${maxWidth}' cm`;
                                cxt.setParams({
                                  message,
                                  issue,
                                  path,
                                });
                                cxt.error();
                                gen.assign(valid, false);
                              }
                            );

                            gen.if(
                              _`${dimensions}.Length > ${packageDimensions}.MaxDepth_cm || ${dimensions}.Length < ${packageDimensions}.MinDepth_cm`,
                              () => {
                                const issue = _`${dimensions}.Length`;
                                const minLength = _`${packageDimensions}.MinDepth_cm`;
                                const maxLength = _`${packageDimensions}.MaxDepth_cm`;
                                const path = str`${j}/GoodsItems/GoodsItem/${l}/Length`;

                                const message = str`Length '${issue}' cm is not within the package type '${packageType}' length range '${minLength}-${maxLength}' cm`;
                                cxt.setParams({
                                  message,
                                  issue,
                                  path,
                                });
                                cxt.error();
                                gen.assign(valid, false);
                              }
                            );

                            gen.if(
                              _`${packageDimensions}.Circumference_cm !== null && ${dimensions}.Height !== null && ${dimensions}.Length !== null && ${dimensions}.Width !== null`,
                              () => {
                                let circum = gen.let("circum", _`0`);
                                let dims = gen.let("dims", _`[]`);
                                gen.code(_`${dims}.push(${dimensions}.Height)`);
                                gen.code(_`${dims}.push(${dimensions}.Length)`);
                                gen.code(_`${dims}.push(${dimensions}.Width)`);
                                gen.code(_`${dims}.sort()`);
                                gen.code(
                                  _`${circum} = (Number(${dims}[0]) * 2) + (Number(${dims}[1]) * 2) + Number(${dims}[2])`
                                );

                                gen.if(
                                  _`${packageDimensions}.Circumference_cm < ${circum}`,
                                  () => {
                                    const issue = _`${circum}`;
                                    const circumference = _`${packageDimensions}.Circumference_cm`;
                                    const path = str`${j}/GoodsItems/GoodsItem/${l}`;

                                    const message = str`Package circumference '${issue}' cm exceeds the package type '${packageType}' maximum circumference '${circumference}' cm`;
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
