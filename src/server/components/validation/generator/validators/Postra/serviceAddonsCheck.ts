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

const serviceAddonsCheck: testData = {
  keyword: "serviceAddonsCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;
    let goodsItems = gen.let("goodsItems", _`${data}[0].GoodsItems.GoodsItem`);

    let departure = gen.let("departure", _`${data}.sender.country`);
    let destination = gen.let("destination", _`${data}.receiver.country`);

    let serviceRoutes;
    let routes;
    let deliveryMethod: string;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function routeCheck(serviceRoutes, departure, destination) {
      let dep = gen.let("dep", _`false`);
      let depArr = gen.let("depArr", _`[]`);
      let dest = gen.let("dest", _`false`);
      let destArr = gen.let("destArr", _`[]`);
      let out = gen.let("out", _`{}`);
      const i = gen.let("i", _`${serviceRoutes}.length`);
      const j = gen.let("j");
      gen.for(_`${j} = ${i}; ${j}--;`, () => {
        gen.code(_`${depArr}.push(${serviceRoutes}[${j}].departure)`);
        gen.if(_`${serviceRoutes}[${j}].departure === ${departure}`, () => {
          gen.code(_`${dep} = true`);
          const k = gen.let("k", _`${serviceRoutes}[${j}].destinations.length`);
          const l = gen.let("l");
          gen.for(_`${l} = ${k}; ${l}--;`, () => {
            gen.code(
              _`${destArr}.push(${serviceRoutes}[${j}].destinations[${l}].destination)`
            );
            gen.if(
              _`${serviceRoutes}[${j}].destinations[${l}].destination === ${destination}`,
              () => {
                gen.code(_`${dest} = true`);
                gen.if(
                  _`${serviceRoutes}[${j}].destinations[${l}].excluded.length > 0`,
                  () => {
                    gen.code(
                      _`${out}["excluded"] = ${serviceRoutes}[${j}].destinations[${l}].excluded`
                    );
                  }
                );
              }
            );
          });
        });
      });

      gen.code(_`${out}["departure"] = ${dep}`);
      gen.code(_`${out}["depArr"] = ${depArr}`);
      gen.code(_`${out}["destination"] = ${dest}`);
      gen.code(_`${out}["destArr"] = ${destArr}`);
      return out;
    }

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
          gen.code(_`${out}["addons"] = ${service}.addons`);
          gen.code(_`${out}["routes"] = ${service}.routes`);
        },
        () => {
          gen.code(_`${out}["status"] = false`);
        }
      );

      return out;
    }

    function getRoute(shipment) {
      let out = gen.let("out", _`{}`);
      const k = gen.let("k", _`${shipment}.Parties.Party.length`);
      const l = gen.let("l");
      gen.for(_`${l} = ${k}; ${l}--;`, () => {
        gen.if(
          _`typeof ${shipment}.Parties.Party[${l}].attr.role === "undefined"`,
          () => {
            //gen.code(_`${out}.push({service: "", addons: []})`);
          },
          () => {
            gen.if(
              _`${shipment}.Parties.Party[${l}].attr.role === "CONSIGNOR"`,
              () => {
                gen.if(
                  _`typeof ${shipment}.Parties.Party[${l}].Location.Country === "undefined"`,
                  () => {
                    //gen.code(_`${out}["departure"] = ${shipment}.Parties.Party[${l}].Location.Country`);
                  },
                  () => {
                    gen.code(
                      _`${out}["departure"] = ${shipment}.Parties.Party[${l}].Location.Country`
                    );
                    let path = str`Parties/Party/${l}/Location/Country`;
                    gen.code(_`${out}["depPath"] = ${path}`);
                  }
                );
              },
              () => {
                gen.if(
                  _`${shipment}.Parties.Party[${l}].attr.role === "CONSIGNEE"`,
                  () => {
                    gen.code(
                      _`${out}["destination"] = ${shipment}.Parties.Party[${l}].Location.Country`
                    );
                    let path = str`Parties/Party/${l}/Location/Country`;
                    gen.code(_`${out}["destPath"] = ${path}`);
                  }
                );
              }
            );
          }
        );
      });
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

    function validateServiceAddons() {
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

              gen.if(
                _`typeof ${data}[${j}].Parties.Party !== "undefined"`,
                () => {
                  let route = getRoute(shipment);
                  //gen.code(_`console.log(${route})`);
                  gen.if(
                    _`typeof ${services} !== "undefined" && typeof ${route} !== "undefined"`,
                    () => {
                      const k = gen.let("k", _`${services}.length`);
                      const l = gen.let("l");
                      gen.for(_`${l} = ${k}; ${l}--;`, () => {
                        let service = _`${services}[${l}].service`;
                        let serviceData = getServiceData(service);
                        gen.if(_`${serviceData}.status`, () => {
                          //let delivery = _`${serviceData}.delivery`;
                          let serviceRoutes = _`${serviceData}.routes`;
                          let departure = _`${route}.departure`;
                          let destination = _`${route}.destination`;
                          let routes = routeCheck(
                            serviceRoutes,
                            departure,
                            destination
                          );
                          //gen.code(_`console.log(${routes})`);
                          gen.if(
                            _`${routes}.departure && ${routes}.destination`,
                            () => {
                              gen.if(
                                _`typeof ${routes}.excluded !== "undefined"`,
                                () => {
                                  gen.code(
                                    _`${serviceData}.addons = ${serviceData}.addons.filter((e) => !${routes}.excluded.includes(e))`
                                  );
                                }
                              );
                              const m = gen.let(
                                "m",
                                _`${services}[${l}].addons.length`
                              );
                              const n = gen.let("n");
                              gen.for(_`${n} = ${m}; ${n}--;`, () => {
                                gen.if(
                                  _`!${serviceData}.addons.includes(${services}[${l}].addons[${n}].value)`,
                                  () => {
                                    const addon: string = _`${services}[${l}].addons[${n}].value`;
                                    const service: string = _`${services}[${l}].service`;

                                    const issue = _`${services}[${l}].addons[${n}].value`;
                                    const path = str`${j}/GoodsItems/GoodsItem/${l}/Services/Service/${n}/value`;

                                    const message = str`Additional service '${addon}' cannot be used together with service '${service}' on route ${departure}-${destination}`;
                                    cxt.setParams({
                                      message,
                                      issue,
                                      path,
                                    });
                                    cxt.error();
                                    gen.assign(valid, false);
                                  }
                                );
                              });
                            },
                            () => {
                              gen.if(
                                _`!${routes}.departure`,
                                () => {
                                  const service: string = _`${services}[${l}].service`;
                                  const allowedCountries = _`${routes}.depArr.toString()`;
                                  const path = _`${route}.depPath`;
                                  const issue = _`${departure}`;
                                  const message = str`Departure '${departure}' is not valid for service '${service}'. Allowed departure countries: '${allowedCountries}'`;
                                  cxt.setParams({
                                    message,
                                    issue,
                                    path,
                                  });
                                  cxt.error();
                                  gen.assign(valid, false);
                                },
                                () => {
                                  const service: string = _`${services}[${l}].service`;
                                  const allowedCountries = _`${routes}.destArr.toString()`;
                                  const path = _`${route}.destPath`;
                                  const issue = _`${destination}`;
                                  const message = str`Destination '${destination}' is not valid for service '${service}'. Allowed destination countries: '${allowedCountries}'`;
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
                    }
                  );
                }
              );
            }
          );
        });
      });
    }

    cxt.block$data(valid, validateServiceAddons, _`${schemaCode} === false`);
  },
};

export default serviceAddonsCheck;
