import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authorization from "./routes/authorization/authorization.component";

const Shop = () => {
  return (<div>SHOPPPPPPPP</div>)
}

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/> 
        <Route path="/auth" element={<Authorization/>}/> 
      </Route>
    </Routes>
  )
}

export default App;