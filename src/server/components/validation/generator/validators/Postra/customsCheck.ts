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
  params: ({ params: { type, field } }: any) =>
    _`{type: ${type}, field: ${field}}`,
};

const customsCheck: testData = {
  keyword: "customsCheck",
  error,
  code(cxt: KeywordCxt) {
    const { data, gen, schemaCode } = cxt;

    const valid = gen.let("valid");
    cxt.ok(valid);

    function validatePath(data, destination) {
      let output = gen.let("output", _`[]`);
      let object = _`${data}.CustomsDetails`;

      gen.if(_`typeof ${object} === "undefined"`, () => {
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
      });

      return output;
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

    function validateCustomsFields() {
      gen.assign(valid, true);

      gen.if(_`typeof ${data} !== "undefined"`, () => {
        const i = gen.let("i", _`${data}.length`);
        const j = gen.let("j");
        gen.for(_`${j} = ${i}; ${j}--;`, () => {
          let shipment = gen.let("shipment", _`${data}[${j}]`);
          let route = getRoute(shipment);
          let destination = gen.let("destination", _`${route}.destination`);

          gen.if(_`!this.euCountries.includes(${destination})`, () => {
            const k = gen.let("k", _`${shipment}.GoodsItems.GoodsItem.length`);
            const l = gen.let("l");
            gen.for(_`${l} = ${k}; ${l}--;`, () => {
              let goodsItem = _`${shipment}.GoodsItems.GoodsItem[${l}]`;
              let notValid = validatePath(_`${goodsItem}`, _`${destination}`);
            });
          });
        });
      });
    }

    cxt.block$data(valid, validateCustomsFields, _`${schemaCode} === false`);
  },
};

export default customsCheck;
