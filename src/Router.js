import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Static from "./pages/static";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/staticmap" element={<Static />} />
      <Route exact path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;
