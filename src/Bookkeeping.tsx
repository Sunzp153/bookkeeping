import { Navigate, Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home/Home";
import Bill from "./pages/Home/components/Bill/Bill";
import Stats from "./pages/Home/components/Stats/Stats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Navigate replace to="bill" />}/>
        <Route path="bill" element={<Bill/>} />
        <Route path="stats" element={(<Stats/>)}/>
      </Route>
    </Routes>
  );
}

export default App;
