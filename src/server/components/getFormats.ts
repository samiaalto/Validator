const fileFormats = require("../fileFormats.json");

interface outData {
  value: string;
  title: string;
  subTitle: string;
  type: string;
  keyWords: string;
}

interface out extends Array<outData> {}

const getFormats = async () => {
  let out: out = [];

  for (let record of fileFormats.records) {
    if (!out || !out.some((x) => x.value === record.Name)) {
      out.push({
        value: record.Name,
        title: record.Name,
        subTitle: record.Name + "_desc",
        type: record.MessageFormat,
        keyWords: "",
      });
    }
  }
  return out;
};

export default getFormats;
