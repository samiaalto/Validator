const validate_smartship = require("./validation/validation-modules/validate-smartship-cjs");
const smartship_ext = require("./validation/validation-modules/validate-smartship.json");

const validate3 = async (data: string, fileFormat: string) => {
  const getDataValue = (obj, path) => {
    return path.reduce((o, key) => o && o[key], obj);
  };

  const findErrorRows = (input, errors, parsedInput) => {
    let out = [];
    let eRows = [];
    let rows = input.split("\n");

    for (let j = 0; j < errors.length; j++) {
      if (
        errors[j].keyword === "mandatoryFieldsCheck" ||
        errors[j].keyword === "customsCheck" ||
        errors[j].keyword === "required"
      ) {
        errors[j]["row"] = 0;
        out.push(errors[j]);
      } else {
        let splitPath = errors[j].instancePath.split("/");
        splitPath.shift();
        let prop = splitPath[splitPath.length - 1];
        let value;

        if (
          errors[j].keyword === "serviceAddonsCheck" ||
          errors[j].keyword === "additonalServiceExclutionCheck"
        ) {
          let splitPropPath = errors[j].params.path.split("/");
          errors[j]["instancePath"] =
            errors[j].instancePath + "/" + errors[j].params.path;
          prop = splitPropPath[splitPropPath.length - 1];
          value = errors[j].params.issue;
        } else if (splitPath.length > 1) {
          value = getDataValue(parsedInput, splitPath);
        }

        for (let i = 0; i < rows.length; i++) {
          if (
            rows[i].includes(prop) &&
            rows[i].includes(value) &&
            !eRows.includes(j + "_" + (i + 1)) &&
            !out.includes(errors[j])
          ) {
            errors[j]["row"] = i + 1;
            eRows.push(j + "_" + (i + 1));
            out.push(errors[j]);
          }
        }
      }
    }
    return out;
  };

  const findErrorRow = (input, position) => {
    let rows = input.split("\n");
    if (position > 0) {
      let length = 0;
      for (let i = 0; i < rows.length; i++) {
        length += rows[i].length + 1;
        if (length >= position) return i + 1;
      }
    } else {
      return 1;
    }
  };

  try {
    const parsedData = JSON.parse(data);

    if (fileFormat === "SMARTSHIP") {
      let validate = await validate_smartship;

      if (!validate.call(smartship_ext, parsedData)) {
        let errors = findErrorRows(data, validate.errors, parsedData);
        //console.log(validate.errors);
        return { valid: false, errors: errors };
      } else return { valid: true };
    }
  } catch (error) {
    let found = error.message.indexOf("position");
    let position = -1;
    let errorLine;
    if (found > -1) {
      position = Number(
        error.message.substring(found + 9, error.message.length)
      );
    }
    if (position > -1) {
      errorLine = findErrorRow(data, position);
    }
    return {
      valid: false,
      errors: [{ message: "Invalid data: " + error.message, row: errorLine }],
    };
  }
};

export default validate3;
