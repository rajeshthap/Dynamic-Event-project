import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/componets/custom/style.css";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";




import Home from "./componets/pages/Home";
import Footer from "./componets/footer/Footer";
import NavBar from "./componets/navbar/NavBar";
import AboutUs from "./componets/pages/AboutUs"; 
import Admissions from "./componets/pages/about_us/Admissions";
import Faculty from "./componets/pages/about_us/Faculty";
import RegistrationModal from "./componets/pages/RegistrationModal";
import DashBoardHeader from "./componets/event_panel/DashBoardHeader";
import Dashboard from "./componets/event_panel/DashBoard";
import Login from "./componets/login/Login";
import UserDashBoard from "./componets/user_dashboard/UserDashBoard";
import AddHeader from "./componets/event_panel/header/AddHeader";
import ManageHeader from "./componets/event_panel/header/ManageHeader";
import CardsDisplay from "./componets/pages/Home";

// import NavBar from "./componets/topnav/NavBar";
// import Footer from "./componets/footer/Footer";
// import Dashboard from "./componets/dash_board/Dashboard";

function App() {

  const location = useLocation();

  const hiddenPaths = new Set(["/DashBoard","/AddHeader", "/ManageHeader"]);

  const shouldHideNavbar = hiddenPaths.has(location.pathname);
  
  return (
    
      <div className="app-container">
        {!shouldHideNavbar && <NavBar />}
        
        <main className="main-content">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/DashBoardHeader" element={<DashBoardHeader />} />
            <Route path="/DashBoard" element={<Dashboard />} />
            <Route path="/Admissions" element={<Admissions />} />
            <Route path="/Faculty" element={<Faculty />} />
             <Route path="/RegistrationModal" element={<RegistrationModal />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/UserDashBoard" element={<UserDashBoard />} />
              <Route path="/AddHeader" element={<AddHeader />} />
              <Route path="/ManageHeader" element={<ManageHeader />} />
              <Route path="/CardsDisplay" element={<CardsDisplay />} />
          
          </Routes>
        </main>
           {!shouldHideNavbar && <Footer />}
      
      </div>
 
  );
}

export default App;