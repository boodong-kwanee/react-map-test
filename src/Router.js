import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Static from "./pages/static";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/static" element={<Static />} />
    </Routes>
  );
};

export default Router;
