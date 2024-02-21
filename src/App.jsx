import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import YoneticiPage from "./pages/YoneticiPage";
import ZiyaretciPage from "./pages/ZiyaretciPage";
import PersonelPage from "./pages/PersonelPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
// import PrivateRouteUsers from './services/PrivateRouteUsers';
// import PrivateRouteAdmin from './services/PrivateRouteAdmin';
import PrivateRoute from "./services/PrivateRoute";
import {
  UserPreferencesContext,
  UserPreferencesProvider,
} from "./context/UserPreferencesContext";
import { useContext } from "react";
import ThemeSlider from "./components/ThemeSlider";
import { AdminPageAPIContextProvider } from "./context/AdminPageAPIContext";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { SupervisorPageAPIContextProvider } from "./context/SupervisorPageAPIContext";
import { GuestPageAPIContextProvider } from "./context/GuestPageAPIContext";
import { PersonnelPageAPIContextProvider } from "./context/PersonalPageAPIContext";
import HomePageSideBar from "./components/SideBars/HomePageSideBar/HomePageSideBar";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const { theme } = useContext(UserPreferencesContext);
  return (
    <UserPreferencesProvider>
      <AuthContextProvider>
        <Router>
          <div className={`app-container ${theme}`}>
            <NavBar theme={`${theme}`}/>
            <Footer />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin-page"
                element={
                  <PrivateRoute
                    element={
                      <AdminPageAPIContextProvider>
                        <AdminPage />
                      </AdminPageAPIContextProvider>
                    }
                  />
                }
              />
              <Route
                path="/yonetici-page"
                element={
                  <PrivateRoute
                    element={
                      <SupervisorPageAPIContextProvider>
                        <YoneticiPage />
                      </SupervisorPageAPIContextProvider>
                    }
                  />
                }
              />
              {/*<Route path="/ziyaretci-page" element={<PrivateRoute element={<ZiyaretciPage />}/>} />*/}
              <Route
                path="/ziyaretci-page"
                element={
                  <GuestPageAPIContextProvider>
                    <ZiyaretciPage />
                  </GuestPageAPIContextProvider>
                }
              />
              <Route
                path="/personel-page"
                element={
                  <PrivateRoute
                    element={
                      <PersonnelPageAPIContextProvider>
                        <PersonelPage />
                      </PersonnelPageAPIContextProvider>
                    }
                  />
                }
              />
              <Route path="/register-page" element={<RegisterPage />} />
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </UserPreferencesProvider>
  );
}

export default App;
