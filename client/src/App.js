import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiGetStory } from "./redux/action"; // Assuming this is the correct path
import { Home, Public, Detail, Genres, Chapter } from "./pages/public"; // Assuming these are correctly imported
import path from "./ultils/path"; // Assuming this is the correct path for the path utilities

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetStory());
  }, [dispatch]); // Adding dispatch as a dependency for useEffect

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.STORY + "/:id"} element={<Detail />} />
          <Route path={path.GENRES + "/:id"} element={<Genres />} />
          <Route path={path.CHAPTER + "/:id"} element={<Chapter />} />

          {/* Detail page route */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
