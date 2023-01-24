import React from "react";
import "../scss/errorFallback.scss";
import { Button } from "react-bootstrap";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-boundary-message" role="alert">
      <p>Oops... Something went wrong !</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export default ErrorFallback;
