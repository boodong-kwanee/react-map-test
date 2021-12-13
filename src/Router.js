import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/main";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;
