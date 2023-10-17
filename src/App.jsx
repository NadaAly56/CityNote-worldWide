import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/cityList/CityList";
import { useEffect, useState } from "react";
import { getCities } from "./config/firebase";

function App() {
  const [cities, setCities] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    async function fetchData(){
      setIsLoading(true)
        await  getCities().then(data=>{
          console.log(data);
          setCities(data)
            setIsLoading(false)
        }).catch(err=>console.log(err))
    }
    fetchData()
},[])
  return <div>
    <BrowserRouter>
  <Routes>
    <Route index element={<Home/>}></Route>
    <Route path="app" element={<AppLayout/>}>
      {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />}></Route> */}
      <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}></Route>
      <Route path="countries" ></Route>
      <Route path="form" ></Route>
    </Route>
    <Route path="/pricing" element={<PricingPage/>}></Route>
    <Route path="/product" element={<ProductPage/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
  </BrowserRouter>
    </div>
}

export default App
