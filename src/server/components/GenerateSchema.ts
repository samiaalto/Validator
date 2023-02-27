const fileFormats = require("../fileFormats.json");
const smartship_ext = require("./validation/validation-modules/validate-smartship.json");

const generateSchema = (fileFormat: string) => {
  function set(obj, path, value) {
    // protect against being something unexpected
    obj = typeof obj === "object" ? obj : {};
    // split the path into and array if its not one already
    var keys = Array.isArray(path) ? path : path.split(".");
    // keep up with our current place in the object
    // starting at the root object and drilling down
    var curStep = obj;
    // loop over the path parts one at a time
    // but, dont iterate the last part,
    for (var i = 0; i < keys.length - 1; i++) {
      // get the current path part
      var key = keys[i];

      // if nothing exists for this key, make it an empty object or array
      if (
        !curStep[key] &&
        !Object.prototype.hasOwnProperty.call(curStep, key)
      ) {
        // get the next key in the path, if its numeric, make this property an empty array
        // otherwise, make it an empty object
        var nextKey = keys[i + 1];
        var useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
        curStep[key] = useArray ? [] : {};
      }
      // update curStep to point to the new level
      curStep = curStep[key];
    }
    // set the final key to our value
    var finalStep = keys[keys.length - 1];
    //if (value) {
    curStep[finalStep] = value;
    //} else {
    //  curStep = curStep[finalStep];
    //}
  }

  let outJSON: any = {};

  const addProps = (data, arrays, type): void => {
    let dataArr: any = data.split(".").filter((e) => e !== "0");
    let out: any;
    let outArr: any = [];
    for (let i = 0; i < dataArr.length; i++) {
      if (type === "path") {
        if (i !== dataArr.length - 1 && !arrays.includes(dataArr[i])) {
          outArr.push(dataArr[i], "properties");
        } else if (i !== dataArr.length - 1 && arrays.includes(dataArr[i])) {
          outArr.push(dataArr[i], "items", "properties");
        } else if (i === dataArr.length - 1 && arrays.includes(dataArr[i])) {
          outArr.push(dataArr[i], "items");
        } else {
          outArr.push(dataArr[i]);
        }
      } else {
        if (i !== dataArr.length - 1 && arrays.includes(dataArr[i])) {
          outArr.push(dataArr[i], "items");
        } else {
          outArr.push(dataArr[i]);
        }
      }
    }
    if (type === "path") {
      out = "properties." + outArr.join(".");
    } else {
      out = "#root/" + outArr.join("/");
    }
    return out;
  };

  for (let record of fileFormats.records) {
    if (record.Name === fileFormat && fileFormat === "SMARTSHIP") {
      outJSON["definitions"] = {};
      outJSON["$schema"] = "http://json-schema.org/draft-07/schema#";
      outJSON["$id"] = record.Name + " schema generated by Posti Oyj";
      outJSON["title"] = "Root";
      outJSON["type"] = "object";

      let required = {};
      let arrays = [];
      for (let property of record.Records) {
        let splitPath = property.Path.split(".").filter((e) => e !== "0");
        let parentPath;
        let propsArr = [];
        let propsPath = addProps(property.Path, arrays, "path");
        let filePath = addProps(property.Path, arrays, "file");

        if (property.Mandatory) {
          if (splitPath.length > 1) {
            parentPath = splitPath.slice(0, -1).join(".");
          }

          if (!required.hasOwnProperty(parentPath)) {
            required[parentPath] = [property.Name];
          } else {
            required[parentPath].push(property.Name);
          }
        }

        propsArr.push(
          {
            path: propsPath + ".$id",
            value: filePath,
          },
          { path: propsPath + ".title", value: property.Name },
          {
            path: propsPath + ".type",
            value:
              property.Type === "DateTime"
                ? "string"
                : property.Type.toLowerCase(),
          }
        );

        if (property.Type === "Array") {
          arrays.push(property.Name);

          propsArr.push(
            {
              path: propsPath + ".items.$id",
              value: filePath + "/items",
            },
            { path: propsPath + ".items.title", value: "items" },
            {
              path: propsPath + ".items.type",
              value: "object",
            }
          );
        }

        if (property.Validations.length > 0) {
          for (let item of property.Validations) {
            let path = propsPath + "." + item.validation;
            if (
              item.validation === "serviceAddonsCheck" ||
              item.validation === "mandatoryFieldsCheck" ||
              item.validation === "customsCheck"
            ) {
              path = "properties.shipment." + item.validation;
            }
            propsArr.push({
              path: path,
              value: true,
            });
          }
        }

        for (let item of propsArr) {
          set(outJSON, item.path, item.value);
        }
      }

      Object.keys(required).forEach((key) => {
        if (key === "undefined") {
          outJSON["required"] = required[key];
        } else {
          set(
            outJSON,
            addProps(key, arrays, "path") + ".required",
            required[key]
          );
        }
      });
    } else if (
      record.Name === fileFormat &&
      fileFormat === "POSTRA_PARCEL" &&
      record.MessageFormat === "JSON"
    ) {
      outJSON["definitions"] = {};
      outJSON["$schema"] = "http://json-schema.org/draft-07/schema#";
      outJSON["$id"] = record.Name + " schema generated by Posti Oyj";
      outJSON["title"] = "Root";
      outJSON["type"] = "object";

      let required = {};
      let arrays = [];
      for (let property of record.Records) {
        let splitPath = property.Path.split(".").filter((e) => e !== "0");
        let parentPath;
        let propsArr = [];
        let propsPath = addProps(property.Path, arrays, "path");
        let filePath = addProps(property.Path, arrays, "file");

        if (property.Mandatory) {
          if (splitPath.length > 1) {
            parentPath = splitPath.slice(0, -1).join(".");
          }

          if (!required.hasOwnProperty(parentPath)) {
            required[parentPath] = [property.Name];
          } else {
            required[parentPath].push(property.Name);
          }
        }

        propsArr.push(
          {
            path: propsPath + ".$id",
            value: filePath,
          },
          { path: propsPath + ".title", value: property.Name },
          {
            path: propsPath + ".type",
            value:
              property.Type === "DateTime" ||
              property.Type === "ISO8601" ||
              property.Type === "Decimal" ||
              property.Type === "Attribute" ||
              property.Type === "String"
                ? "string"
                : property.Type.toLowerCase(),
          }
        );

        if (property.Type === "Array") {
          arrays.push(property.Name);

          propsArr.push(
            {
              path: propsPath + ".items.$id",
              value: filePath + "/items",
            },
            { path: propsPath + ".items.title", value: "items" },
            {
              path: propsPath + ".items.type",
              value: "object",
            }
          );
        }

        if (property.Validations.length > 0) {
          for (let item of property.Validations) {
            if (item.validation) {
              let path = propsPath + "." + item.validation;
              if (
                item.validation === "serviceAddonsCheck" ||
                item.validation === "mandatoryFieldsCheck" ||
                item.validation === "customsCheck"
              ) {
                path =
                  "properties.Postra.properties.Shipments.properties.Shipment." +
                  item.validation;
              }
              propsArr.push({
                path: path,
                value: true,
              });
            }
          }
        }

        for (let item of propsArr) {
          set(outJSON, item.path, item.value);
        }
      }

      Object.keys(required).forEach((key) => {
        if (key === "undefined") {
          outJSON["required"] = required[key];
        } else {
          set(
            outJSON,
            addProps(key, arrays, "path") + ".required",
            required[key]
          );
        }
      });
    }
  }

  //console.dir(outJSON, { depth: null });
  console.log(JSON.stringify(outJSON));
  return outJSON;
};

export default generateSchema;
