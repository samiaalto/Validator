const additionalServices = require("../additionalServices.json");
const services = require("../services.json");
const contracts = require("../contracts.json");
const countries = require("../countries.json");
const postalCodes = require("../postalCodes_FI.json");

interface serviceData {
  type?: string;
  serviceCode?: string;
  mandatoryFields?: mandatoryFieldsArr;
  routes?: routesArr;
  addons?: addonsArr;
}

interface mandatoryFieldsArr extends Array<string> {}
interface routesArr extends Array<string> {}
interface addonsArr extends Array<string> {}

const generateValidationData = (fileFormat: string) => {
  let output = {};
  let out = [];
  let countryArr = [];
  for (let record of services.records) {
    let service: serviceData = {};
    //let formatCodes = [];
    let addons = [];
    let mandatoryFields = [];
    let routes = [];
    let packageTypes = [];

    for (let item of record.Fields) {
      if (fileFormat !== "SMARTSHIP") {
        service["type"] = "service";
        service["serviceCode"] = record.ServiceCode;
      }
      if (item.MessageFormat === fileFormat && item.PropertyName === "id") {
        service["type"] = "service";
        if (item.MessagePosition === "service") {
          service["serviceCode"] = item.PropertyValue;
        } else {
          service["mandatoryAddon"] = item.PropertyValue;
        }
      } else if (
        item.MessageFormat === fileFormat &&
        item.PropertyName !== "id" &&
        item.PropertyName !== "Product" &&
        item.Mandatory
      ) {
        mandatoryFields.push(item.PropertyName);
      }
    }

    for (let item of record.PackageTypesAndDimensions) {
      if (fileFormat === item.MessageFormat) {
        packageTypes.push(item);
      }
    }

    if (fileFormat !== "SMARTSHIP") {
      for (let item of record.AdditionalServices) {
        addons.push(item.Addon);
      }
    } else if (fileFormat === "SMARTSHIP") {
      for (let item of record.AdditionalServices) {
        for (let record of additionalServices.records) {
          if (item.Addon === record.ServiceCode) {
            for (let field of record.Fields) {
              if (
                field.MessageFormat === fileFormat &&
                field.PropertyName === "id"
              )
                addons.push(field.PropertyValue);
            }
          }
        }
      }
    }
    for (let item of record.Routes) {
      let destinations = [];
      for (let dest of item.DestinationCountries) {
        let excluded = [];
        if (dest.ExcludedAdditionalServices.length > 0) {
          for (let exc of dest.ExcludedAdditionalServices) {
            if (fileFormat !== "SMARTSHIP") {
              excluded.push(exc.Addon);
            } else if (fileFormat === "SMARTSHIP") {
              for (let record of additionalServices.records) {
                if (exc.Addon === record.ServiceCode) {
                  for (let field of record.Fields) {
                    if (
                      field.MessageFormat === fileFormat &&
                      field.PropertyName === "id" &&
                      !excluded.includes(field.PropertyValue)
                    )
                      excluded.push(field.PropertyValue);
                  }
                }
              }
            }
          }
        }
        destinations.push({ destination: dest.Country, excluded: excluded });
      }
      routes.push({
        departure: item.DepartureCountry,
        destinations: destinations,
      });
    }
    //service["formatCodes"] = formatCodes;
    service["mandatoryFields"] = mandatoryFields;
    service["routes"] = routes;
    service["addons"] = addons;
    service["packageTypes"] = packageTypes;
    out.push(service);
  }

  for (let record of additionalServices.records) {
    let service = {};
    let mandatoryFields = [];
    let excludedAddons = [];

    for (let item of record.Fields) {
      if (fileFormat !== "SMARTSHIP") {
        service["type"] = "additionalService";
        service["serviceCode"] = record.ServiceCode;
      }
      if (item.MessageFormat === fileFormat && item.PropertyName === "id") {
        service["type"] = "additionalService";
        service["serviceCode"] = item.PropertyValue;
      } else if (
        item.MessageFormat === fileFormat &&
        item.PropertyName !== "id" &&
        item.PropertyName !== "Service" &&
        item.Mandatory
      ) {
        mandatoryFields.push({
          name: item.PropertyName,
          position: item.MessagePosition,
        });
      }
    }

    if (record.ExcludedAdditionalServices.length > 0) {
      for (let item of record.ExcludedAdditionalServices) {
        if (fileFormat !== "SMARTSHIP") {
          excludedAddons.push(item.Addon);
        } else if (fileFormat === "SMARTSHIP") {
          for (let record of additionalServices.records) {
            if (item.Addon === record.ServiceCode) {
              for (let field of record.Fields) {
                if (
                  field.MessageFormat === fileFormat &&
                  field.PropertyName === "id" &&
                  !excludedAddons.includes(field.PropertyValue) &&
                  field.PropertyValue !== service["serviceCode"]
                )
                  excludedAddons.push(field.PropertyValue);
              }
            }
          }
        }
      }
    }

    let uniqueAddons = excludedAddons.filter((element, index) => {
      return excludedAddons.indexOf(element) === index;
    });

    //console.log(uniqueAddons);

    service["mandatoryFields"] = mandatoryFields;
    service["excludedAddons"] = uniqueAddons;
    out.push(service);
  }

  for (let record of countries.records) {
    if (record.Eu) countryArr.push(record.CountryCode);
  }

  output["services"] = out;
  output["contracts"] = contracts;
  output["euCountries"] = countryArr;
  output["postalCodes"] = postalCodes;

  return output;
};

export default generateValidationData;
