import React from "react";

const Dropdown = ({ arg, entry }) => {
  let options = entry.param_desc[arg].options.map((opt) => (
    <option key={opt} value={opt} className="text-xs ">
      {opt}
    </option>
  ));
  return (
    <div>
      <select className="rounded-sm outline-none p-0.4 text-xs">{options}</select>
    </div>
  );
};

export default Dropdown;
