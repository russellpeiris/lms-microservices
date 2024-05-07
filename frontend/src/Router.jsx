import { Route, Routes } from "react-router-dom";
import { Admin, Home, Login } from "./pages";

const Router = () => {
  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>;
};

export default Router;
