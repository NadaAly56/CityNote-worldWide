import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/cityList/CityList";

function App() {

  return <div>
    <BrowserRouter>
  <Routes>
    <Route index element={<Home/>}></Route>
    <Route path="/app" element={<AppLayout/>}></Route>
    <Route path="/pricing" element={<PricingPage/>}></Route>
    <Route path="/product" element={<ProductPage/>}>
      <Route index path="cities" element={<CityList />}></Route>
      <Route path="countries" element={<CityList />}></Route>
      <Route path="form" ></Route>
    </Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
  </BrowserRouter>
    </div>
}

export default App
