import { memo } from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

const Reports = memo(() => {
  const reports = useSelector(state => state.reports);

  return (
    <div className="reports">
      {reports.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </div>
  )
});

export { Reports };