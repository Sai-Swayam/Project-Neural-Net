import React, { useCallback } from "react";
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
import "@xyflow/react/dist/style.css";

const Nodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const Edges = [{ id: "e1-2", source: "1", target: "2" }];

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
        className="bg-neutral-900"
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
