import React, { Suspense, useState, useEffect, useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./components/Loader";
import ErrorFallback from "./components/ErrorFallback";
import UploadButton from "./components/UploadButton";
import UploadedContent from "./components/UploadedContent";
//import FormatSelect from "./components/FormatSelect";
//import Stats from "./components/Stats";
//import Test from "./components/Test";
import { fetchData, validatePayload } from "./components/FetchData";
import { createResource, validatePayload } from "./components/FetchData";
import { Row, Col } from "react-bootstrap";

const initialResource = createResource();

const Test = React.lazy(() => import("./components/Test"));
const Stats = React.lazy(() => import("./components/Stats"));
const FormatSelect = React.lazy(() => import("./components/FormatSelect");

const App = (props: AppProps) => {
  const [data, setData] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [resource, setResource] = useState(initialResource);
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (data && selectedFormat) {
      const timeOutId = setTimeout(
        () => startTransition(() => { setResult(validatePayload(data, selectedFormat.value))}),
        100
      );
      return () => clearTimeout(timeOutId);
    }
    
  }, [data, selectedFormat]);

useEffect(() => {
    console.log(resource)
  }, [resource]);
  
  useEffect(() => {
    console.log(result)
  }, [result]);

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
                  resource={resource}
                  selected={setSelectedFormat}
                />
              </Suspense>
            </Col>
          </Row>
          <Suspense>
          <UploadedContent
            setData={setData}
            data={data}
            resource={result}
            format={selectedFormat}
          />
          </Suspense>
          <Suspense>
          <Stats resource={result} />
          </Suspense>
        </Col>
        <Col xs={12} sm={5} className="errors">
          <Suspense>
            {isPending ? <Loading /> : 
            <Test resource={result} />
            }
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
