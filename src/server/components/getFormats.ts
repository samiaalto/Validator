const fileFormats = require("../fileFormats.json");

const getFormats = async () => {
  let out = [];

  for (let record of fileFormats.records) {
    if (!out || !out.some((x) => x.value === record.Name)) {
      out.push({
        value: record.Name,
        title: record.Name,
        subTitle: record.Name + "_desc",
        keyWords: "",
      });
    }
  }
  return out;
};

export default getFormats;
