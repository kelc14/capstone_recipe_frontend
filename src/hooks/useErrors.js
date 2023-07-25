import { useState } from "react";
import { v4 as uuid } from "uuid";

const useErrors = () => {
  const [err, setErr] = useState();

  const documentErrors = (e) => {
    return setErr(e);
  };

  const showFormError = () => {
    return Array.isArray(err) ? (
      err.map((e) => (
        <p className="Form-error" key={uuid()}>
          {e}
        </p>
      ))
    ) : (
      <p className="Alert-error">
        Something's not working right. Please try again later.
      </p>
    );
  };

  const showError = () => {
    return (
      <p className="Alert-error">
        Something's not working right. Please try again later.
      </p>
    );
  };

  return [err, documentErrors, showFormError, showError];
};

export default useErrors;
