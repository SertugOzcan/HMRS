import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import LoginPage from "./pages/LoginPage";
import YoneticiPage from "./pages/YoneticiPage";
import ZiyaretciPage from "./pages/ZiyaretciPage";
import PersonelPage from "./pages/PersonelPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import PrivateRoute from "./services/PrivateRoute";
import { UserPreferencesContext } from "./context/UserPreferencesContext";
import { useContext, useRef, useEffect } from "react";
import { AdminPageAPIContextProvider } from "./context/AdminPageAPIContext";
import { AuthContext } from "./context/AuthContext";
import { SupervisorPageAPIContextProvider } from "./context/SupervisorPageAPIContext";
import { GuestPageAPIContextProvider } from "./context/GuestPageAPIContext";
import { PersonnelPageAPIContextProvider } from "./context/PersonalPageAPIContext";
import HomePageSideBar from "./components/HomePageSideBar/HomePageSideBar";
import NavBar from "./components/NavBar/NavBar";
import RegisteredUsers from "./components/AdminComponents/RegisteredUsers/RegisteredUsers";
import ManagerRequests from "./components/AdminComponents/ManagerRequests/ManagerRequests";
import CommentRequests from "./components/AdminComponents/CommentRequests/CommentRequests";
import NoPage from "./pages/NoPage";

function App() {
  const { theme } = useContext(UserPreferencesContext);
  const { isAuthenticated } = useContext(AuthContext);

  const appContainerRef = useRef(null);

  useEffect(() => {
    const appContainer = appContainerRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (appContainer) {
        appContainer.style.height = `${appContainer.scrollHeight}px`;
      }
    });

    resizeObserver.observe(appContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const appContainer = appContainerRef.current;

    const contentObserver = new MutationObserver(() => {
      const resizeObserver = new ResizeObserver(() => {
        if (appContainer) {
          appContainer.style.height = `${appContainer.scrollHeight}px`;
        }
      });

      resizeObserver.observe(appContainer);
    });

    contentObserver.observe(appContainer, { childList: true, subtree: true });

    return () => {
      contentObserver.disconnect();
    };
  }, []);

  return (
    <Router>
      <div ref={appContainerRef} className={`app-container ${theme}`}>
        {isAuthenticated && <HomePageSideBar />}
        <NavBar theme={`${theme}`} />
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
                    <RegisteredUsers />
                  </AdminPageAPIContextProvider>
                }
              />
            }
          />{" "}
          {/* Volkan: bu üstteki route'u silip, AdminLoginPage'de navigationı "/registered-users" yapınca hiçbirşey farketmiyor bu arada, haber olsun */}
          <Route
            path="/admin-page/registered-users"
            element={
              <PrivateRoute
                element={
                  <AdminPageAPIContextProvider>
                    <RegisteredUsers />
                  </AdminPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/admin-page/manager-requests"
            element={
              <PrivateRoute
                element={
                  <AdminPageAPIContextProvider>
                    <ManagerRequests />
                  </AdminPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/admin-page/comment-requests"
            element={
              <PrivateRoute
                element={
                  <AdminPageAPIContextProvider>
                    <CommentRequests />
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
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
