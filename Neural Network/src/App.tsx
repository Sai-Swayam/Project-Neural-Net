import { Viewport } from "./Pages/Viewport";
import "./App.css";
import Test from "./Components/Test";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <Viewport />
      </ReactFlowProvider>
      {/* <Test /> */}
    </>
  );
}

export default App;
