import Graph from "./components/Graph";
import NavBar from "./components/NavBar";
import { GraphProvider } from "./context/GraphContext";

function App() {
  return (
    <GraphProvider>
      <NavBar></NavBar>
      <Graph></Graph>
    </GraphProvider>
  );
}

export default App;
