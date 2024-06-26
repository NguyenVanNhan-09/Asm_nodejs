import { Route, Routes } from "react-router-dom";
import Client from "./layout/client.jsx";
import Admin from "./layout/Admin.jsx";

function App() {
   return (
      <>
         <Routes>
            <Route path="/*" element={<Client />}></Route>
            <Route path="/admin/*" element={<Admin />}></Route>
         </Routes>
      </>
   );
}

export default App;
