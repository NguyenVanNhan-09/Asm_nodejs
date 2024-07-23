import { Route, Routes } from "react-router-dom";
import Client from "./layout/client.jsx";
import Admin from "./layout/Admin.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import ProductContext from "./context/ProductContext.jsx";

function App() {
   return (
      <>
         <ProductContext>
            <Routes>
               <Route path="/*" element={<Client />} />
               <Route path="/admin" element={<PrivateRouter />}>
                  <Route path="/admin/*" element={<Admin />} />
               </Route>
            </Routes>
         </ProductContext>
      </>
   );
}

export default App;
