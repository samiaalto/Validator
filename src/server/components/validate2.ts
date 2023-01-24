const Ajv = require("ajv");
const ajv = new Ajv({ $data: true, allErrors: true });

const validate2 = (data: string) => {
  const schema = {
    definitions: {
      addonExclusion: {
        if: {
          properties: {
            service: {
              properties: {
                addons: {
                  contains: {
                    properties: {
                      id: {
                        enum: ["COD"],
                      },
                    },
                    required: ["id"],
                  },
                },
              },
            },
          },
        },
        then: {
          properties: {
            service: {
              properties: {
                addons: {
                  items: {
                    properties: {
                      id: {
                        not: {
                          enum: ["DLVSPC", "OPAY"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      serviceAddonCheck: {
        if: {
          properties: {
            service: {
              properties: {
                id: {
                  enum: ["PO2101"],
                },
              },
              required: ["id"],
            },
          },
        },
        then: {
          properties: {
            service: {
              properties: {
                addons: {
                  items: {
                    properties: {
                      id: {
                        enum: ["REG1", "COD"],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      checkMobile: {
        if: {
          properties: {
            service: {
              properties: {
                addons: {
                  contains: {
                    properties: {
                      id: {
                        enum: ["DLVSPC", "REG"],
                      },
                    },
                    required: ["id"],
                  },
                },
              },
            },
          },
        },
        then: {
          properties: {
            receiver: {
              required: ["mobile"],
            },
          },
        },
      },
    },
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Root",
    type: "object",
    properties: {
      pdfConfig: {
        $id: "#root/pdfConfig",
        title: "pdfConfig",
        type: "object",
        properties: {
          target1XOffset: {
            $id: "#root/pdfConfig/target1XOffset",
            title: "target1XOffset",
            type: "number",
          },
          target1YOffset: {
            $id: "#root/pdfConfig/target1YOffset",
            title: "target1YOffset",
            type: "number",
          },
          target1Media: {
            $id: "#root/pdfConfig/target1Media",
            title: "target1Media",
            type: "string",
          },
          target2XOffset: {
            $id: "#root/pdfConfig/target2XOffset",
            title: "target2XOffset",
            type: "number",
          },
          target2YOffset: {
            $id: "#root/pdfConfig/target2YOffset",
            title: "target2YOffset",
            type: "number",
          },
          target2Media: {
            $id: "#root/pdfConfig/target2Media",
            title: "target2Media",
            type: "string",
          },
          target3XOffset: {
            $id: "#root/pdfConfig/target3XOffset",
            title: "target3XOffset",
            type: "number",
          },
          target3YOffset: {
            $id: "#root/pdfConfig/target3YOffset",
            title: "target3YOffset",
            type: "number",
          },
          target3Media: {
            $id: "#root/pdfConfig/target3Media",
            title: "target3Media",
            type: "string",
          },
          target4XOffset: {
            $id: "#root/pdfConfig/target4XOffset",
            title: "target4XOffset",
            type: "number",
          },
          target4YOffset: {
            $id: "#root/pdfConfig/target4YOffset",
            title: "target4YOffset",
            type: "number",
          },
          target4Media: {
            $id: "#root/pdfConfig/target4Media",
            title: "target4Media",
            type: "string",
          },
        },
        required: ["target1Media", "target2Media"],
      },
      shipment: {
        $id: "#root/shipment",
        title: "shipment",
        type: "object",
        properties: {
          favorite: {
            $id: "#root/shipment/favorite",
            title: "favorite",
            type: "string",
          },
          freeText1: {
            $id: "#root/shipment/freeText1",
            title: "freeText1",
            type: "string",
          },
          freeText2: {
            $id: "#root/shipment/freeText2",
            title: "freeText2",
            type: "string",
          },
          freeText3: {
            $id: "#root/shipment/freeText3",
            title: "freeText3",
            type: "string",
          },
          freeText4: {
            $id: "#root/shipment/freeText4",
            title: "freeText4",
            type: "string",
          },
          orderNo: {
            $id: "#root/shipment/orderNo",
            title: "orderNo",
            type: "string",
          },
          parcels: {
            $id: "#root/shipment/parcels",
            title: "parcels",
            type: "array",
            items: {
              $id: "#root/shipment/parcels/items",
              title: "items",
              type: "object",
              properties: {
                contents: {
                  $id: "#root/shipment/parcels/items/contents",
                  title: "contents",
                  type: "string",
                },
                copies: {
                  $id: "#root/shipment/parcels/items/copies",
                  title: "copies",
                  type: "number",
                },
                packageCode: {
                  $id: "#root/shipment/parcels/items/packageCode",
                  title: "packageCode",
                  type: "string",
                },
                weight: {
                  $id: "#root/shipment/parcels/items/weight",
                  title: "stackable",
                  type: "number",
                },
                height: {
                  $id: "#root/shipment/parcels/items/height",
                  title: "height",
                  type: "number",
                },
                width: {
                  $id: "#root/shipment/parcels/items/width",
                  title: "width",
                  type: "number",
                },
                length: {
                  $id: "#root/shipment/parcels/items/length",
                  title: "length",
                  type: "number",
                },
                loadingMeters: {
                  $id: "#root/shipment/parcels/items/loadingMeters",
                  title: "loadingMeters",
                  type: "number",
                },
                marking: {
                  $id: "#root/shipment/parcels/items/marking",
                  title: "marking",
                  type: "string",
                },
                valuePerParcel: {
                  $id: "#root/shipment/parcels/items/valuePerParcel",
                  title: "valuePerParcel",
                  type: "string",
                },
                volume: {
                  $id: "#root/shipment/parcels/items/volume",
                  title: "volume",
                  type: "number",
                },
                dangerousGoods: {
                  $id: "#root/shipment/parcels/items/dangerousGoods",
                  title: "dangerousGoods",
                  type: "object",
                  properties: {
                    unCode: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/unCode",
                      title: "unCode",
                      type: "string",
                    },
                    hazardCode: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/hazardCode",
                      title: "hazardCode",
                      type: "string",
                    },
                    packageCode: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/packageCode",
                      title: "packageCode",
                      type: "string",
                    },
                    description: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/description",
                      title: "description",
                      type: "string",
                    },
                    adrClass: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/adrClass",
                      title: "adrClass",
                      type: "string",
                    },
                    netWeight: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/netWeight",
                      title: "netWeight",
                      type: "number",
                    },
                    trCode: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/trCode",
                      title: "trCode",
                      type: "string",
                    },
                    quantity: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/quantity",
                      title: "quantity",
                      type: "string",
                    },
                    packageType: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/packageType",
                      title: "packageType",
                      type: "string",
                    },
                    technicalDescr: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/technicalDescr",
                      title: "technicalDescr",
                      type: "string",
                    },
                    mpCode: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/mpCode",
                      title: "mpCode",
                      type: "string",
                    },
                    limitedQuantities: {
                      $id: "#root/shipment/parcels/items/dangerousGoods/limitedQuantities",
                      title: "limitedQuantities",
                      type: "boolean",
                    },
                  },
                  required: ["unCode", "hazardCode", "netWeight"],
                },
              },
              required: ["copies", "packageCode"],
            },
          },
          delivery: {
            $id: "#root/shipment/delivery",
            title: "delivery",
            type: "object",
            properties: {
              name: {
                $id: "#root/shipment/delivery/name",
                title: "name",
                type: "string",
              },
              mobile: {
                $id: "#root/shipment/delivery/mobile",
                title: "mobile",
                type: "string",
              },
              phone: {
                $id: "#root/shipment/delivery/phone",
                title: "phone",
                type: "string",
              },
              address1: {
                $id: "#root/shipment/delivery/address1",
                title: "address1",
                type: "string",
              },
              zipcode: {
                $id: "#root/shipment/delivery/zipcode",
                title: "zipcode",
                type: "string",
              },
              city: {
                $id: "#root/shipment/delivery/city",
                title: "city",
                type: "string",
              },
              country: {
                $id: "#root/shipment/delivery/country",
                title: "country",
                type: "string",
              },
            },
            required: ["name", "address1", "zipcode", "city", "country"],
          },
          dispatch: {
            $id: "#root/shipment/dispatch",
            title: "dispatch",
            type: "object",
            properties: {
              name: {
                $id: "#root/shipment/dispatch/name",
                title: "name",
                type: "string",
              },
              mobile: {
                $id: "#root/shipment/dispatch/mobile",
                title: "mobile",
                type: "string",
              },
              phone: {
                $id: "#root/shipment/dispatch/phone",
                title: "phone",
                type: "string",
              },
              address1: {
                $id: "#root/shipment/dispatch/address1",
                title: "address1",
                type: "string",
              },
              zipcode: {
                $id: "#root/shipment/dispatch/zipcode",
                title: "zipcode",
                type: "string",
              },
              city: {
                $id: "#root/shipment/dispatch/city",
                title: "city",
                type: "string",
              },
              country: {
                $id: "#root/shipment/dispatch/country",
                title: "country",
                type: "string",
              },
            },
            required: ["name", "address1", "zipcode", "city", "country"],
          },
          freightPayer: {
            $id: "#root/shipment/freightPayer",
            title: "freightPayer",
            type: "object",
            properties: {
              name: {
                $id: "#root/shipment/freightPayer/name",
                title: "name",
                type: "string",
              },
              mobile: {
                $id: "#root/shipment/freightPayer/mobile",
                title: "mobile",
                type: "string",
              },
              phone: {
                $id: "#root/shipment/freightPayer/phone",
                title: "phone",
                type: "string",
              },
              address1: {
                $id: "#root/shipment/freightPayer/address1",
                title: "address1",
                type: "string",
              },
              zipcode: {
                $id: "#root/shipment/freightPayer/zipcode",
                title: "zipcode",
                type: "string",
              },
              city: {
                $id: "#root/shipment/freightPayer/city",
                title: "city",
                type: "string",
              },
              country: {
                $id: "#root/shipment/freightPayer/country",
                title: "country",
                type: "string",
              },
            },
            required: ["name", "address1", "zipcode", "city", "country"],
          },
          receiver: {
            $id: "#root/shipment/receiver",
            title: "receiver",
            type: "object",
            properties: {
              name: {
                $id: "#root/shipment/receiver/name",
                title: "name",
                type: "string",
              },
              mobile: {
                $id: "#root/shipment/receiver/mobile",
                title: "mobile",
                type: "string",
              },
              email: {
                $id: "#root/shipment/receiver/email",
                title: "email",
                type: "string",
              },
              phone: {
                $id: "#root/shipment/receiver/phone",
                title: "phone",
                type: "string",
              },
              address1: {
                $id: "#root/shipment/receiver/address1",
                title: "address1",
                type: "string",
              },
              zipcode: {
                $id: "#root/shipment/receiver/zipcode",
                title: "zipcode",
                type: "string",
              },
              city: {
                $id: "#root/shipment/receiver/city",
                title: "city",
                type: "string",
              },
              country: {
                $id: "#root/shipment/receiver/country",
                title: "country",
                type: "string",
              },
            },
            required: ["name", "address1", "zipcode", "city", "country"],
          },
          receiverReference: {
            $id: "#root/shipment/receiverReference",
            title: "receiverReference",
            type: "string",
          },
          agent: {
            $id: "#root/shipment/agent",
            title: "agent",
            type: "object",
            properties: {
              quickId: {
                $id: "#root/shipment/agent/quickId",
                title: "quickId",
                type: "string",
              },
            },
            required: ["quickId"],
          },
          sender: {
            $id: "#root/shipment/sender",
            title: "sender",
            type: "object",
            properties: {
              name: {
                $id: "#root/shipment/sender/name",
                title: "name",
                type: "string",
              },
              phone: {
                $id: "#root/shipment/sender/phone",
                title: "phone",
                type: "string",
              },
              mobile: {
                $id: "#root/shipment/sender/mobile",
                title: "mobile",
                type: "string",
              },
              email: {
                $id: "#root/shipment/sender/email",
                title: "email",
                type: "string",
              },
              address1: {
                $id: "#root/shipment/sender/address1",
                title: "address1",
                type: "string",
              },
              zipcode: {
                $id: "#root/shipment/sender/zipcode",
                title: "zipcode",
                type: "string",
              },
              city: {
                $id: "#root/shipment/sender/city",
                title: "city",
                type: "string",
              },
              country: {
                $id: "#root/shipment/sender/country",
                title: "country",
                type: "string",
              },
            },
            required: ["name", "address1", "zipcode", "city", "country"],
          },
          senderPartners: {
            $id: "#root/shipment/senderPartners",
            title: "senderPartners",
            type: "array",
            items: {
              $id: "#root/shipment/senderPartners/items",
              title: "items",
              type: "object",
              properties: {
                id: {
                  $id: "#root/shipment/senderPartners/items/id",
                  title: "id",
                  type: "string",
                },
                custNo: {
                  $id: "#root/shipment/senderPartners/items/custNo",
                  title: "custNo",
                  type: "string",
                },
              },
              required: ["id", "custNo"],
            },
          },
          senderReference: {
            $id: "#root/shipment/senderReference",
            title: "senderReference",
            type: "string",
          },
          service: {
            $id: "#root/shipment/service",
            title: "service",
            type: "object",
            properties: {
              id: {
                $id: "#root/shipment/service/id",
                title: "id",
                type: "string",
              },
              pickupBooking: {
                $id: "#root/shipment/service/pickupBooking",
                title: "pickupBooking",
                type: "boolean",
              },
              pickupDate: {
                $id: "#root/shipment/service/pickupDate",
                title: "pickupDate",
                type: "string",
              },
              pickupTimeFrom: {
                $id: "#root/shipment/service/pickupTimeFrom",
                title: "pickupTimeFrom",
                type: "string",
              },
              pickupTimeTo: {
                $id: "#root/shipment/service/pickupTimeTo",
                title: "pickupTimeTo",
                type: "string",
              },
              pickupText1: {
                $id: "#root/shipment/service/pickupText1",
                title: "pickupText1",
                type: "string",
              },
              pickupMisc: {
                $id: "#root/shipment/service/pickupMisc",
                title: "pickupMisc",
                type: "string",
              },
              customsDeclaration: {
                $id: "#root/shipment/service/customsDeclaration",
                title: "customsDeclaration",
                type: "object",
                properties: {
                  printSet: {
                    $id: "#root/shipment/service/customsDeclaration/printSet",
                    title: "printSet",
                    type: "string",
                  },
                  invoiceType: {
                    $id: "#root/shipment/service/customsDeclaration/invoiceType",
                    title: "InvoiceType",
                    type: "string",
                  },
                  invoiceNo: {
                    $id: "#root/shipment/service/customsDeclaration/invoiceNo",
                    title: "invoiceNo",
                    type: "string",
                  },
                  currencyCode: {
                    $id: "#root/shipment/service/customsDeclaration/currencyCode",
                    title: "currencyCode",
                    type: "string",
                  },
                  importExportType: {
                    $id: "#root/shipment/service/customsDeclaration/importExportType",
                    title: "importExportType",
                    type: "string",
                  },
                  parcelCount: {
                    $id: "#root/shipment/service/customsDeclaration/parcelCount",
                    title: "parcelCount",
                    type: "string",
                  },
                  generalNote1: {
                    $id: "#root/shipment/service/customsDeclaration/generalNote1",
                    title: "generalNote1",
                    type: "string",
                  },
                  generalNote2: {
                    $id: "#root/shipment/service/customsDeclaration/generalNote2",
                    title: "generalNote2",
                    type: "string",
                  },
                  generalNote3: {
                    $id: "#root/shipment/service/customsDeclaration/generalNote3",
                    title: "generalNote3",
                    type: "string",
                  },
                  generalNote4: {
                    $id: "#root/shipment/service/customsDeclaration/generalNote4",
                    title: "generalNote4",
                    type: "string",
                  },
                  lines: {
                    $id: "#root/shipment/service/customsDeclaration/lines",
                    title: "lines",
                    type: "array",
                    items: {
                      $id: "#root/shipment/service/customsDeclaration/lines/items",
                      title: "items",
                      type: "object",
                      properties: {
                        statNo: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/statNo",
                          title: "statNo",
                          type: "string",
                        },
                        subStatNo1: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/subStatNo1",
                          title: "subStatNo1",
                          type: "string",
                        },
                        copies: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/copies",
                          title: "copies",
                          type: "string",
                        },
                        value: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/value",
                          title: "value",
                          type: "string",
                        },
                        valuesPerItem: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/valuesPerItem",
                          title: "valuesPerItem",
                          type: "boolean",
                        },
                        contents: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/contents",
                          title: "contents",
                          type: "string",
                        },
                        netWeight: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/netWeight",
                          title: "netWeight",
                          type: "string",
                        },
                        sourceCountryCode: {
                          $id: "#root/shipment/service/customsDeclaration/lines/items/sourceCountryCode",
                          title: "sourceCountryCode",
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              normalShipment: {
                $id: "#root/shipment/service/normalShipment",
                title: "normalShipment",
                type: "boolean",
              },
              addons: {
                $id: "#root/shipment/service/addons",
                title: "addons",
                type: "array",
                items: {
                  $id: "#root/shipment/service/addons/items",
                  title: "items",
                  type: "object",
                  properties: {
                    id: {
                      $id: "#root/shipment/service/addons/items/id",
                      title: "id",
                      type: "string",
                    },
                    misc: {
                      $id: "#root/shipment/service/addons/items/misc",
                      title: "misc",
                      type: "string",
                    },
                    custNo: {
                      $id: "#root/shipment/service/addons/items/custNo",
                      title: "custNo",
                      type: "string",
                    },
                    declarant: {
                      $id: "#root/shipment/service/addons/items/declarant",
                      title: "declarant",
                      type: "string",
                    },
                    amount: {
                      $id: "#root/shipment/service/addons/items/amount",
                      title: "amount",
                      type: "string",
                    },
                    account: {
                      $id: "#root/shipment/service/addons/items/account",
                      title: "account",
                      type: "string",
                    },
                    accounttype: {
                      $id: "#root/shipment/service/addons/items/accounttype",
                      title: "accounttype",
                      type: "string",
                    },
                    bank: {
                      $id: "#root/shipment/service/addons/items/bank",
                      title: "bank",
                      type: "string",
                    },
                    text3: {
                      $id: "#root/shipment/service/addons/items/text3",
                      title: "text3",
                      type: "string",
                    },
                    date: {
                      $id: "#root/shipment/service/addons/items/date",
                      title: "date",
                      type: "string",
                    },
                  },
                  if: {
                    properties: {
                      id: {
                        const: "COD",
                      },
                    },
                    required: ["id"],
                  },
                  then: {
                    required: ["bank"],
                  },
                },
              },
            },
            required: ["id", "normalShipment"],
          },
        },
        allOf: [
          {
            $ref: "#/definitions/checkMobile",
          },
          {
            $ref: "#/definitions/addonExclusion",
          },
        ],
        required: [
          "parcels",
          "receiver",
          "sender",
          "senderPartners",
          "service",
        ],
      },
    },
    required: ["pdfConfig", "shipment"],
  };

  console.log(JSON.stringify(schema));

  const validate = ajv.compile(schema);

  const valid = validate(data);
  if (!valid) return validate.errors;
};
export default validate2;
