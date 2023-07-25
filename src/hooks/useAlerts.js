import { useState } from "react";

const useAlerts = () => {
  const [alert, setAlert] = useState([]);

  const showAlerts = () => {
    return alert.map((a) => <p className={`Alert-${a.type}`}>{a.message}</p>);
  };

  return [alert, setAlert, showAlerts];
};

export default useAlerts;
