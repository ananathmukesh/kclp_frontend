import "./App.css";
import Main from "./Component/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Job from "./layouts/Job";
import Vehicle from "./layouts/Vehicle";
import Login from "./auth/Login";
import Demo from "./layouts/demo";
import Register from "./auth/Register";
import MyForm from "./utils/form";
import { useRef } from "react";
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import DynamicInputFields from "./utils/appenform";
import PropertyDetailFormPage from "./Component/Profile/PropertyDetailForm";


function App() {
  const toast = useRef(null);

  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ap" element={<DynamicInputFields />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />}>
            <Route path="/main/jobs" element={<Job />} />
            <Route path="/main/vehicle" element={<Vehicle />} />
            <Route path="/main/demo" element={<Demo />} />
            <Route path="/main/form" element={<MyForm />} />
            <Route path="/main/form1" element={<PropertyDetailFormPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
