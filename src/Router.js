import { Routes, Route, HashRouter } from "react-router-dom";
import Main from "./pages/main";
import Static from "./pages/static";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/staticmap" element={<Static />} />
        <Route exact path="/" element={<Main />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
