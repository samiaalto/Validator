import React, { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./components/Loader";
import ErrorFallback from "./components/ErrorFallback";
import UploadButton from "./components/UploadButton";
import UploadedContent from "./components/UploadedContent";
import FormatSelect from "./components/FormatSelect";
import Stats from "./components/Stats";
import { fetchData } from "./components/FetchData";
import { Row, Col } from "react-bootstrap";

const Test = React.lazy(() => import("./components/Test"));

const App = (props: AppProps) => {
  const [data, setData] = useState("");
  const [validationResource, setValidationResource] = useState(null);
  const [formatsResource, setFormatsResource] = useState(null);

  const validateData = (data) => {
    setValidationResource(fetchData(data, "validate"));
  };

  const getFileFormatsData = () => {
    setFormatsResource(fetchData("", "fileFormats"));
  };

  useEffect(() => {
    if (data) {
      const timeOutId = setTimeout(() => validateData(data), 100);
      return () => clearTimeout(timeOutId);
    }
  }, [data]);

  useEffect(() => {
    getFileFormatsData();
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of the app
      }}
    >
      <div className="app">
        <div className="container">
          <Row>
            <Col xs={12} sm={7}>
              <Row className="controls">
                <Col xs={12} sm={8} className="upload">
                  <UploadButton />
                </Col>
                <Col xs={12} sm={4} className="format">
                  {formatsResource ? (
                    <FormatSelect resource={formatsResource} />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <UploadedContent
                setData={setData}
                data={data}
                resource={validationResource}
              />
              {validationResource ? (
                <Stats resource={validationResource} />
              ) : (
                ""
              )}
            </Col>
            <Col xs={12} sm={5} className="errors">
              <Suspense fallback={<Loading />}>
                {validationResource ? (
                  <Test resource={validationResource} />
                ) : (
                  ""
                )}
              </Suspense>
            </Col>
          </Row>
        </div>
      </div>
    </ErrorBoundary>
  );
};

interface AppProps {}
export default App;
