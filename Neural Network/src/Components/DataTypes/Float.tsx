import React, { useCallback, useState } from "react";
import { useDisableNumberInputScroll } from "../../Hooks/useDisableNumberInputScroll";

const Float = ({ argele }) => {
  useDisableNumberInputScroll();
  const [float, setFloat] = useState(0.0);

  const onFloatChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setFloat(newValue);
      console.log("Float value:", newValue);
    },
    []
  );

  return (
    <div>
      <input
        type="number"
        min={argele.min}
        max={argele.max}
        step={0.01}
        value={argele.required?'':argele.default}
        onChange={onFloatChange}
        className="text-xs w-16 rounded-sm p-0.5 nodrag outline-none"
        required={argele.required}
      ></input>
    </div>
  );
};

export default Float;
