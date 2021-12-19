import logo from "./logo.svg";

import Graph from "./components/Graph";
import { GraphProvider } from "./context/GraphContext";

function App() {
  return (
    <GraphProvider>
      <Graph></Graph>
    </GraphProvider>
  );
}

export default App;
