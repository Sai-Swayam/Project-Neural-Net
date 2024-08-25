import React from "react";

const Dropdown = ({ arg, entry }) => {
  let options = entry.param_desc[arg].options.map((opt) => (
    <option key={opt} value={opt} className="text-lg ">
      {opt}
    </option>
  ));
  return (
    <div>
      <select className="outline-none p-0.5 text-xs">{options}</select>
    </div>
  );
};

export default Dropdown;
