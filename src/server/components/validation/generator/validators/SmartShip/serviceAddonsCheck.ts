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
    let dataService = gen.let("dataService", _`${data}.service.id`);
    let dataAddons = gen.let("dataAddons", _`${data}.service.addons`);
    let departure = gen.let("departure", _`${data}.sender.country`);
    let destination = gen.let("destination", _`${data}.receiver.country`);

    let serviceRoutes;
    let routes;
    let deliveryMethod: string;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function routeCheck() {
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

    function getServiceData() {
      let out = gen.let("out", _`{}`);
      gen.code(_`${out}["status"] = true`);
      let delivery;
      let service;
      let serviceAddons;
      let test = _`${dataAddons}.findIndex(item => item.id === "DLV00" || item.id === "DLV09" || item.id === "DLV21")`;

      gen.if(
        _`${test} > -1`,
        () => {
          delivery = _`${dataAddons}[${test}].id`;
          service = _`this.services[this.services.findIndex(item => item.serviceCode === ${dataService} && item.mandatoryAddon === ${delivery})]`;
          gen.if(
            _`typeof ${service} !== "undefined"`,
            () => {
              serviceAddons = _`${service}.addons`;
              gen.code(_`${serviceAddons}.push(${delivery})`);
              gen.code(_`${out}["service"] = ${service}`);
              gen.code(_`${out}["addons"] = ${serviceAddons}`);
              gen.code(_`${out}["routes"] = ${service}.routes`);
              gen.code(_`${out}["delivery"] = ${delivery}`);
            },
            () => {
              gen.code(_`${out}["status"] = false`);
            }
          );
        },
        () => {
          delivery = str``;
          service = _`this.services[this.services.findIndex(item => item.serviceCode === ${dataService} && !item.mandatoryAddon)]`;
          gen.if(
            _`typeof ${service} !== "undefined"`,
            () => {
              serviceAddons = _`${service}.addons`;
              gen.code(_`${out}["service"] = ${service}`);
              gen.code(_`${out}["addons"] = ${serviceAddons}`);
              gen.code(_`${out}["routes"] = ${service}.routes`);
              gen.code(_`${out}["delivery"] = ${delivery}`);
            },
            () => {
              gen.code(_`${out}["status"] = false`);
            }
          );
        }
      );

      return out;
    }

    function validateServiceAddons() {
      gen.assign(valid, true);
      gen.if(
        _`typeof ${dataService} !== "undefined" && typeof ${dataAddons} !== "undefined"`,
        () => {
          const i = gen.let("i", _`${dataAddons}.length`);
          const j = gen.let("j");

          let serviceData = getServiceData();
          gen.if(_`${serviceData}.status`, () => {
            let delivery = _`${serviceData}.delivery`;
            serviceRoutes = _`${serviceData}.routes`;
            routes = routeCheck();

            //gen.code(_`console.log(${routes})`);
            gen.if(
              _`${routes}.departure && ${routes}.destination`,
              () => {
                gen.if(_`typeof ${routes}.excluded !== "undefined"`, () => {
                  gen.code(
                    _`${serviceData}.addons = ${serviceData}.addons.filter((e) => !${routes}.excluded.includes(e))`
                  );
                });
                gen.for(_`${j} = ${i}; ${j}--;`, () => {
                  gen.if(
                    _`!${serviceData}.addons.includes(${dataAddons}[${j}].id)`,
                    () => {
                      const addon: string = _`${dataAddons}[${j}].id`;
                      const service: string = _`${dataService}`;
                      deliveryMethod = str`${delivery}`;

                      const issue = _`${dataAddons}[${j}].id`;
                      const path = str`service/addons/${j}/id`;
                      gen.if(
                        _`${delivery}.length > 0`,
                        () => {
                          const message = str`Additional service '${addon}' cannot be used together with service '${service} + ${deliveryMethod}' on route ${departure}-${destination}'`;
                          cxt.setParams({
                            message,
                            issue,
                            path,
                          });
                          cxt.error();
                          gen.assign(valid, false);
                        },
                        () => {
                          const message = str`Additional service '${addon}' cannot be used together with service '${service}' on route ${departure}-${destination}'`;
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
              },
              () => {
                gen.if(
                  _`!${routes}.departure`,
                  () => {
                    const addon: string = str``;
                    const service: string = _`${dataService}`;
                    const deliveryMethod: string = str``;
                    const allowedCountries = _`${routes}.depArr.toString()`;
                    const path = str`sender/country`;
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
                    const addon: string = str``;
                    const service: string = _`${dataService}`;
                    const deliveryMethod: string = str``;
                    const allowedCountries = _`${routes}.destArr.toString()`;
                    const path = str`receiver/country`;
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
        }
      );
    }

    cxt.block$data(valid, validateServiceAddons, _`${schemaCode} === false`);
  },
};

export default serviceAddonsCheck;
