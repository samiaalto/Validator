import React from "react";
import { Row, Col } from "react-bootstrap";

const Stats = ({ resource }) => {
  const response = resource ? resource.validation.read() : "";

  return (
    <>
      <Row>
        {response ? "Process time: " + response.processTime + " ms" : ""}
      </Row>
    </>
  );
};

export default Stats;
