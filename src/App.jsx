import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/cityList/CityList";
import CountryList from "./components/countryList/countryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./contexts/citiesContext";
import SignUpPage from "./pages/SignUpPage";
import UserProvider from "./contexts/userContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  
  return <div>
    <UserProvider>
    <CitiesProvider>
    <BrowserRouter>
  <Routes>
    <Route index element={<Home/>}></Route>
    
    <Route path="app" element={<ProtectedRoutes><AppLayout/></ProtectedRoutes>}>
      <Route index element={<Navigate replace to="cities" />}></Route>
      <Route path="cities" element={<CityList/>}></Route>
      <Route path="cities/:id?" element={<City />}></Route>
      <Route path="countries" element={<CountryList/>} ></Route>
      <Route path="form" element={<Form />}></Route>
    </Route>
    
    <Route path="/pricing" element={<PricingPage/>}></Route>
    <Route path="/product" element={<ProductPage/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUpPage/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
  </BrowserRouter>
  </CitiesProvider>
  </UserProvider>
    </div>
}

export default App
