import React, { useCallback, useRef, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";
import Params from "../Components/Params";
import { useDisableNumberInputScroll } from "../Hooks/useDisableNumberInputScroll";

interface Layers {}

//this type will be defined by the json recieved from the frontend
type InputNode = Node<
  { label: string; number: number; layers: Layers },
  "input"
>;

//function begins
const InputNode = ({ data }: NodeProps<InputNode>) => {
  useDisableNumberInputScroll();

  //states
  const [params, setParams] = useState(data.layers[0]);
  const [options, setOptions] = useState([""]);

  const paramRef = useRef(null);
  const optionsRef = useRef(null);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const onLayerTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      const entry = data.layers.find((ele) => ele.Type === e.target.value);
      paramRef.current = data.layers.find((ele) => ele.Type === e.target.value);
      console.log(entry);
      setParams(paramRef.current);
      optionsRef.current = entry.params;
      // let optionDivs = options.map((arg) => getOptions(arg, entry));
      // optionDivs = optionDivs.filter((n) => n);
      // setOptions(optionDivs);
      setOptions(optionsRef.current);
    },
    []
  );

  //layer items
  const layerItems = data.layers.map((layer) => (
    <option
      key={layer.Type}
      value={layer.Type}
      className="text-xl bg-slate-200 opacity-50"
    >
      {layer.Type}
    </option>
  ));

  //layer params
  // const layerParams = data.layer

  return (
    <>
      <div className="bg-slate-200 rounded-md shadow-md px-4 py-3 gap-1 flex flex-col max-w-60">
        <Handle type="source" position={Position.Bottom} id="a" />
        <h1 className="text-l">Input Node</h1>
        <label htmlFor="types" className="text-[8px]">
          Layer Type
        </label>

        {/* <input
          type="types"
          name="text"
          onChange={onChange}
          className="rounded-sm outline-none px-1.5 py-1 text-[10px] h-[70%]"
        /> */}

        <select
          name="types"
          id="types"
          className="rounded-sm outline-none p-0.5 text-xs "
          onChange={onLayerTypeChange}
        >
          {layerItems}
        </select>
        {/* Set Arguments for Layers */}
        <div className="flex flex-wrap justify-between">
          {options != null &&
            options.map((arg) => <Params key={arg} arg={arg} entry={params} />)}
        </div>
      </div>
    </>
  );
};

export default InputNode;
