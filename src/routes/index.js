import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Private from "./Private";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <Private>
            <Admin />
          </Private>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
