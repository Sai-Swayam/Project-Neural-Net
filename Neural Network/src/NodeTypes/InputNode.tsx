import React, { useCallback, useRef, useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";
import Params from "../Components/Params";
import useStore from "../store";
import "augmented-ui/augmented-ui.min.css";
import "./Node.css";
import { Layer } from "../Types";
// import { useDisableNumberInputScroll } from "../Hooks/useDisableNumberInputScroll";

//this type will be defined by the json recieved from the frontend
type InputNode = Node<
  { label: string; number: number; layers: Layer[] },
  "input"
>;

//function begins
const InputNode = ({ data }: NodeProps<InputNode>) => {
  // useDisableNumberInputScroll();

  //states
  // const [params, setParams] = useState(data.layers[0]);
  // const [options, setOptions] = useState([""]);

  const params = useStore((state) => state.inputParams);
  const options = useStore((state) => state.inputOptions);

  const updateParams = useStore((state) => state.updateInputParams);
  const updateOptions = useStore((state) => state.updateInputOptions);

  const paramRef = useRef(null);
  const optionsRef = useRef(null);

  //useEffect
  useEffect(() => {
    //----------------------------
    // const entry = data.layers[0];
    // // paramRef.current = data.layers[0];
    // optionsRef.current = entry.params;
    // setOptions(optionsRef.current);
    // console.log("UseEffect render")
    //----------------------------

    const entry = data.layers[0];
    updateParams(entry);
    updateOptions(entry.params);



    //trigger console.log when child input loses focus, for bux fix****
    // console.log("re-rendered")
  }, []);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const onLayerTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      const entry = data.layers.find((ele) => ele.Type === e.target.value);
      paramRef.current = data.layers.find((ele) => ele.Type === e.target.value);
      console.log(entry);
      // updateParams(paramRef.current);
      updateParams(entry);
      optionsRef.current = entry.params;
      // let optionDivs = options.map((arg) => getOptions(arg, entry));
      // optionDivs = optionDivs.filter((n) => n);
      // setOptions(optionDivs);
      // updateOptions(optionsRef.current);
      updateOptions(entry.params);
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
      <div
        data-augmented-ui="both tr-clip-x tl-rect-x bl-clip br-2-clip-y border"
        className="pitch-mixin bg-slate-200 rounded-md shadow-md p-7 gap-1 flex flex-col max-w-60"
      >
        <Handle type="source" position={Position.Bottom} id="a" />
        <h1 className="text-l font-['proggyclean_ce_nerd_font_mono_regular']">
          Input Node
        </h1>
        <label htmlFor="types" className="text-[7px]">
          Layer Type
        </label>

        {/* <input
          type="types"
          name="text"
          onChange={onChange}
          className="rounded-sm outline-none px-1.5 py-1 text-[10px] h-[70%]"
        /> */}

        <select
          data-augmented-ui=""
          name="types"
          id="types"
          className=" outline-none p-0.5 text-xs  "
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
