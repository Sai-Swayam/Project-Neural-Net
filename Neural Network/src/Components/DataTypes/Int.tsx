import React, { useCallback, useState } from "react";
import { useDisableNumberInputScroll } from "../../Hooks/useDisableNumberInputScroll";

const Int = ({ argele }) => {
  useDisableNumberInputScroll();

  const [int, setInt] = useState<number>('');

  const onIntChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setInt(newValue);
      console.log("Int value:", int);
    },
    [int]
  );
  return (
    <div>
      <input
        type="number"
        min={argele.min}
        max={argele.max}
        value={argele.required?int:argele.default}
        step={1}
        pattern="\d+"
        onChange={onIntChange}
        required={argele.required}
        className="text-xs w-16 rounded-sm p-0.5 nodrag outline-none"
      ></input>
    </div>
  );
};

export default Int;
