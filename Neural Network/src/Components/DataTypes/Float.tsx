import React, { useCallback, useState } from "react";
import { useDisableNumberInputScroll } from "../../Hooks/useDisableNumberInputScroll";

const Float = ({ argele }) => {
  useDisableNumberInputScroll();
  const [float, setFloat] = useState('');

  const onFloatChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setFloat(newValue);
      console.log("Float value:", newValue);

      const flow = rfInstance.toObject();
    },
    [float]
  );

  return (
    <div>
      <input
        type="number"
        min={argele.min}
        max={argele.max}
        value={argele.required?float:argele.default}
        step={0.01}
        // pattern="\d+"
        onChange={onFloatChange}
        className="text-xs w-16 rounded-sm p-0.5 nodrag outline-none"
        required={argele.required}
      ></input>
    </div>
  );
};

export default Float;
