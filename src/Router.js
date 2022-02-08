import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Static from "./pages/static";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/main" element={<Main />} />
      <Route exact path="/staticmap" element={<Static />} />
    </Routes>
  );
};

export default Router;
