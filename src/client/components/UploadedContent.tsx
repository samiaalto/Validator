import React, { useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import monokai from "react-syntax-highlighter/dist/esm/styles/hljs/monokai";
import monokaiSublime from "react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";

const UploadedContent = ({ setData, data, resource, scroll }) => {
  SyntaxHighlighter.registerLanguage("json", json);
  SyntaxHighlighter.registerLanguage("xml", xml);

  const response = resource ? resource.read() : null;
  const rows =
    response && response.errors ? response.errors.map((e) => e.row) : [];

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const sync_scroll = (element) => {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector(".highlighter");
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  };

  const type = "json";
  return (
    <>
      <Row className="uploaded">
        <div className="input-numbers"></div>
        <textarea
          className="inputTextArea"
          placeholder="Copy paste data here"
          onChange={handleChange}
          value={data}
          spellCheck="false"
          onScroll={(e) => {
            sync_scroll(e.target);
          }}
        ></textarea>
        <SyntaxHighlighter
          language={type}
          style={
            type === "xml" ? monokai : type === "json" ? monokaiSublime : ""
          }
          className="highlighter"
          showLineNumbers={true}
          lineNumberStyle={{
            color: "#9f9f9f",
            borderRight: "1px solid #474747",
            marginRight: "10px",
            minWidth: "2.75em",
          }}
          wrapLines={true}
          lineProps={(lineNumber) => {
            let className = "";
            let style = {
              display: "block",
              backgroundColor: "#272822",
            };

            if (rows.includes(lineNumber)) {
              style.backgroundColor = "#510000";
              className = "highlighted row_" + lineNumber;
            }
            return { style, class: className };
          }}
        >
          {Object.entries(data).length > 0 ? data : ""}
        </SyntaxHighlighter>
      </Row>
    </>
  );
};

export default UploadedContent;
