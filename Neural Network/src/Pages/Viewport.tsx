import React, { useCallback, useEffect, useState } from "react";
import InputNode from "../NodeTypes/InputNode";
import HiddenNode from "../NodeTypes/HiddenNode";
// import layersjson from "../assets/layersCopy.json";
import useStore from "../store";
import "augmented-ui/augmented-ui.min.css";
// import { Layer } from "../Types"
import layersjson from "../assets/layersCopy.json";
import { Welcome, Layer } from "../Types";


// let layers:Layer[] = layersjson.layers;
let layersData: Welcome = layersjson as Welcome;
let layers: Layer[] = layersData.layers;



import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  Panel,
  SelectionMode,
  type OnConnect,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

const flowKey = "example-flow";
const currentNodesState = "nodes-states";
const getNodeId = () => `randomnode_${+new Date()}`;

//rename these back to initialNodes
const Nodes = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 0, y: 0 },
    //This data will be passed according to the type of data recieved from the json
    data: { label: layers[0].Type, number: 5, layers: layers },
  },
  {
    id: "2",
    type: "hiddenNode",
    position: { x: 0, y: 190 },
    data: { label: layers[0].Type, number: 5, layers: layers },
  },
  { id: "3", position: { x: 0, y: 400 }, data: { label: "Output Node" } },
];
//rename these back to initialEdges
const Edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const nodeTypes = { inputNode: InputNode, hiddenNode: HiddenNode };

const panOnDrag = [1, 2];

//function starts here
export const Viewport: React.FC = () => {
  //states
  // const [layers, setLayers] = useState();

  const [nodes, setNodes, onNodesChange] = useNodesState(Nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  //Nodes states from the store
  const inputParams = useStore((state) => state.inputParams);
  const inputOptions = useStore((state) => state.inputOptions);

  const hiddenParams = useStore((state) => state.hiddenParams);
  const hiddenOptions = useStore((state) => state.hiddenOptions);

  const updateInputParams = useStore((state) => state.updateInputParams);
  const updateInputOptions = useStore((state) => state.updateInputOptions);

  const updateHiddenParams = useStore((state) => state.updateHiddenParams);
  const updateHiddenOptions = useStore((state) => state.updateHiddenOptions);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      //react flow state
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));

      //Nodes fields state
      const nState = {
        inpParams: inputParams,
        inpOptions: inputOptions,
        hidParams: hiddenParams,
        hidOptions: hiddenOptions,
      };
      localStorage.setItem(currentNodesState, JSON.stringify(nState));
      console.log(localStorage.getItem(currentNodesState));

      console.log("saving");
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    //reacg flow logic
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      //Current state of nodes
      console.log(flow);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();

    //Nodes field state restore
    const nState = JSON.parse(localStorage.getItem(currentNodesState));
    console.log(nState);
    updateInputParams(nState.inpParams);
    updateInputOptions(nState.inpOptions);
    updateHiddenParams(nState.hiddenParams);
    updateHiddenOptions(nState.hiddenOptions);
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div>
      <div
        style={{ width: "100vw", height: "100vh" }}
        className="bg-white font-mono"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          fitView
          // fitViewOptions={{ padding: 2 }}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          nodeTypes={nodeTypes}
        >
          <Panel position="top-right">
            <button
              onClick={onSave}
              className="reticle m-2 bg-slate-700 text-white px-4 py-2 shadow-xl"
              data-augmented-ui="tr-2-clip-x br-clip tl-clip bl-2-rect-xy"
            >
              save
            </button>
            <button
              onClick={onRestore}
              className="reticle m-2 bg-slate-700 text-white px-4 py-2 shadow-xl"
              data-augmented-ui="tl-2-clip-x tr-clip bl-clip br-2-rect-y"
            >
              restore
            </button>
            <button
              onClick={onAdd}
              className="reticle m-2 bg-slate-700 text-white px-4 py-2 shadow-xl"
              data-augmented-ui="bl-2-clip-x br-clip tl-clip tr-2-rect-y"
            >
              add node
            </button>
          </Panel>
          <Controls />
          <MiniMap />
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
            color="#ccc"
          />
        </ReactFlow>
      </div>
    </div>
  );
};
