import React from "react";
import { Row, Col } from "react-bootstrap";
import alertLogo from "./icons/alert.svg";
import SVG from "react-inlinesvg";
import { fetchData } from "./FetchData";
//const resource = fetchData("test");
const Test = ({ resource }) => {
  const response = resource.read();
  response.errors.sort((a, b) => a.row - b.row);

  const scrollTo = (position) => {
    if (position) {
      const element = document.querySelector(".highlighter");
      const row = document.querySelector(".row_" + position);

      if (row !== null) {
        let headerOffset = 100;
        let rowPosition = row.offsetTop;
        let elementPosition = element.offsetTop;

        let offsetPosition = elementPosition + rowPosition - headerOffset;

        element.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        let result_element = document.querySelector(".inputTextArea");
        // Get and set x and y
        result_element.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {response && !response.valid ? (
        response.errors.map((e, i) => (
          <div
            className="error-card"
            key={i}
            onClick={(d) => {
              scrollTo(e.row);
            }}
          >
            <Row>
              <Col className="error-message" key={i + "_message"}>
                {e.message}
              </Col>
              <Col xs={1} className="error-alert" key={i + "_alert"}></Col>
            </Row>
            <Row>
              <Col
                xs={2}
                sm={1}
                className="error-title"
                key={i + "_path-title"}
              >
                Path
              </Col>
              <Col className="error-path" key={i + "_path"}>
                {e.instancePath}
              </Col>
            </Row>
            {e.row ? (
              <Row>
                <Col
                  xs={2}
                  sm={1}
                  className="error-title"
                  key={i + "_row-title"}
                >
                  Row
                </Col>
                <Col className="error-row" key={i + "_row"}>
                  {e.row}
                </Col>
              </Row>
            ) : (
              ""
            )}
          </div>
        ))
      ) : response && response.valid ? (
        <div className="ok-card">
          <Col className="ok-message">No errors found!</Col>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Test;
