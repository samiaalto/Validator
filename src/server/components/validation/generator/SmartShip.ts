import generateSchema from "../../GenerateSchema";
import generateValidationData from "../../GenerateValidationData";
import serviceCheck from "./validators/Generic/serviceCheck";
import serviceAddonsCheck from "./validators/serviceAddonsCheck";
import additionalServiceCheck from "./validators/Generic/additionalServiceCheck";
import additonalServiceExclutionCheck from "./validators/SmartShip/additonalServiceExclutionCheck";
import mandatoryFieldsCheck from "./validators/SmartShip/mandatoryFieldsCheck";
import ibanCheck from "./validators/Generic/ibanCheck";
import swiftCheck from "./validators/Generic/swiftCheck";
import mobileCheck from "./validators/SmartShip/mobileCheck";
import customsCheck from "./validators/SmartShip/customsCheck";
import contractCheck from "./validators/SmartShip/contractCheck";
const fs = require("fs");
const Ajv = require("ajv");
const standaloneCode = require("ajv/dist/standalone").default;

const standalone = () => {
  const validationData = generateValidationData("SMARTSHIP");
  const schema = generateSchema("SMARTSHIP");
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
  ajv.addKeyword(customsCheck);
  ajv.addKeyword(mandatoryFieldsCheck);

  const validate = ajv.compile(schema);
  let moduleCode = standaloneCode(ajv, validate);

  // Now you can write the module code to file
  let dir = "src/server/components/validation/validation-modules";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    `./` + dir + "/validate-smartship-cjs.js",
    moduleCode,
    function (err: any) {
      if (err) {
        return console.log(err);
      }
      console.log("DONE!");
    }
  );
  fs.writeFileSync(
    `./` + dir + "/validate-smartship.json",
    JSON.stringify(validationData),
    function (err: any) {
      if (err) {
        return console.log(err);
      }
      console.log("DONE!");
    }
  );
};

export default standalone;
