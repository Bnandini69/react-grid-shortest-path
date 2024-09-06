import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PathFinder from "./components/PathFinder";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <PathFinder /> }]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
