import React, { useState } from "react";
import Dropdown from "./DataTypes/Dropdown";
import Float from "./DataTypes/Float";
import Int from "./DataTypes/Int";

const Params = ({ arg, entry }) => {
  //component to display (state)

  if (arg == "") return;
  if (arg === "**kwargs" || arg === "Name") return null;

  let argele = entry.param_desc[arg];
  if (argele.type === "dropdown") {
    return (
      <div key={crypto.randomUUID()} className="text-xs">
        <label htmlFor={arg} className="text-[7px]">
          {arg}
          <br />
        </label>
        <Dropdown arg={arg} entry={entry} />
      </div>
    );
  } else if (argele.type === "float") {
    return (
      <div key={crypto.randomUUID()} className="text-xs">
        <label htmlFor={arg} className="text-[7px]">
          {arg}
          <br />
          {/* content here */}
          <Float argele={argele} />
        </label>
      </div>
    );
  } else if (argele.type === "int") {
    return (
      <div key={crypto.randomUUID()} className="text-xs">
        <label htmlFor={arg} className="text-[7px]">
          {arg}
          <br />
          {/* content here */}
          <Int argele={argele} />
        </label>
      </div>
    );
  } else return null;
};

export default Params;
