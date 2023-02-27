import React, { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./components/Loader";
import ErrorFallback from "./components/ErrorFallback";
import UploadButton from "./components/UploadButton";
import UploadedContent from "./components/UploadedContent";
//import FormatSelect from "./components/FormatSelect";
//import Stats from "./components/Stats";
import { fetchData } from "./components/FetchData";
import { Row, Col } from "react-bootstrap";


const Test = React.lazy(() => import("./components/Test"));
const Stats = React.lazy(() => import("./components/Stats"));
const FormatSelect = React.lazy(() => import("./components/FormatSelect");

const App = (props: AppProps) => {
  const [data, setData] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [validationResource, setValidationResource] = useState(null);
  const [formatsResource, setFormatsResource] = useState(null);

  const validateData = (data, selectedFormat) => {
    setValidationResource(fetchData(data, "validate", selectedFormat.value));
  };

  const getFileFormatsData = () => {
    setFormatsResource(fetchData("", "fileFormats", ""));
  };

  useEffect(() => {
    if (data && selectedFormat) {
      const timeOutId = setTimeout(
        () => validateData(data, selectedFormat),
        100
      );
      return () => clearTimeout(timeOutId);
    }
  }, [data, selectedFormat]);

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
                  <Suspense fallback={<Loading />}>
                    <FormatSelect
                      resource={formatsResource}
                      selected={setSelectedFormat}
                    />
                  </Suspense>
                </Col>
              </Row>
              <UploadedContent
                setData={setData}
                data={data}
                resource={validationResource}
                format={selectedFormat}
              />
              <Stats resource={validationResource} />
            </Col>
            <Col xs={12} sm={5} className="errors">
              <Suspense fallback={<Loading />}>
                <Test resource={validationResource} />
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
