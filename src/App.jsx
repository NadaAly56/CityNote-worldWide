import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/citiesContext";
import UserProvider from "./contexts/userContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

import CityList from "./components/cityList/CityList";
import CountryList from "./components/countryList/countryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import SpinnerFullPage from "./components/spinnerFullPage/SpinnerFullPage";

// import Home from "./pages/HomePage";
// import NotFound from "./pages/NotFoundPage";
// import PricingPage from "./pages/PricingPage";
// import ProductPage from "./pages/ProductPage";
// import Login from "./pages/LoginPage";
// import AppLayout from "./pages/AppLayout";
// import SignUpPage from "./pages/SignUpPage";

const Home = lazy(()=>import("./pages/HomePage"));
const PricingPage = lazy(()=>import("./pages/PricingPage"));
const ProductPage = lazy(()=>import("./pages/ProductPage"));
const Login = lazy(()=>import("./pages/LoginPage"));
const AppLayout = lazy(()=>import("./pages/AppLayout"));
const SignUpPage = lazy(()=>import("./pages/SignUpPage"));
const NotFound = lazy(()=>import("./pages/NotFoundPage"));


// dist/index.html                   0.46 kB │ gzip:   0.30 kB
// dist/assets/index-b758eefe.css   33.18 kB │ gzip:   5.50 kB
// dist/assets/index-b66be0a4.js   790.27 kB │ gzip: 205.17 kB
// ✓ built in 46.52s

function App() {
  
  return <div>
    <UserProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage />}>
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
  </Suspense>
  </BrowserRouter>
  </CitiesProvider>
  </UserProvider>
    </div>
}

export default App
