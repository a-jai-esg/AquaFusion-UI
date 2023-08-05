// hooks
import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// react router
import { Routes, Route } from "react-router-dom";

// login scenes
import Login from "./login-scenes/login";
import ForgottenPassword from "./login-scenes/forgotten-password";
import ChangePassword from "./login-scenes/change-password";
import Success from "./login-scenes/cards/success";
import Support from "./login-scenes/cards/support-card";

// scenes
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ManageWorkgroup from "./scenes/manage-workgroup";
import Profile from "./scenes/farm-administrator-profile";
import Notifications from "./scenes/notifications";
import HarvestCalendar from "./scenes/harvest-calendar";
import AquaticSensorStatus from "./scenes/aquatic-sensor-status";
import TerrestrialSensorStatus from "./scenes/terrestrial-sensor-status";
import AdjustSystemThresholds from "./scenes/adjust-system-thresholds";
import Registration from "./scenes/register-farmer";
import TechnicalSupport from "./scenes/technical-support";
import About from "./scenes/about-system";
import Logout from "./scenes/logout";

// data
import { mockCalendarDates as dates } from "./data/mockData";

export default function App() {
  const [theme, colorMode] = useMode();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);

  const dashboardMenu = () => {
    return(
      <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-workgroup" element={<ManageWorkgroup />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register-farmer" element={<Registration />} />
              <Route path="/support" element={<TechnicalSupport />} />
              <Route path="/about" element={<About />} />
              <Route path="/harvest-calendar" element={<HarvestCalendar />} date={dates} />
              <Route path="/terrestrial-sensor-status" element={<TerrestrialSensorStatus />} />
              <Route path="/aquatic-sensor-status" element={<AquaticSensorStatus />} />
              <Route path="/profile" element={<Profile userName="Jennie Kim" workgroupName="SOS Talamban" accountID="abcd182716jsfha211" emailAddress={emailAddress}/>} />
              <Route
                path="/adjust-system-thresholds"
                element={<AdjustSystemThresholds />}
              />
              <Route
                path="/logout"
                element={<Logout setEmail={setEmailAddress} setPassword={setPassword} setSession={setSession}/>}
              />
            </Routes>
          </main>
        </div>
    );
  }

  const loginPage = () => {
    return(
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/" element={<Login setPassword={setPassword} setEmail={setEmailAddress} setSession={setSession}/>}/>
            <Route path="/forgotten-password" element={<ForgottenPassword/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/change-success" element={<Success/>}/>
            <Route path="/support" element={<Support/>}/>
          </Routes>
        </main> 
      </div>
    );

  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(session) ? dashboardMenu() : loginPage()
        }
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
