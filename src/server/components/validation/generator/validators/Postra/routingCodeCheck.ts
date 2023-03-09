const { _, str } = require("ajv");
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

const routingCodeCheck: testData = {
  keyword: "routingCodeCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function getServices(shipment) {
      let out = gen.let("out", _`[]`);
      const k = gen.let("k", _`${shipment}.GoodsItems.GoodsItem.length`);
      const l = gen.let("l");
      gen.for(_`${l} = ${k}; ${l}--;`, () => {
        let dataService = gen.let(
          "dataService",
          _`${shipment}.GoodsItems.GoodsItem[${l}].Product`
        );
        let routingCode = gen.let(
          "routingCode",
          _`${shipment}.GoodsItems.GoodsItem[${l}].RoutingCode`
        );
        gen.code(
          _`${out}.push({service: ${dataService}, routingCode: ${routingCode}})`
        );
      });
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
                    gen.code(
                      _`${out}["destinationPostalcode"] = ${shipment}.Parties.Party[${l}].Location.Postcode`
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

    function validateRoutingCode() {
      gen.assign(valid, true);

      gen.if(_`typeof ${data} !== "undefined"`, () => {
        const i = gen.let("i", _`${data}.length`);
        const j = gen.let("j");
        gen.for(_`${j} = ${i}; ${j}--;`, () => {
          let shipment = gen.let("shipment", _`${data}[${j}]`);
          let services = getServices(shipment);
          gen.if(_`typeof ${services} !== "undefined"`, () => {
            const k = gen.let("k", _`${services}.length`);
            const l = gen.let("l");
            gen.for(_`${l} = ${k}; ${l}--;`, () => {
              gen.if(
                _`${services}[${l}].service.substring(0,2) === "27"`,
                () => {
                  let route = getRoute(shipment);
                  let routingCode = _`${services}[${l}].routingCode`;
                  let service = _`${services}[${l}].service`;
                  let destination = gen.let(
                    "destination",
                    _`${route}.destination`
                  );
                  let destinationPostalcode = gen.let(
                    "destinationPostalcode",
                    _`${route}.destinationPostalcode`
                  );
                  let excludedDest = gen.let(
                    "excludedDest",
                    _`["FI", "EE", "LT", "LV"]`
                  );

                  gen.if(
                    _`typeof ${routingCode} === "undefined"`,
                    () => {
                      gen.if(
                        _`!${excludedDest}.includes(${destination})`,
                        () => {
                          const issue = str`No routing code`;
                          const path = str`${j}/GoodsItems/GoodsItem/${l}`;

                          const message = str`Routing code is mandatory for service '${service}' when destination is '${destination}'`;
                          cxt.setParams({
                            message,
                            issue,
                            path,
                          });
                          cxt.error();
                          gen.assign(valid, false);
                        }
                      );
                    },
                    () => {
                      let group = _`${routingCode}.match(/(2L|403)([A-Z]{2})([A-Z,0-9]{4,6})(\\+)(70|72)(00|53|54)(0)(000|001|002|004|064)/)`;

                      gen.if(
                        _`${group} === null`,
                        () => {
                          const issue = str`${routingCode}`;
                          const path = str`${j}/GoodsItems/GoodsItem/${l}/RoutingCode`;

                          const message = str`'${routingCode}' is not valid routing code`;
                          cxt.setParams({
                            message,
                            issue,
                            path,
                          });
                          cxt.error();
                          gen.assign(valid, false);
                        },
                        () => {
                          gen.if(_`${group}[2] !== ${destination}`, () => {
                            const issue = str`${routingCode}`;
                            const path = str`${j}/GoodsItems/GoodsItem/${l}/RoutingCode`;
                            const eGroup = _`${group}[2]`;
                            const message = str`Routing code destination '${eGroup}' is not matching consignee country code '${destination}'`;
                            cxt.setParams({
                              message,
                              issue,
                              path,
                            });
                            cxt.error();
                            gen.assign(valid, false);
                          });
                          gen.if(
                            _`${group}[3] !== ${destinationPostalcode}`,
                            () => {
                              const issue = str`${routingCode}`;
                              const path = str`${j}/GoodsItems/GoodsItem/${l}/RoutingCode`;
                              const eGroup = _`${group}[3]`;
                              const message = str`Routing code destination postal code '${eGroup}' is not matching consignee postal code '${destinationPostalcode}'`;
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
      });
    }

    cxt.block$data(valid, validateRoutingCode, _`${schemaCode} === false`);
  },
};

export default routingCodeCheck;
