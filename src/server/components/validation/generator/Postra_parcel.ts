import generateSchema from "../../GenerateSchema";
import generateValidationData from "../../GenerateValidationData";
import serviceCheck from "./validators/Generic/serviceCheck";
import serviceAddonsCheck from "./validators/Postra/serviceAddonsCheck";
import additionalServiceCheck from "./validators/Generic/additionalServiceCheck";
import additonalServiceExclutionCheck from "./validators/Postra/additonalServiceExclutionCheck";
import mandatoryFieldsCheck from "./validators/Postra/mandatoryFieldsCheck";
import ibanCheck from "./validators/Generic/ibanCheck";
import swiftCheck from "./validators/Generic/swiftCheck";
import ISO8601Check from "./validators/Generic/ISO8601Check";
import ISO8601dateCheck from "./validators/Generic/ISO8601dateCheck";
import ISO8601timeCheck from "./validators/Generic/ISO8601timeCheck";
import trackingcodeCheck from "./validators/Generic/trackingcodeCheck";
import mobileCheck from "./validators/Postra/mobileCheck";
import customsCheck from "./validators/customsCheck";
import contractCheck from "./validators/Postra/contractCheck";
const fs = require("fs");
const Ajv = require("ajv");
const standaloneCode = require("ajv/dist/standalone").default;

const standalone_postra = () => {
  const validationData = generateValidationData("POSTRA_PARCEL");
  const schema = generateSchema("POSTRA_PARCEL");
  //console.dir(validationData, { depth: null });

  // The generated code will have a default export:
  // `module.exports = <validateFunctionCode>;module.exports.default = <validateFunctionCode>;`
  const ajv = new Ajv({
    code: { source: true },
    allErrors: true,
    passContext: true,
    $data: true,
    verbose: false,
  });
  require("ajv-keywords")(ajv);
  require("ajv-errors")(ajv);

  ajv.addKeyword(serviceCheck);
  ajv.addKeyword(serviceAddonsCheck);
  ajv.addKeyword(additionalServiceCheck);
  ajv.addKeyword(additonalServiceExclutionCheck);
  ajv.addKeyword(ibanCheck);
  ajv.addKeyword(swiftCheck);
  ajv.addKeyword(contractCheck);
  ajv.addKeyword(mobileCheck);
  ajv.addKeyword(ISO8601Check);
  ajv.addKeyword(ISO8601dateCheck);
  ajv.addKeyword(ISO8601timeCheck);
  ajv.addKeyword(trackingcodeCheck);
  ajv.addKeyword(mandatoryFieldsCheck);
  //ajv.addKeyword(customsCheck);

  const validate = ajv.compile(schema);
  let moduleCode = standaloneCode(ajv, validate);

  // Now you can write the module code to file
  let dir = "src/server/components/validation/validation-modules";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    `./` + dir + "/validate-postra_parcel-cjs.js",
    moduleCode,
    function (err: any) {
      if (err) {
        return console.log(err);
      }
      console.log("DONE!");
    }
  );
  fs.writeFileSync(
    `./` + dir + "/validate-postra_parcel.json",
    JSON.stringify(validationData),
    function (err: any) {
      if (err) {
        return console.log(err);
      }
      console.log("DONE!");
    }
  );
};

export default standalone_postra;
