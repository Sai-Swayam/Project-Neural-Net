import React, { useCallback } from "react";
import InputNode from "../NodeTypes/InputNode";
import layers from "../assets/layers.json";

interface Layer {
  
}
let layers_var = JSON.parse(layers);

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  type OnConnect,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

//rename these back to initialNodes
const Nodes = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 0, y: 0 },
    //This data will be passed according to the type of data recieved from the json
    data: { label: layers[0].Type, number: 5, layers: layers },
  },
  { id: "2", position: { x: 0, y: 200 }, data: { label: "Hidden Node" } },
  { id: "3", position: { x: 0, y: 300 }, data: { label: "Output Node" } },
];
//rename these back to initialEdges
const Edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const nodeTypes = { inputNode: InputNode };

const panOnDrag = [1, 2];

export const Viewport: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(Nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);

  //
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
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
          fitView
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          nodeTypes={nodeTypes}
        >
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
