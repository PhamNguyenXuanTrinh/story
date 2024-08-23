import React from "react";
import path from "./ultils/path";
import { Routes, Route } from "react-router-dom";
import { Home, Public } from "./pages/public";
function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element = {<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
