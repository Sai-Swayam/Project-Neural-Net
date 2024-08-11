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
  const [options, setOptions] = useState();

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

  const onNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
    }, []);

  function getOptions(arg, entry) {
    if (arg === "**kwargs" || arg === "Name") return null;

    let argele = entry.param_desc[arg];
    let returndiv;
    if (argele.type === "dropdown") {
      let options = entry.param_desc[arg].options.map((opt) => (
        <option key={opt} value={opt} className="text-xs">
          {opt}
        </option>
      ));
      returndiv = <select>{options}</select>;
    } else if (argele.type === "float") {
      returndiv = (
        <input
          type="number"
          min={argele.min}
          max={argele.max}
          step={0.01}
          onChange={onNumberChange}
          className="text-xs w-16 rounded-sm p-0.5"
        ></input>
      );
    } else if (argele.type === "int")
      returndiv = (
        <input
          type="number"
          min={argele.min}
          max={argele.max}
          step={1}
          pattern="\d+"
          onChange={onNumberChange}
          className="text-xs"
        ></input>
      );
    else return null;

    return (
      <div key={crypto.randomUUID()} className="text-xs">
        <label htmlFor={arg} className="text-[8px]">
          {arg}
          <br />
        </label>
        {returndiv}
      </div>
    );
  }

  const onLayerTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      const entry = data.layers.find((ele) => ele.Type === e.target.value);
      console.log(entry);
      setParams(entry);
      let args = Object.keys(entry.params.args);
      let kwargs = Object.keys(entry.params.kwargs);
      let options = [...args, ...kwargs];
      let optionDivs = options.map((arg) => getOptions(arg, entry));
      optionDivs = optionDivs.filter((n) => n);
      setOptions(optionDivs);
    },
    []
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
        <div className="flex flex-wrap justify-between">{options}</div>
      </div>
    </>
  );
};

export default InputNode;
