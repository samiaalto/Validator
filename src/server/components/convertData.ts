const convertData = (children: any) => {
  let out: any = {};

  if (children.length === 1 && typeof children[0] == "string") {
    return children[0];
  }
  // map each object
  children.forEach(function (child: any) {
    if (typeof child !== "object") {
      return;
    }
    if (!out[child.tagName]) out[child.tagName] = [];
    var kids = convertData(child.children);

    if (Object.keys(child.attributes).length) {
      if (typeof kids === "string") {
        out[child.tagName].push({
          value: kids,
          attr: child.attributes,
        });
      } else {
        out[child.tagName].push(kids);
        kids.attr = child.attributes;
      }
    } else if (child.tagName === "Service") {
      out[child.tagName].push({ value: kids });
    } else {
      out[child.tagName].push(kids);
    }
  });
  let test = [
    "TrackingNumber",
    "Product",
    "value",
    "UnNo",
    "Quantity",
    "MessageFunctionCode",
  ];
  for (var i in out) {
    if (out[i].length == 1) {
      if (test.some((e) => out[i][0].hasOwnProperty(e))) {
        // console.log(out[i]);
      } else if (out[i][0].toString().toLowerCase() === "false") {
        out[i] = false;
      } else if (out[i][0].toString().toLowerCase() === "true") {
        out[i] = true;
      } else {
        out[i] = out[i][0];
      }
    }
  }

  return out;
};

export default convertData;
