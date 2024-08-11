import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";

interface Layers {}

//this type will be defined by the json recieved from the frontend
type InputNode = Node<
  { label: string; number: number; layers: Layers },
  "input"
>;

//function begins
const InputNode = ({ data }: NodeProps<InputNode>) => {
  //states
  const [params, setParams] = useState(data.layers[0]);

  //query logic
  // ------------------------------
  // const filteredTypes =
  //   query === ""
  //     ? data.layers
  //     : data.layers.filter((layer) => {
  //         return layer.Type.toLowerCase().includes(query.toLowerCase());
  //       });

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const onLayerTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      const entry = data.layers.find((ele) => ele.Type === e.target.value);
      console.log(entry);
      setParams(entry);
    },
    [params]
  );

  //useEffect
  //-------------------------------
  // useEffect(() => {
  //   console.log(params); // Logs the updated value
    
  // }, [params]);

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
      <div className="bg-slate-200 rounded-md shadow-md px-4 py-3 gap-1 flex flex-col">
        <Handle type="source" position={Position.Bottom} id="a" />
        <h1 className="text-l">{params.Type}</h1>
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

        <div className="flex flex-wrap">
          {}
        </div>
      </div>
    </>
  );
};

export default InputNode;
