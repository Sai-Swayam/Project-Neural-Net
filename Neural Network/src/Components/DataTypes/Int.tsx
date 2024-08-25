import React, { useCallback, useState, useEffect } from "react";
import { useDisableNumberInputScroll } from "../../Hooks/useDisableNumberInputScroll";

const Int = ({ argele }) => {
  useDisableNumberInputScroll();

  const [int, setInt] = useState(argele.required ? '' : argele.default);

  useEffect(() => {
    setInt(argele.required ? '' : argele.default);
  }, [argele]);

  const onIntChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInt(newValue);
  }, []);

  const handleBlur = () => {
    console.log("Input blurred. Current value:", int);
  };

  return (
    <div>
      <input
        type="number"
        min={argele.min}
        max={argele.max}
        value={int}
        step={1}
        pattern="\d+"
        onChange={onIntChange}
        onBlur={handleBlur}
        required={argele.required}
        className="text-xs w-16 p-0.5 nodrag outline-none"
      />
    </div>
  );
};

export default Int;