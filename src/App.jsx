import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import LoginPage from "./pages/LoginPage";
import YoneticiPage from "./pages/YoneticiPage";
import ZiyaretciPage from "./pages/ZiyaretciPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import PrivateRoute from "./services/PrivateRoute";
import { UserPreferencesContext } from "./context/UserPreferencesContext";
import { useContext } from "react";
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
import SupervisorPageEmployeeList from "./components/SupervisorPageEmployeeList/SupervisorPageEmployeeList";
import SupervisorPageCompanyData from "./components/SupervisorPageCompanyData/SupervisorPageCompanyData";
import SupervisorPageDayOffRequests from "./components/SupervisorPageDayOffRequests/SupervisorPageDayOffRequests";
import SupervisorPageAdvanceRequests from "./components/SupervisorPageAdvanceRequests/SupervisorPageAdvanceRequests";
import SupervisorPageSpendingRequests from "./components/SupervisorPageSpendingRequests/SupervisorPageSpendingRequests";
import ManagerRegisterPage from "./pages/ManagerRegisterPage";
import { SupervisorPageDayOffAPIContextProvider } from "./context/SupervisorPageDayOffAPIContext";
import { SupervisorPageAdvanceAPIContextProvider } from "./context/SupervisorPageAdvanceAPIContext";
import { SupervisorPageSpendingAPIContextProvider } from "./context/SupervisorPageSpendingAPIContext";
import { AdminPageActiveUsersAPIContextProvider } from "./context/AdminPageActiveUsersAPIContext";
import { AdminPagePendingSupervisorsAPIContextProvider } from "./context/AdminPagePendingSupervisorsAPIContext";
import { AdminPagePendingCommentsAPIContextProvider } from "./context/AdminPagePendingCommentsAPIContext";
import PersonnelInfoForm from "./components/PersonnelInfoForm/PersonnelInfoForm";
import AddComment from "./components/AddCommentComponent/AddComment";
import PersonnelDayOffPage from './components/PersonnelDayOffPage/PersonnelDayOffPage'
import { PersonnelPageDayOffAPIContextProvider } from "./context/PersonnelPageDayOffAPIContext";
import { PersonnelPageAdvanceAPIContextProvider } from "./context/PersonnelPageAdvanceAPIContext";
import { PersonnelPageSpendingAPIContextProvider } from "./context/PersonnelPageSpendingAPIContext";
import PersonnelAdvancePage from "./components/PersonnelAdvancePage/PersonnelAdvancePage";

import PersonnelSpendingRequestPage from "./components/PersonnelSpendingRequestPage/PersonnelSpendingRequestPage";

import HomePage from "./pages/HomePage/HomePage";
import AboutUsCardList from "./pages/AboutUsPage/AboutUsCardList";
import MyCompany from "./components/MyCompany/MyCompany";


function App() {
  const { theme } = useContext(UserPreferencesContext);
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <div className={`app-container ${theme}`}>
        {isAuthenticated && <HomePageSideBar />}
        <NavBar theme={`${theme}`} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="about-us" element={<AboutUsCardList />} />
          <Route
            path="/admin-page/registered-users"
            element={
              <PrivateRoute
                element={
                  <AdminPageActiveUsersAPIContextProvider>
                    <RegisteredUsers />
                  </AdminPageActiveUsersAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/admin-page/manager-requests"
            element={
              <PrivateRoute
                element={
                  <AdminPagePendingSupervisorsAPIContextProvider>
                    <ManagerRequests />
                  </AdminPagePendingSupervisorsAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/admin-page/comment-requests"
            element={
              <PrivateRoute
                element={
                  <AdminPagePendingCommentsAPIContextProvider>
                    <CommentRequests />
                  </AdminPagePendingCommentsAPIContextProvider>
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
          <Route
            path="/yonetici-page/employee-list"
            element={
              <PrivateRoute
                element={
                  <SupervisorPageAPIContextProvider>
                    <SupervisorPageEmployeeList />
                  </SupervisorPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/yonetici-page/company-data"
            element={
              <PrivateRoute
                element={
                  <SupervisorPageAPIContextProvider>
                    <SupervisorPageCompanyData />
                  </SupervisorPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/yonetici-page/dayoff-requests"
            element={
              <PrivateRoute
                element={
                  <SupervisorPageDayOffAPIContextProvider>
                    <SupervisorPageDayOffRequests />
                  </SupervisorPageDayOffAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/yonetici-page/advance-requests"
            element={
              <PrivateRoute
                element={
                  <SupervisorPageAdvanceAPIContextProvider>
                    <SupervisorPageAdvanceRequests />
                  </SupervisorPageAdvanceAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/yonetici-page/spending-requests"
            element={
              <PrivateRoute
                element={
                  <SupervisorPageSpendingAPIContextProvider>
                    <SupervisorPageSpendingRequests />
                  </SupervisorPageSpendingAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/ziyaretci-page"
            element={
              <GuestPageAPIContextProvider>
                <ZiyaretciPage />
              </GuestPageAPIContextProvider>
            }
          />
          <Route
            path="/personnel-page"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageAPIContextProvider>
                    <PersonnelInfoForm/>
                  </PersonnelPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/personnel-page/my-profile"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageAPIContextProvider>
                    <PersonnelInfoForm/>
                  </PersonnelPageAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/personnel-page/request-dayoff"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageDayOffAPIContextProvider>
                    <PersonnelDayOffPage/>
                  </PersonnelPageDayOffAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/personnel-page/request-advance"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageAdvanceAPIContextProvider>
                    <PersonnelAdvancePage/>
                  </PersonnelPageAdvanceAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="/personnel-page/requests-spending"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageSpendingAPIContextProvider>
                    <PersonnelSpendingRequestPage/>
                  </PersonnelPageSpendingAPIContextProvider>
                }
              />
            }
          />
          <Route
            path="personnel-page/create-comment"
            element={
              <PrivateRoute
                element={
                  <PersonnelPageAPIContextProvider>
                        <MyCompany />
                  </PersonnelPageAPIContextProvider>
                }
              />
            }
          />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/manager-register" element={<ManagerRegisterPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      <Footer theme={theme}/>
    </Router>
  );
}

export default App;
